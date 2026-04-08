<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectProgressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'project_id'    => 'required|exists:projects,id',
            'title'         => 'required|string|max:255',
            'description'   => 'nullable|string',
            'progress_date' => 'required|date',
            'status'        => 'nullable|in:completed,in_progress',
        ];
    }
}
