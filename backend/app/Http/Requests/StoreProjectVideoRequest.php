<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectVideoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'project_id' => 'required|exists:projects,id',
            'video_url'  => 'required|url|max:2048',
            'title'      => 'nullable|string|max:255',
            'platform'   => 'required|in:youtube,vimeo,upload',
            'thumbnail'  => 'nullable|image|max:2048',
        ];
    }
}
