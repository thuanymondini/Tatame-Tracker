<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TechniqueRequest extends FormRequest
{
    public function rules(): array
    {
        $id = $this->route('id');

        return [
            'name'             => 'required|string|max:100',
            'description'      => 'nullable|string|max:400',
            'category_id'      => 'required|exists:technique_categories,id',
            'linked_technique' => [
                'nullable',
                'exists:techniques,id',
                Rule::notIn([$id]),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'linked_technique.not_in' => 'A technique cannot be linked to itself.',
        ];
    }
}
