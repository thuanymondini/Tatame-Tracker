<?php

namespace App\DTOs;
use App\Models\TechniqueCategories;
use App\Http\Requests\TechniqueCategoryRequest;

class TechniqueCategoryDTO
{
    public function __construct(
        public readonly string $name,
        public readonly ?string $description,
    ) {}

    // Cria o DTO a partir de um Request
    public static function fromRequest(TechniqueCategoryRequest $request): self
    {
        return new self(
            name:              $request->input('name'),
            description:       $request->input('description'),
        );
    }

    // Cria o DTO a partir de um Model
    public static function fromModel(TechniqueCategories $category): self
    {
        return new self(
            name:             $category->name,
            description:      $category->description,
        );
    }

    // Converte para array
    public function toArray(): array
    {
        return [
            'name'             => $this->name,
            'description'      => $this->description,
        ];
    }
}
