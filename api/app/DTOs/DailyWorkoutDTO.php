<?php

namespace App\DTOs;

use App\Models\DailyWorkouts;
use App\Http\Requests\DailyWorkoutRequest;
use Illuminate\Support\Carbon;

class DailyWorkoutDTO
{
    public function __construct(
        public readonly Carbon  $training_date,
        public readonly ?string $observations,
        public readonly array   $techniques,
    ) {}

    // Cria o DTO a partir de um Request
    public static function fromRequest(DailyWorkoutRequest $request): self
    {
        return new self(
            training_date: Carbon::parse($request->input('training_date')),
            observations:  $request->input('observations'),
            techniques:    $request->input('techniques'),
        );
    }

    // Cria o DTO a partir de um Model
    public static function fromModel(DailyWorkouts $dailyWorkout): self
    {
        return new self(
            training_date: Carbon::parse($dailyWorkout->training_date),
            observations:  $dailyWorkout->observations,
            techniques:    $dailyWorkout->techniques->pluck('id')->toArray(),
        );
    }

    // Converte para array
    public function toArray(): array
    {
        return [
            'training_date' => $this->training_date->toDateString(), // formato Y-m-d
            'observations'  => $this->observations,
            'techniques'    => $this->techniques,
        ];
    }
}
