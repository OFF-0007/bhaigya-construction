<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateImageTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('image_type')?->id ?? $this->route('image_type');

        return [
            'name'        => 'required|string|max:255',
            'slug'        => 'nullable|string|max:255|unique:image_types,slug,' . $id,
            'description' => 'nullable|string',
        ];
    }
}
