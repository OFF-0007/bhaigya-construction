<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAmenityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('amenity')?->id ?? $this->route('amenity');

        return [
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:amenities,slug,' . $id,
            'icon' => 'nullable|string|max:255',
        ];
    }
}
