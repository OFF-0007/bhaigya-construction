<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServicePackageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => 'required|exists:service_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'benefits' => 'nullable|array',
            'is_active' => 'required|boolean',
            'popularity' => 'required|in:standard,popular,premium',
            'price' => 'nullable|numeric|min:0',
            'is_featured' => 'required|boolean',
        ];
    }
}
