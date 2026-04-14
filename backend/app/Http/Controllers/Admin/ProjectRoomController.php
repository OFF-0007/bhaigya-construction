<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectRoom;
use App\Models\ProjectRoomImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProjectRoomController extends Controller
{
    public function store(Request $request, Project $project)
    {
        $request->validate([
            'rooms' => 'required|array|min:1',
            'rooms.*.room_type_id' => 'required|exists:room_types,id',
            'rooms.*.details'      => 'nullable|array',
            'rooms.*.description'  => 'nullable|string',
        ]);

        DB::transaction(function () use ($request, $project) {
            foreach ($request->rooms as $index => $roomData) {
                // Handle details if they come as a JSON string from FormData
                $details = $roomData['details'] ?? null;
                if (is_string($details)) {
                    $details = json_decode($details, true);
                }

                $room = $project->rooms()->create([
                    'room_type_id' => $roomData['room_type_id'],
                    'details'      => $details,
                    'description'  => $roomData['description'] ?? null,
                ]);

                // Handle images for this specific room index
                if ($request->hasFile("rooms.{$index}.images")) {
                    $imagesData = $roomData['images_data'] ?? [];
                    if (is_string($imagesData)) {
                        $imagesData = json_decode($imagesData, true);
                    }
                    $this->storeRoomImages($room, $request->file("rooms.{$index}.images"), $imagesData);
                }
            }
        });

        return redirect()->back()->with('success', 'Rooms added successfully.');
    }

    public function update(Request $request, ProjectRoom $room)
    {
        $request->validate([
            'room_type_id' => 'nullable|exists:room_types,id',
            'details'      => 'nullable|array',
            'description'  => 'nullable|string',
        ]);

        DB::transaction(function () use ($request, $room) {
            $details = $request->details ?? $room->details;
            if (is_string($details)) {
                $details = json_decode($details, true);
            }

            $room->update([
                'room_type_id' => $request->room_type_id ?? $room->room_type_id,
                'details'      => $details,
                'description'  => $request->description ?? $room->description,
            ]);

            if ($request->filled('deleted_image_ids')) {
                $ids = $request->deleted_image_ids;
                if (is_string($ids)) {
                    $ids = json_decode($ids, true);
                }
                
                ProjectRoomImage::whereIn('id', (array) $ids)->where('project_room_id', $room->id)->each(function ($img) {
                    Storage::disk('public')->delete($img->file_path);
                    $img->delete();
                });
            }

            if ($request->hasFile('images')) {
                $imagesData = $request->images_data ?? [];
                if (is_string($imagesData)) {
                    $imagesData = json_decode($imagesData, true);
                }
                $this->storeRoomImages($room, $request->file('images'), (array) $imagesData);
            }
        });

        return redirect()->back()->with('success', 'Room updated successfully.');
    }

    public function destroy(ProjectRoom $room)
    {
        $room->images->each(function ($img) {
            Storage::disk('public')->delete($img->file_path);
        });
        $room->delete();
        return redirect()->back()->with('success', 'Room deleted successfully.');
    }

    private function storeRoomImages(ProjectRoom $room, array $files, array $imagesData): void
    {
        $existingHasPrimary = $room->images()->where('is_primary', true)->exists();

        foreach ($files as $index => $file) {
            $data = $imagesData[$index] ?? [];
            $isPrimary = !$existingHasPrimary && (filter_var($data['is_primary'] ?? false, FILTER_VALIDATE_BOOLEAN));
            
            if ($isPrimary) {
                $room->images()->update(['is_primary' => false]);
                $existingHasPrimary = true;
            }

            $path = $file->store('projects/rooms', 'public');
            
            // New fields: image_name and image_details
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
