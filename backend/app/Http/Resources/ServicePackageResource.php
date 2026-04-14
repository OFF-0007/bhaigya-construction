<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServicePackageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'title'         => $this->title,
            'slug'          => $this->slug,
            'description'   => $this->description,
            'image'         => $this->image,
            'image_url'     => $this->image ? asset('storage/' . $this->image) : null,
            'benefits'      => $this->benefits,
            'is_active'     => $this->is_active,
            'popularity'    => $this->popularity,
            'price'         => $this->price,
            'is_featured'   => $this->is_featured,
            'category'      => new ServiceCategoryResource($this->whenLoaded('category')),
            'createdAt'     => $this->created_at?->toISOString(),
        ];
    }
}
