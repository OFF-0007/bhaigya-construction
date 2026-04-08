<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Core fields
            'project_name'          => 'required|string|max:255',
            'slug'                  => 'nullable|string|unique:projects,slug|max:255',
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

            // Amenities (array of existing IDs)
            'amenities'             => 'nullable|array',
            'amenities.*'           => 'integer|exists:amenities,id',

            // Nested images
            'images'                => 'nullable|array',
            'images.*.file'         => 'required_with:images|file|image|max:5120',
            'images.*.image_type_id' => 'required_with:images|exists:image_types,id',
            'images.*.alt_text'     => 'nullable|string|max:255',
            'images.*.is_primary'   => 'boolean',
            'images.*.sort_order'   => 'integer|min:0',

            // Nested documents
            'documents'             => 'nullable|array',
            'documents.*.file'      => 'required_with:documents|file|max:10240',
            'documents.*.document_name' => 'required_with:documents|string|max:255',
            'documents.*.document_type' => 'required_with:documents|in:plan,approval,brochure,other',

            // Nested owners
            'owners'                => 'nullable|array',
            'owners.*.name'         => 'required_with:owners|string|max:255',
            'owners.*.phone'        => 'nullable|string|max:20',
            'owners.*.email'        => 'nullable|email|max:255',
            'owners.*.address'      => 'nullable|string',

            // Nested progress
            'progress'              => 'nullable|array',
            'progress.*.title'      => 'required_with:progress|string|max:255',
            'progress.*.description' => 'nullable|string',
            'progress.*.progress_date' => 'required_with:progress|date',
            'progress.*.status'     => 'nullable|in:completed,in_progress',

            // Nested videos
            'videos'                => 'nullable|array',
            'videos.*.video_url'    => 'required_with:videos|url|max:2048',
            'videos.*.title'        => 'nullable|string|max:255',
            'videos.*.platform'     => 'required_with:videos|in:youtube,vimeo,upload',
            'videos.*.thumbnail'    => 'nullable|image|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'project_type_id.exists'    => 'The selected project type is invalid.',
            'district_id.exists'        => 'The selected district is invalid.',
            'amenities.*.exists'        => 'One or more selected amenities are invalid.',
            'images.*.image_type_id.exists' => 'One or more image types are invalid.',
        ];
    }
}
