<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    // ─── Default relations to eager-load on index ─────────────────────────────
    protected array $indexWith = [
        'projectType',
        'district',
        'primaryImage.imageType',
        'amenities',
    ];

    // ─── Full relations for show ──────────────────────────────────────────────
    protected array $showWith = [
        'projectType',
        'district',
        'serviceCategory',
        'servicePackage',
        'images.imageType',
        'primaryImage.imageType',
        'documents',
        'owners',
        'amenities',
        'progress',
        'videos',
        'rooms.roomType',
        'rooms.images',
        'rooms.primaryImage',
    ];

    // ─── Index ────────────────────────────────────────────────────────────────
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Project::with($this->indexWith);

        // Visibility filter — public API should only see active projects by default
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        } else {
            // Default: only active projects for public consumers
            $query->where('is_active', true);
        }

        // Standard filters
        $this->applyFilters($query, $request);

        $perPage = min((int) ($request->per_page ?? 12), 50);
        $projects = $query->latest()->paginate($perPage);

        return ProjectResource::collection($projects);
    }

    // ─── Admin Index (all projects regardless of is_active) ───────────────────
    public function adminIndex(Request $request): AnonymousResourceCollection
    {
        $query = Project::with($this->indexWith);

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        $this->applyFilters($query, $request);

        $perPage = min((int) ($request->per_page ?? 15), 100);
        $projects = $query->latest()->paginate($perPage);

        return ProjectResource::collection($projects);
    }

    // ─── Show ─────────────────────────────────────────────────────────────────
    public function show(Project $project): ProjectResource
    {
        $project->load($this->showWith);
        return new ProjectResource($project);
    }

    // ─── Show by Slug (public) ────────────────────────────────────────────────
    public function showBySlug(string $slug): ProjectResource
    {
        $project = Project::where('slug', $slug)
            ->where('is_active', true)
            ->with($this->showWith)
            ->firstOrFail();

        return new ProjectResource($project);
    }

    // ─── Store ────────────────────────────────────────────────────────────────
    public function store(StoreProjectRequest $request): ProjectResource
    {
        return DB::transaction(function () use ($request) {
            $data = $request->safe()->except(['images', 'documents', 'owners', 'amenities', 'progress', 'videos']);
            $project = Project::create($data);

            // Sync amenities
            if ($request->has('amenities')) {
                $project->amenities()->sync($request->amenities ?? []);
            }

            // Handle images
            if ($request->has('images')) {
                $this->storeImages($project, $request->images ?? [], $request);
            }

            // Handle documents
            if ($request->has('documents')) {
                $this->storeDocuments($project, $request->documents ?? [], $request);
            }

            // Handle owners
            if ($request->has('owners')) {
                foreach ($request->owners ?? [] as $owner) {
                    $project->owners()->create($owner);
                }
            }

            // Handle progress
            if ($request->has('progress')) {
                foreach ($request->progress ?? [] as $prog) {
                    $project->progress()->create($prog);
                }
            }

            // Handle videos
            if ($request->has('videos')) {
                $this->storeVideos($project, $request->videos ?? [], $request);
            }

            $project->load($this->showWith);
            return new ProjectResource($project);
        });
    }

    // ─── Update ───────────────────────────────────────────────────────────────
    public function update(UpdateProjectRequest $request, Project $project): ProjectResource
    {
        return DB::transaction(function () use ($request, $project) {
            $data = $request->safe()->except(['images', 'documents', 'owners', 'amenities', 'progress', 'videos']);
            $project->update($data);

            // Sync amenities
            if ($request->has('amenities')) {
                $project->amenities()->sync($request->amenities ?? []);
            }

            // Handle images
            if ($request->has('images')) {
                $this->syncImages($project, $request->images ?? [], $request);
            }

            // Handle documents
            if ($request->has('documents')) {
                $this->syncDocuments($project, $request->documents ?? [], $request);
            }

            // Handle owners (full replace strategy)
            if ($request->has('owners')) {
                $project->owners()->delete();
                foreach ($request->owners ?? [] as $owner) {
                    $project->owners()->create($owner);
                }
            }

            // Handle progress (full replace strategy)
            if ($request->has('progress')) {
                $project->progress()->delete();
                foreach ($request->progress ?? [] as $prog) {
                    $project->progress()->create($prog);
                }
            }

            // Handle videos
            if ($request->has('videos')) {
                $this->syncVideos($project, $request->videos ?? [], $request);
            }

            $project->load($this->showWith);
            return new ProjectResource($project);
        });
    }

    // ─── Destroy ──────────────────────────────────────────────────────────────
    public function destroy(Project $project): JsonResponse
    {
        $project->delete();
        return response()->json(['message' => 'Project deleted successfully.']);
    }

    // ─── Toggle Active ────────────────────────────────────────────────────────
    public function toggleActive(Project $project): JsonResponse
    {
        $project->update(['is_active' => !$project->is_active]);
        return response()->json([
            'message'   => 'Project visibility updated.',
            'is_active' => $project->fresh()->is_active,
        ]);
    }

    // =========================================================================
    // Private helpers
    // =========================================================================

    private function applyFilters($query, Request $request): void
    {
        if ($request->filled('project_type_id')) {
            $query->where('project_type_id', $request->project_type_id);
        }
        if ($request->filled('district_id')) {
            $query->where('district_id', $request->district_id);
        }
        if ($request->filled('service_category_id')) {
            $query->where('service_category_id', $request->service_category_id);
        }
        if ($request->filled('service_package_id')) {
            $query->where('service_package_id', $request->service_package_id);
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->has('is_featured')) {
            $query->where('is_featured', filter_var($request->is_featured, FILTER_VALIDATE_BOOLEAN));
        }
        if ($request->has('is_completed')) {
            $query->where('is_completed', filter_var($request->is_completed, FILTER_VALIDATE_BOOLEAN));
        }
        if ($request->has('is_working')) {
            $query->where('is_working', filter_var($request->is_working, FILTER_VALIDATE_BOOLEAN));
        }
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('project_name', 'like', '%' . $request->search . '%')
                  ->orWhere('project_location', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }
    }

    private function storeImages(Project $project, array $images, Request $request): void
    {
        $hasPrimary  = false;
        $fileInputs  = $request->file('images') ?? [];

        foreach ($images as $index => $imageData) {
            $file = $fileInputs[$index]['file'] ?? null;
            if (!$file) {
                continue;
            }

            $isPrimary = (bool) ($imageData['is_primary'] ?? false);

            // Enforce single primary
            if ($isPrimary && !$hasPrimary) {
                // If already set a primary, clear existing
                $project->images()->where('is_primary', true)->update(['is_primary' => false]);
                $hasPrimary = true;
            } elseif ($isPrimary && $hasPrimary) {
                $isPrimary = false;
            }

            $path = $file->store('projects/images', 'public');

            $project->images()->create([
                'image_type_id' => $imageData['image_type_id'],
                'file_path'     => $path,
                'alt_text'      => $imageData['alt_text'] ?? null,
                'is_primary'    => $isPrimary,
                'sort_order'    => $imageData['sort_order'] ?? $index,
            ]);
        }
    }

    private function storeDocuments(Project $project, array $documents, Request $request): void
    {
        $fileInputs = $request->file('documents') ?? [];

        foreach ($documents as $index => $docData) {
            $file = $fileInputs[$index]['file'] ?? null;
            if (!$file) {
                continue;
            }

            $path = $file->store('projects/documents', 'public');

            $project->documents()->create([
                'document_name' => $docData['document_name'],
                'file_path'     => $path,
                'document_type' => $docData['document_type'] ?? 'other',
            ]);
        }
    }

    private function storeVideos(Project $project, array $videos, Request $request): void
    {
        $fileInputs = $request->file('videos') ?? [];

        foreach ($videos as $index => $videoData) {
            $thumbnailPath = null;
            $thumbFile = $fileInputs[$index]['thumbnail'] ?? null;
            if ($thumbFile) {
                $thumbnailPath = $thumbFile->store('projects/thumbnails', 'public');
            }

            $project->videos()->create([
                'video_url' => $videoData['video_url'],
                'title'     => $videoData['title'] ?? null,
                'platform'  => $videoData['platform'],
                'thumbnail' => $thumbnailPath,
            ]);
        }
    }

    private function syncImages(Project $project, array $images, Request $request): void
    {
        $fileInputs      = $request->file('images') ?? [];
        $incomingIds     = collect($images)->pluck('id')->filter()->toArray();

        // Delete images not included in the incoming payload
        $project->images()->whereNotIn('id', $incomingIds)->each(function ($img) {
            Storage::disk('public')->delete($img->file_path);
            $img->delete();
        });

        $hasPrimary = false;

        foreach ($images as $index => $imageData) {
            $isPrimary = (bool) ($imageData['is_primary'] ?? false);
            if ($isPrimary && !$hasPrimary) {
                $hasPrimary = true;
            } elseif ($isPrimary) {
                $isPrimary = false;
            }

            if (!empty($imageData['id'])) {
                // Update existing
                $img = $project->images()->find($imageData['id']);
                if ($img) {
                    $img->update([
                        'image_type_id' => $imageData['image_type_id'],
                        'alt_text'      => $imageData['alt_text'] ?? $img->alt_text,
                        'is_primary'    => $isPrimary,
                        'sort_order'    => $imageData['sort_order'] ?? $img->sort_order,
                    ]);
                }
            } else {
                // New image
                $file = $fileInputs[$index]['file'] ?? null;
                if ($file) {
                    $path = $file->store('projects/images', 'public');
                    $project->images()->create([
                        'image_type_id' => $imageData['image_type_id'],
                        'file_path'     => $path,
                        'alt_text'      => $imageData['alt_text'] ?? null,
                        'is_primary'    => $isPrimary,
                        'sort_order'    => $imageData['sort_order'] ?? $index,
                    ]);
                }
            }
        }
    }

    private function syncDocuments(Project $project, array $documents, Request $request): void
    {
        $fileInputs  = $request->file('documents') ?? [];
        $incomingIds = collect($documents)->pluck('id')->filter()->toArray();

        $project->documents()->whereNotIn('id', $incomingIds)->each(function ($doc) {
            Storage::disk('public')->delete($doc->file_path);
            $doc->delete();
        });

        foreach ($documents as $index => $docData) {
            if (!empty($docData['id'])) {
                $doc = $project->documents()->find($docData['id']);
                if ($doc) {
                    $doc->update([
                        'document_name' => $docData['document_name'],
                        'document_type' => $docData['document_type'] ?? $doc->document_type,
                    ]);
                }
            } else {
                $file = $fileInputs[$index]['file'] ?? null;
                if ($file) {
                    $path = $file->store('projects/documents', 'public');
                    $project->documents()->create([
                        'document_name' => $docData['document_name'],
                        'file_path'     => $path,
                        'document_type' => $docData['document_type'] ?? 'other',
                    ]);
                }
            }
        }
    }

    private function syncVideos(Project $project, array $videos, Request $request): void
    {
        $fileInputs  = $request->file('videos') ?? [];
        $incomingIds = collect($videos)->pluck('id')->filter()->toArray();

        $project->videos()->whereNotIn('id', $incomingIds)->each(function ($video) {
            if ($video->thumbnail) {
                Storage::disk('public')->delete($video->thumbnail);
            }
            $video->delete();
        });

        foreach ($videos as $index => $videoData) {
            if (!empty($videoData['id'])) {
                $video = $project->videos()->find($videoData['id']);
                if ($video) {
                    $thumbPath = $video->thumbnail;
                    $thumbFile = $fileInputs[$index]['thumbnail'] ?? null;
                    if ($thumbFile) {
                        if ($thumbPath) {
                            Storage::disk('public')->delete($thumbPath);
                        }
                        $thumbPath = $thumbFile->store('projects/thumbnails', 'public');
                    }
                    $video->update([
                        'video_url' => $videoData['video_url'],
                        'title'     => $videoData['title'] ?? $video->title,
                        'platform'  => $videoData['platform'],
                        'thumbnail' => $thumbPath,
                    ]);
                }
            } else {
                $thumbPath = null;
                $thumbFile = $fileInputs[$index]['thumbnail'] ?? null;
                if ($thumbFile) {
                    $thumbPath = $thumbFile->store('projects/thumbnails', 'public');
                }
                $project->videos()->create([
                    'video_url' => $videoData['video_url'],
                    'title'     => $videoData['title'] ?? null,
                    'platform'  => $videoData['platform'],
                    'thumbnail' => $thumbPath,
                ]);
            }
        }
    }
}
