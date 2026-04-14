<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectRoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'project_id'   => $this->project_id,
            'room_type_id' => $this->room_type_id,
            'details'      => $this->details ?? [], // JSON data (size, colors, materials, etc.)
            'description'  => $this->description,
            'room_type'    => new RoomTypeResource($this->whenLoaded('roomType')), // Wait, I should check if there is a RoomTypeResource
            'images'       => ProjectRoomImageResource::collection($this->whenLoaded('images')),
            'primary_image'=> new ProjectRoomImageResource($this->whenLoaded('primaryImage')),
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at,
        ];
    }
}
