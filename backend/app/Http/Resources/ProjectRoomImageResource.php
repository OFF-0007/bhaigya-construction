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
            'fileUrl'         => $this->file_path ? asset('storage/' . $this->file_path) : null,
            'altText'         => $this->alt_text,
            'imageDetails'    => $this->image_details ?? [], // JSON specifications
            'isPrimary'       => (bool) $this->is_primary,
            'sortOrder'       => (int) $this->sort_order,
            'createdAt'       => $this->created_at?->toISOString(),
            'updatedAt'       => $this->updated_at?->toISOString(),
        ];
    }
}
