<?php

namespace App\Http\Controllers;

use App\Models\TechniqueCategories;
use Illuminate\Http\JsonResponse;
use App\DTOs\TechniqueCategoryDTO;
use App\Http\Requests\TechniqueCategoryRequest;
use App\Http\Resources\TechniqueCategoryResource;

class TechniqueCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = TechniqueCategories::where('user_id', auth()->id())->get();

        return response()->json(TechniqueCategoryResource::collection($categories));
    }

    public function show(int $id): JsonResponse
    {
        $category = TechniqueCategories::where('user_id', auth()->id())->find($id);

        if (!$category) {
            return response()->json(['message' => 'Technique category not found'], 404);
        }

        return response()->json(new TechniqueCategoryResource($category));
    }

    public function store(TechniqueCategoryRequest $request): JsonResponse
    {
        $dto = TechniqueCategoryDTO::fromRequest($request);
        $exists = TechniqueCategories::where('user_id', auth()->id())
            ->where('name', $dto->name)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Name already exists'], 409);
        }

        $category = TechniqueCategories::create([
            ...$dto->toArray(),
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'message'    => 'Categoria de técnica criada com sucesso!',
            'created_id' => $category->id,
        ], 201);
    }

    public function update(TechniqueCategoryRequest $request, int $id): JsonResponse
    {
        $category = TechniqueCategories::where('user_id', auth()->id())->find($id);

        if (!$category) {
            return response()->json(['message' => 'Technique category not found'], 404);
        }

        $dto = TechniqueCategoryDTO::fromRequest($request);

        $exists = TechniqueCategories::where('user_id', auth()->id())
            ->where('name', $dto->name)
            ->where('id', '!=', $id)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Name already exists'], 409);
        }

        $category->update($dto->toArray());

        return response()->json([
            'message'    => 'Categoria de técnica atualizada com sucesso!',
            'updated_id' => $category->id,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $category = TechniqueCategories::where('user_id', auth()->id())->find($id);

        if (!$category) {
            return response()->json(['message' => 'Technique category not found'], 404);
        }

        $category->delete();

        return response()->json([
            'message'    => 'Categoria de técnica excluída com sucesso!',
            'deleted_id' => $category->id,
        ]);
    }
}
