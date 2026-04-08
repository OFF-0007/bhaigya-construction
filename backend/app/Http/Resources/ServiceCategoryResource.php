<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'category_name' => $this->category_name,
            'is_active'     => $this->is_active,
            'type'          => $this->type,
            'createdAt'     => $this->created_at?->toISOString(),
        ];
    }
}
