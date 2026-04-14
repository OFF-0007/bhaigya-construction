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
            'room_type_name' => $this->room_type_name,
            'is_active'      => (bool) $this->is_active,
            'primary_image'  => $this->primary_image,
        ];
    }
}
