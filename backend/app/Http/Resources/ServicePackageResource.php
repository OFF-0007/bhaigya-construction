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
            'categoryId'    => $this->category_id,
            'title'         => $this->title,
            'slug'          => $this->slug,
            'description'   => $this->description,
            'image'         => $this->image,
            'imageUrl'      => $this->image ? asset('storage/' . $this->image) : null,
            'benefits'      => $this->benefits,
            'isActive'      => (bool) $this->is_active,
            'popularity'    => $this->popularity,
            'price'         => $this->price,
            'isFeatured'    => (bool) $this->is_featured,
            'category'      => new ServiceCategoryResource($this->whenLoaded('category')),
            'createdAt'     => $this->created_at?->toISOString(),
            'updatedAt'     => $this->updated_at?->toISOString(),
        ];
    }
}
