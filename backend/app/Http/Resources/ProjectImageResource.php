<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectImageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'projectId'   => $this->project_id,
            'imageType'   => new ImageTypeResource($this->whenLoaded('imageType')),
            'fileUrl'     => asset('storage/' . $this->file_path),
            'altText'     => $this->alt_text,
            'isPrimary'   => $this->is_primary,
            'sortOrder'   => $this->sort_order,
            'createdAt'   => $this->created_at?->toISOString(),
        ];
    }
}
