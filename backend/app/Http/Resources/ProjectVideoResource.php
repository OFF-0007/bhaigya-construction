<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectVideoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'projectId'    => $this->project_id,
            'videoUrl'     => $this->video_url,
            'title'        => $this->title,
            'platform'     => $this->platform,
            'thumbnailUrl' => $this->thumbnail ? asset('storage/' . $this->thumbnail) : null,
            'createdAt'    => $this->created_at?->toISOString(),
        ];
    }
}
