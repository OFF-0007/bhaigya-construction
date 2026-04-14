<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectRoomImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'project_room_id' => $this->project_room_id,
            'image_name'      => $this->image_name,
            'file_path'       => $this->file_path,
            'alt_text'        => $this->alt_text,
            'image_details'   => $this->image_details ?? [], // JSON specifications
            'is_primary'      => (bool) $this->is_primary,
            'sort_order'      => (int) $this->sort_order,
            'created_at'      => $this->created_at,
            'updated_at'      => $this->updated_at,
        ];
    }
}
