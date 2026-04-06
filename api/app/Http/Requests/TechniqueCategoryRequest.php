<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TechniqueCategoryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'             => 'required|string|max:100',
            'description'      => 'nullable|string|max:400',
        ];
    }
}
