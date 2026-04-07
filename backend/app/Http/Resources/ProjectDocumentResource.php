<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectDocumentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'projectId'    => $this->project_id,
            'documentName' => $this->document_name,
            'fileUrl'      => asset('storage/' . $this->file_path),
            'documentType' => $this->document_type,
            'createdAt'    => $this->created_at?->toISOString(),
        ];
    }
}
