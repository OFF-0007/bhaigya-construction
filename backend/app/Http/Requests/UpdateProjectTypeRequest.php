<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('project_type')?->id ?? $this->route('project_type');

        return [
            'name'        => 'required|string|max:255',
            'slug'        => 'nullable|string|max:255|unique:project_types,slug,' . $id,
            'description' => 'nullable|string',
            'status'      => 'required|in:active,inactive',
        ];
    }
}
