<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('project')?->id ?? $this->route('project');

        return [
            // Core fields
            'project_name'          => 'required|string|max:255',
            'slug'                  => 'nullable|string|max:255|unique:projects,slug,' . $id,
            'project_type_id'       => 'required|exists:project_types,id',
            'service_category_id'   => 'nullable|exists:service_categories,id',
            'service_package_id'    => 'nullable|exists:service_packages,id',
            'description'           => 'required|string',
            'project_location'      => 'required|string|max:255',
            'district_id'           => 'required|exists:districts,id',
            'address'               => 'required|string',
            'latitude'              => 'nullable|numeric|between:-90,90',
            'longitude'             => 'nullable|numeric|between:-180,180',
            'project_start_date'    => 'nullable|date',
            'project_completion_date' => 'nullable|date|after_or_equal:project_start_date',
            'number_of_rooms'       => 'nullable|integer|min:0',
            'number_of_floors'      => 'nullable|integer|min:0',
            'number_of_washrooms'   => 'nullable|integer|min:0',
            'total_area'            => 'nullable|numeric|min:0',
            'carpet_area'           => 'nullable|numeric|min:0',
            'area_unit'             => 'required|in:sqft,sqm',
            'status'                => 'required|in:ongoing,completed,upcoming',
            'is_active'             => 'boolean',
            'is_featured'           => 'boolean',
            'is_completed'          => 'boolean',
            'is_working'            => 'boolean',

            // Amenities sync
            'amenities'             => 'nullable|array',
            'amenities.*'           => 'integer|exists:amenities,id',

            // Images — existing images pass `id`, new ones pass `file`
            'images'                => 'nullable|array',
            'images.*.id'           => 'nullable|exists:project_images,id',
            'images.*.file'         => 'nullable|file|image|max:5120',
            'images.*.image_type_id' => 'required|exists:image_types,id',
            'images.*.alt_text'     => 'nullable|string|max:255',
            'images.*.is_primary'   => 'boolean',
            'images.*.sort_order'   => 'integer|min:0',

            // Documents
            'documents'             => 'nullable|array',
            'documents.*.id'        => 'nullable|exists:project_documents,id',
            'documents.*.file'      => 'nullable|file|max:10240',
            'documents.*.document_name' => 'required|string|max:255',
            'documents.*.document_type' => 'required|in:plan,approval,brochure,other',

            // Owners
            'owners'                => 'nullable|array',
            'owners.*.id'           => 'nullable|exists:project_owners,id',
            'owners.*.name'         => 'required|string|max:255',
            'owners.*.phone'        => 'nullable|string|max:20',
            'owners.*.email'        => 'nullable|email|max:255',
            'owners.*.address'      => 'nullable|string',

            // Progress
            'progress'              => 'nullable|array',
            'progress.*.id'         => 'nullable|exists:project_progress,id',
            'progress.*.title'      => 'required|string|max:255',
            'progress.*.description' => 'nullable|string',
            'progress.*.progress_date' => 'required|date',
            'progress.*.status'     => 'nullable|in:completed,in_progress',

            // Videos
            'videos'                => 'nullable|array',
            'videos.*.id'           => 'nullable|exists:project_videos,id',
            'videos.*.video_url'    => 'required|url|max:2048',
            'videos.*.title'        => 'nullable|string|max:255',
            'videos.*.platform'     => 'required|in:youtube,vimeo,upload',
            'videos.*.thumbnail'    => 'nullable|image|max:2048',
        ];
    }
}
