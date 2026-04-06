<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DailyWorkoutRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'training_date' => 'required|date',
            'observations'  => 'nullable|string|max:400',
            'techniques'    => 'required|array|exists:techniques,id',
        ];
    }
}
