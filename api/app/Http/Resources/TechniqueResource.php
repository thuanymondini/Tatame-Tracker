<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TechniqueResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id_technique'           => $this->id,
            'name_technique'         => $this->name,
            'description_technique'  => $this->description,
            'category'               => [
                'id_category'             => $this->category->id,
                'name_category'           => $this->category->name,
                'description_category'    => $this->category->description,
            ],
            'linked_technique'       => $this->when(
                !is_null($this->linked_technique),
                fn() => new TechniqueResource($this->linkedTechnique)
            ),
        ];
    }
}
