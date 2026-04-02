<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TechniqueResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'               => $this->id,
            'name'             => $this->name,
            'description'      => $this->description,
            'category'         => [
                'id'          => $this->category->id,
                'name'        => $this->category->name,
                'description' => $this->category->description,
            ],
            'linked_technique' => $this->when(
                !is_null($this->linked_technique),
                fn() => new TechniqueResource($this->linkedTechnique)
            ),
        ];
    }
}
