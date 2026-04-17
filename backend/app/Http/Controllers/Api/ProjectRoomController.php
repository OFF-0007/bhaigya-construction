<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectRoomResource;
use App\Models\Project;
use App\Models\ProjectRoom;
use App\Models\ProjectRoomImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProjectRoomController extends Controller
{
    public function index(Project $project): JsonResponse
    {
        $rooms = $project->rooms()->with(['roomType', 'images', 'primaryImage'])->get();
        return response()->json([
            'data' => ProjectRoomResource::collection($rooms)
        ]);
    }

    public function store(Request $request, Project $project): ProjectRoomResource
    {
        return DB::transaction(function () use ($request, $project) {
            $room = $project->rooms()->create([
                'room_type_id' => $request->room_type_id,
                'details'      => is_string($request->details) ? json_decode($request->details, true) : $request->details,
                'description'  => $request->description,
            ]);

            if ($request->hasFile('images')) {
                $this->storeImages($room, $request);
            }

            $room->load(['roomType', 'images', 'primaryImage']);
            return new ProjectRoomResource($room);
        });
    }

    public function update(Request $request, ProjectRoom $room): ProjectRoomResource
    {
        return DB::transaction(function () use ($request, $room) {
            $room->update([
                'room_type_id' => $request->room_type_id ?? $room->room_type_id,
                'details'      => is_string($request->details) ? json_decode($request->details, true) : ($request->details ?? $room->details),
                'description'  => $request->description ?? $room->description,
            ]);

            if ($request->has('deleted_image_ids')) {
                $ids = is_string($request->deleted_image_ids) ? json_decode($request->deleted_image_ids, true) : (array) $request->deleted_image_ids;
                ProjectRoomImage::whereIn('id', $ids)->where('project_room_id', $room->id)->each(function ($img) {
                    Storage::disk('public')->delete($img->file_path);
                    $img->delete();
                });
            }

            if ($request->hasFile('images')) {
                $this->storeImages($room, $request);
            }

            $room->load(['roomType', 'images', 'primaryImage']);
            return new ProjectRoomResource($room);
        });
    }

    public function destroy(ProjectRoom $room): JsonResponse
    {
        $room->images->each(function ($img) {
            Storage::disk('public')->delete($img->file_path);
        });
        $room->delete();
        return response()->json(['message' => 'Room deleted successfully.']);
    }

    private function storeImages(ProjectRoom $room, Request $request): void
    {
        $files = $request->file('images');
        $imagesData = is_string($request->images_data) ? json_decode($request->images_data, true) : ($request->images_data ?? []);

        foreach ($files as $index => $file) {
            $path = $file->store('projects/rooms', 'public');
            
            $data = $imagesData[$index] ?? [];
            $isPrimary = filter_var($data['is_primary'] ?? false, FILTER_VALIDATE_BOOLEAN);

            if ($isPrimary) {
                $room->images()->update(['is_primary' => false]);
            }

            $room->images()->create([
                'image_name'    => $data['image_name'] ?? null,
                'file_path'     => $path,
                'alt_text'      => $data['alt_text'] ?? null,
                'image_details' => $data['image_details'] ?? null,
                'is_primary'    => $isPrimary,
                'sort_order'    => $data['sort_order'] ?? $index,
            ]);
        }
    }
}
