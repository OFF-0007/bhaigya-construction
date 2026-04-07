<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectTypeRequest;
use App\Http\Requests\UpdateProjectTypeRequest;
use App\Http\Resources\ProjectTypeResource;
use App\Models\ProjectType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectTypeController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $types = ProjectType::latest()->get();
        return ProjectTypeResource::collection($types);
    }

    public function store(StoreProjectTypeRequest $request): ProjectTypeResource
    {
        $type = ProjectType::create($request->validated());
        return new ProjectTypeResource($type);
    }

    public function show(ProjectType $projectType): ProjectTypeResource
    {
        return new ProjectTypeResource($projectType);
    }

    public function update(UpdateProjectTypeRequest $request, ProjectType $projectType): ProjectTypeResource
    {
        $projectType->update($request->validated());
        return new ProjectTypeResource($projectType->fresh());
    }

    public function destroy(ProjectType $projectType): JsonResponse
    {
        $projectType->delete();
        return response()->json(['message' => 'Project type deleted successfully.']);
    }
}
