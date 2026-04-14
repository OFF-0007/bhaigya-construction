<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                    => $this->id,
            'projectName'           => $this->project_name,
            'slug'                  => $this->slug,
            'description'           => $this->description,
            'projectLocation'       => $this->project_location,
            'address'               => $this->address,
            'latitude'              => $this->latitude,
            'longitude'             => $this->longitude,
            'projectStartDate'      => $this->project_start_date?->toDateString(),
            'projectCompletionDate' => $this->project_completion_date?->toDateString(),
            'numberOfRooms'         => $this->number_of_rooms,
            'numberOfFloors'        => $this->number_of_floors,
            'numberOfWashrooms'     => $this->number_of_washrooms,
            'totalArea'             => $this->total_area,
            'carpetArea'            => $this->carpet_area,
            'areaUnit'              => $this->area_unit,
            'status'                => $this->status,
            'isActive'              => $this->is_active,
            'isFeatured'            => $this->is_featured,
            'isCompleted'           => $this->is_completed,
            'isWorking'             => $this->is_working,
            'createdAt'             => $this->created_at?->toISOString(),
            'updatedAt'             => $this->updated_at?->toISOString(),

            // Relationships (lazy-loaded when not available)
            'projectType'           => new ProjectTypeResource($this->whenLoaded('projectType')),
            'district'              => new DistrictResource($this->whenLoaded('district')),
            'serviceCategory'       => $this->whenLoaded('serviceCategory', fn () => [
                'id'   => $this->serviceCategory?->id,
                'name' => $this->serviceCategory?->category_name,
            ]),
            'servicePackage'        => $this->whenLoaded('servicePackage', fn () => [
                'id'    => $this->servicePackage?->id,
                'title' => $this->servicePackage?->title,
            ]),
            'primaryImage'          => new ProjectImageResource($this->whenLoaded('primaryImage')),
            'images'                => ProjectImageResource::collection($this->whenLoaded('images')),
            'documents'             => ProjectDocumentResource::collection($this->whenLoaded('documents')),
            'owners'                => ProjectOwnerResource::collection($this->whenLoaded('owners')),
            'amenities'             => AmenityResource::collection($this->whenLoaded('amenities')),
            'progress'              => ProjectProgressResource::collection($this->whenLoaded('progress')),
            'videos'                => ProjectVideoResource::collection($this->whenLoaded('videos')),
            'rooms'                 => ProjectRoomResource::collection($this->whenLoaded('rooms')),
        ];
    }
}
