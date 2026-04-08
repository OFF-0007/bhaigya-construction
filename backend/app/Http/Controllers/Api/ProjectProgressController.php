<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectProgressRequest;
use App\Http\Requests\UpdateProjectProgressRequest;
use App\Http\Resources\ProjectProgressResource;
use App\Models\ProjectProgress;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectProgressController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = ProjectProgress::query();

        if ($request->filled('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        $progress = $query->orderBy('progress_date', 'desc')->get();
        return ProjectProgressResource::collection($progress);
    }

    public function store(StoreProjectProgressRequest $request): ProjectProgressResource
    {
        $progress = ProjectProgress::create($request->validated());
        return new ProjectProgressResource($progress);
    }

    public function show(ProjectProgress $projectProgress): ProjectProgressResource
    {
        return new ProjectProgressResource($projectProgress);
    }

    public function update(UpdateProjectProgressRequest $request, ProjectProgress $projectProgress): ProjectProgressResource
    {
        $projectProgress->update($request->validated());
        return new ProjectProgressResource($projectProgress->fresh());
    }

    public function destroy(ProjectProgress $projectProgress): JsonResponse
    {
        $projectProgress->delete();
        return response()->json(['message' => 'Progress entry deleted successfully.']);
    }
}
