<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\TechniqueResource;

class DailyWorkoutResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'      => $this->id,
            'training_date'    => $this->training_date,
            'observations'     => $this->observations,
            'techniques'       => $this->techniques->map(fn($technique) => new TechniqueResource($technique)),
        ];
    }
}
