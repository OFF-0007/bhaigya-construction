<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectOwnerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'projectId' => $this->project_id,
            'name'      => $this->name,
            'phone'     => $this->phone,
            'email'     => $this->email,
            'address'   => $this->address,
        ];
    }
}
