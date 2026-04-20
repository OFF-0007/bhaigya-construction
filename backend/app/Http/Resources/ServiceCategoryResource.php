<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'categoryName' => $this->category_name,
            'categoryImage'=> $this->category_image ? url('storage/' . $this->category_image) : null,
            'isActive'     => (bool) $this->is_active,
            'type'         => $this->type,
            'createdAt'    => $this->created_at?->toISOString(),
            'updatedAt'    => $this->updated_at?->toISOString(),
        ];
    }
}
