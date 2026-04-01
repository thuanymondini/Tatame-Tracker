<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Techniques;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TechniqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json(Techniques::with(['parentTechnique', 'category'])->get());
    }

    public function show(int $id): JsonResponse
    {
        $technique = Techniques::with(['parentTechnique', 'category'])->find($id);

        if (!$technique) {
            return response()->json(['message' => 'Technique not found'], 404);
        }

        return response()->json($technique);
    }

    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string|max:400',
            'category_id'=> 'required|exists:technique_categories,id',
            'linked_technique'=> 'nullable|exists:techniques,id',
        ]);

        $exists = Techniques::where('name', $validatedData['name'])->exists();

        if ($exists) {
            return response()->json(['message' => 'Name already exists'], 409);
        }

        $technique = Techniques::create($validatedData);

        return response()->json($technique, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $technique = Techniques::find($id);

        if (!$technique) {
            return response()->json(['message' => 'Technique not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string|max:400',
            'category_id'=> 'required|exists:technique_categories,id',
            'linked_technique'=> 'nullable|exists:techniques,id',
        ]);

        $exists = Techniques::where('name', $validatedData['name'])->where('id', '!=', $id)->exists();

        if ($exists) {
            return response()->json(['message' => 'Name already exists'], 409);
        }

        $technique->update($validatedData);

        return response()->json($technique);
    }

    public function destroy(int $id): JsonResponse
    {
        $technique = Techniques::find($id);

        if (!$technique) {
            return response()->json(['message' => 'Technique not found'], 404);
        }

        $technique->delete();

        return response()->json(['message' => 'Technique deleted successfully']);
    }
}
