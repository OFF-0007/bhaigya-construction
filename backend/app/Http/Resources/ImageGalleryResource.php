<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageGalleryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'image_type_id' => $this->image_type_id,
            'image_name' => $this->image_name,
            'description' => $this->description,
            'upload_image' => $this->upload_image ? asset('storage/' . $this->upload_image) : null,
            'is_active' => (bool) $this->is_active,
            'image_type' => new ImageTypeResource($this->whenLoaded('imageType')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
