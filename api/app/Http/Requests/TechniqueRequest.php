<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TechniqueRequest extends FormRequest
{
    public function rules(): array
    {
        $id     = $this->route('id');
        $userId = auth()->id();

        return [
            'name'        => 'required|string|max:100',
            'description' => 'nullable|string|max:400',

            'category_id' => [
                'required',
                Rule::exists('technique_categories', 'id')->where('user_id', $userId),
            ],

            'linked_technique' => [
                'nullable',
                Rule::exists('techniques', 'id')->where('user_id', $userId),
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
