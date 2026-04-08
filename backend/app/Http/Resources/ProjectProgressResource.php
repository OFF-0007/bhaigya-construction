<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectProgressResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'projectId'    => $this->project_id,
            'title'        => $this->title,
            'description'  => $this->description,
            'progressDate' => $this->progress_date?->toDateString(),
            'status'       => $this->status,
            'createdAt'    => $this->created_at?->toISOString(),
        ];
    }
}
