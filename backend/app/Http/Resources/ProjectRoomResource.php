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
            'projectId'    => $this->project_id,
            'roomTypeId'   => $this->room_type_id,
            'details'      => $this->details ?? [], // JSON data (size, colors, materials, etc.)
            'description'  => $this->description,
            'roomType'     => new RoomTypeResource($this->whenLoaded('roomType')), 
            'images'       => ProjectRoomImageResource::collection($this->whenLoaded('images')),
            'primaryImage' => new ProjectRoomImageResource($this->whenLoaded('primaryImage')),
            'createdAt'    => $this->created_at?->toISOString(),
            'updatedAt'    => $this->updated_at?->toISOString(),
        ];
    }
}
