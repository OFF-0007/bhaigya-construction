<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:255',
            'slug'        => 'nullable|string|unique:project_types,slug|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:active,inactive',
        ];
    }
}
