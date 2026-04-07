<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectVideoRequest;
use App\Http\Requests\UpdateProjectVideoRequest;
use App\Http\Resources\ProjectVideoResource;
use App\Models\ProjectVideo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;

class ProjectVideoController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = ProjectVideo::query();

        if ($request->filled('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        $videos = $query->latest()->get();
        return ProjectVideoResource::collection($videos);
    }

    public function store(StoreProjectVideoRequest $request): ProjectVideoResource
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('projects/thumbnails', 'public');
        }

        $video = ProjectVideo::create($data);
        return new ProjectVideoResource($video);
    }

    public function show(ProjectVideo $projectVideo): ProjectVideoResource
    {
        return new ProjectVideoResource($projectVideo);
    }

    public function update(UpdateProjectVideoRequest $request, ProjectVideo $projectVideo): ProjectVideoResource
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail
            if ($projectVideo->thumbnail) {
                Storage::disk('public')->delete($projectVideo->thumbnail);
            }
            $data['thumbnail'] = $request->file('thumbnail')->store('projects/thumbnails', 'public');
        }

        $projectVideo->update($data);
        return new ProjectVideoResource($projectVideo->fresh());
    }

    public function destroy(ProjectVideo $projectVideo): JsonResponse
    {
        if ($projectVideo->thumbnail) {
            Storage::disk('public')->delete($projectVideo->thumbnail);
        }
        $projectVideo->delete();
        return response()->json(['message' => 'Video deleted successfully.']);
    }
}
