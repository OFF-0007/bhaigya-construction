<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomTypeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'roomTypeName'   => $this->room_type_name,
            'isActive'       => (bool) $this->is_active,
            'primaryImage'   => $this->primary_image ? asset('storage/' . $this->primary_image) : null,
        ];
    }
}
