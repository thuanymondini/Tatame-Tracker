<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\TechniqueCategories;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TechniqueCategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json(TechniqueCategories::all());
    }

    public function show(int $id): JsonResponse
    {
        $techniqueCategory = TechniqueCategories::find($id);

        if (!$techniqueCategory) {
            return response()->json(['message' => 'Technique category not found'], 404);
        }

        return response()->json($techniqueCategory);
    }

    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string|max:400',
        ]);

        $techniqueCategory = TechniqueCategories::create($validatedData);

        return response()->json($techniqueCategory, 201);
    }
}
