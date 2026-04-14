<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Amenity;
use App\Models\District;
use App\Models\ImageType;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\ProjectType;
use App\Models\ServiceCategory;
use App\Models\ServicePackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with(['projectType', 'district', 'primaryImage'])
            ->withTrashed(false);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('project_type_id')) {
            $query->where('project_type_id', $request->project_type_id);
        }
        if ($request->filled('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }
        if ($request->filled('search')) {
            $query->where('project_name', 'like', '%' . $request->search . '%');
        }

        $projects = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/Projects/Index', [
            'projects'     => $projects,
            'projectTypes' => ProjectType::where('status', 'active')->get(),
            'filters'      => $request->only(['status', 'project_type_id', 'is_active', 'search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Create', $this->formProps());
    }

    public function store(Request $request)
    {
        $validated = $this->validateProject($request);

        $project = Project::create(array_merge($validated, [
            'slug' => Str::slug($validated['project_name']),
        ]));

        // Sync amenities
        if ($request->filled('amenity_ids')) {
            $project->amenities()->sync(json_decode($request->amenity_ids, true) ?? []);
        }

        // Handle images
        if ($request->hasFile('images')) {
            $this->handleImages($project, $request);
        }

        // Handle documents
        if ($request->hasFile('documents')) {
            $this->handleDocuments($project, $request);
        }

        // Owners
        if ($request->filled('owners')) {
            foreach (json_decode($request->owners, true) as $owner) {
                $project->owners()->create($owner);
            }
        }

        return redirect()->route('admin.projects.edit', $project->id)
            ->with('success', 'Project details saved. Now you can add media and documents.')
            ->with('activeTab', 1);
    }

    public function show(Project $project)
    {
        $project->load([
            'projectType', 'district', 'serviceCategory', 'servicePackage',
            'images.imageType', 'documents', 'owners', 'amenities', 'progress', 'videos',
            'rooms.roomType', 'rooms.images', 'rooms.primaryImage'
        ]);

        return Inertia::render('Admin/Projects/Show', [
            'project' => $project,
            'roomTypes' => \App\Models\RoomType::where('is_active', true)->get(),
        ]);
    }

    public function edit(Project $project, Request $request)
    {
        $project->load([
            'projectType', 'district', 'serviceCategory', 'servicePackage',
            'images.imageType', 'documents', 'owners', 'amenities', 'progress', 'videos',
        ]);

        return Inertia::render('Admin/Projects/Edit', array_merge(
            $this->formProps(),
            [
                'project' => $project,
                'initialTab' => (int) $request->get('tab', session('activeTab', 0))
            ]
        ));
    }

    public function update(Request $request, Project $project)
    {
        $validated = $this->validateProject($request, $project->id);

        if ($project->project_name !== $validated['project_name']) {
            $validated['slug'] = Str::slug($validated['project_name']);
        }

        $project->update($validated);

        // Sync amenities
        if ($request->filled('amenity_ids')) {
            $project->amenities()->sync(json_decode($request->amenity_ids, true) ?? []);
        }

        // Handle new images
        if ($request->hasFile('images')) {
            $this->handleImages($project, $request);
        }

        // Handle new documents
        if ($request->hasFile('documents')) {
            $this->handleDocuments($project, $request);
        }

        // Handle existing image metadata updates
        if ($request->filled('existing_image_meta')) {
            $meta = json_decode($request->existing_image_meta, true) ?? [];
            foreach ($meta as $imgId => $values) {
                ProjectImage::where('id', $imgId)->update([
                    'image_type_id' => $values['imageTypeId'] ?? null,
                    'alt_text'      => $values['altText'] ?? null,
                ]);
            }
        }

        // Delete removed images
        if ($request->filled('deleted_image_ids')) {
            $imageIds = json_decode($request->deleted_image_ids, true) ?? [];
            ProjectImage::whereIn('id', $imageIds)->each(function ($img) {
                Storage::disk('public')->delete($img->file_path);
                $img->delete();
            });
        }

        // Replace owners
        if ($request->filled('owners')) {
            $project->owners()->delete();
            foreach (json_decode($request->owners, true) as $owner) {
                $project->owners()->create($owner);
            }
        }

        // Set primary image
        if ($request->filled('primary_image_id')) {
            $project->images()->update(['is_primary' => false]);
            $project->images()->where('id', $request->primary_image_id)->update(['is_primary' => true]);
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->back()->with('success', 'Project deleted successfully.');
    }

    public function toggleActive(Project $project)
    {
        $project->update(['is_active' => !$project->is_active]);
        return redirect()->back()->with('success', 'Project visibility updated.');
    }

    // ─── Private Helpers ──────────────────────────────────────────────────────

    private function formProps(): array
    {
        return [
            'projectTypes'     => ProjectType::where('status', 'active')->get(),
            'districts'        => District::orderBy('name')->get(),
            'amenities'        => Amenity::orderBy('name')->get(),
            'imageTypes'       => ImageType::orderBy('name')->get(),
            'serviceCategories' => ServiceCategory::where('is_active', true)
                ->whereIn('type', ['project', 'common'])->get(),
            'servicePackages'  => ServicePackage::where('is_active', true)->get(),
        ];
    }

    private function validateProject(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'project_name'          => 'required|string|max:255',
            'project_type_id'       => 'required|exists:project_types,id',
            'service_category_id'   => 'nullable|exists:service_categories,id',
            'service_package_id'    => 'nullable|exists:service_packages,id',
            'description'           => 'required|string',
            'project_location'      => 'required|string|max:255',
            'district_id'           => 'required|exists:districts,id',
            'address'               => 'required|string',
            'latitude'              => 'nullable|numeric',
            'longitude'             => 'nullable|numeric',
            'project_start_date'    => 'nullable|date',
            'project_completion_date' => 'nullable|date',
            'number_of_rooms'       => 'nullable|integer|min:0',
            'number_of_floors'      => 'nullable|integer|min:0',
            'number_of_washrooms'   => 'nullable|integer|min:0',
            'total_area'            => 'nullable|numeric|min:0',
            'carpet_area'           => 'nullable|numeric|min:0',
            'area_unit'             => 'required|in:sqft,sqm',
            'status'                => 'required|in:ongoing,completed,upcoming',
            'is_active'             => 'boolean',
            'is_featured'           => 'boolean',
            'is_completed'          => 'boolean',
            'is_working'            => 'boolean',
        ]);
    }

    private function handleImages(Project $project, Request $request): void
    {
        $imageTypes    = json_decode($request->image_types ?? '[]', true);
        $altTexts      = json_decode($request->image_alt_texts ?? '[]', true);
        $primaryIndex  = (int) ($request->primary_image_index ?? 0);
        $existingHasPrimary = $project->images()->where('is_primary', true)->exists();

        foreach ($request->file('images') as $index => $file) {
            $isPrimary = !$existingHasPrimary && $index === $primaryIndex;
            if ($isPrimary) {
                $project->images()->update(['is_primary' => false]);
            }
            $path = $file->store('projects/images', 'public');
            $project->images()->create([
                'image_type_id' => !empty($imageTypes[$index]) ? $imageTypes[$index] : ImageType::first()->id ?? 1,
                'file_path'     => $path,
                'alt_text'      => $altTexts[$index] ?? null,
                'is_primary'    => $isPrimary,
                'sort_order'    => $index,
            ]);
        }
    }

    private function handleDocuments(Project $project, Request $request): void
    {
        $docNames  = json_decode($request->document_names ?? '[]', true);
        $docTypes  = json_decode($request->document_types ?? '[]', true);

        foreach ($request->file('documents') as $index => $file) {
            $path = $file->store('projects/documents', 'public');
            $project->documents()->create([
                'document_name' => $docNames[$index] ?? $file->getClientOriginalName(),
                'file_path'     => $path,
                'document_type' => $docTypes[$index] ?? 'other',
            ]);
        }
    }
}
