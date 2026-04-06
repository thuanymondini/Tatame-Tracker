<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TechniqueCategoryResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id_category'               => $this->id,
            'name_category'             => $this->name,
            'description_category'      => $this->description,
        ];
    }
}
