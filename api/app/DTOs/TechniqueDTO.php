<?php

namespace App\DTOs;
use App\Models\Techniques;
use App\Http\Requests\TechniqueRequest;

class TechniqueDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $description,
        public readonly int    $category_id,
        public readonly ?int   $linked_technique = null,
    ) {}

    // Cria o DTO a partir de um Request
    public static function fromRequest(TechniqueRequest $request): self
    {
        return new self(
            name:              $request->input('name'),
            description:       $request->input('description'),
            category_id:       $request->input('category_id'),
            linked_technique:  $request->input('linked_technique'),
        );
    }

    // Cria o DTO a partir de um Model
    public static function fromModel(Techniques $technique): self
    {
        return new self(
            name:             $technique->name,
            description:      $technique->description,
            category_id:      $technique->category_id,
            linked_technique: $technique->linked_technique,
        );
    }

    // Converte para array
    public function toArray(): array
    {
        return [
            'name'             => $this->name,
            'description'      => $this->description,
            'category_id'      => $this->category_id,
            'linked_technique' => $this->linked_technique,
        ];
    }
}
