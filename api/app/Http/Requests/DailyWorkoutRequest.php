<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DailyWorkoutRequest extends FormRequest
{
    public function rules(): array
    {
        $userId = auth()->id();

        return [
            'training_date' => 'required|date',
            'observations'  => 'nullable|string|max:400',
            'techniques'    => 'required|array',
            'techniques.*'  => [
                Rule::exists('techniques', 'id')->where('user_id', $userId),
            ],
        ];
    }
}
