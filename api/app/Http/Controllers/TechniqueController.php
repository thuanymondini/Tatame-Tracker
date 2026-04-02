<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Techniques;
use Illuminate\Http\JsonResponse;
use App\DTOs\TechniqueDTO;
use App\Http\Requests\TechniqueRequest;
use App\Http\Resources\TechniqueResource;
use Illuminate\Support\Collection;

class TechniqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $techniques = $this->loadWithParents();

        return response()->json(TechniqueResource::collection($techniques));
    }

    public function show(int $id): JsonResponse
    {
        $technique = $this->loadWithParents($id);

        if (!$technique) {
            return response()->json(['message' => 'Technique not found'], 404);
        }

        return response()->json(new TechniqueResource($technique));
    }

    public function store(TechniqueRequest $request): JsonResponse
    {
        $dto = TechniqueDTO::fromRequest($request);

        $exists = Techniques::where('name', $dto->name)->exists();

        if ($exists) {
            return response()->json(['message' => 'Name already exists'], 409);
        }

        $technique = Techniques::create($dto->toArray());

        return response()->json($technique, 201);
    }

    public function update(TechniqueRequest $request, int $id): JsonResponse
    {
        $technique = Techniques::find($id);

        if (!$technique) {
            return response()->json(['message' => 'Technique not found'], 404);
        }

        $dto = TechniqueDTO::fromRequest($request);

        $exists = Techniques::where('name', $dto->name)->where('id', '!=', $id)->exists();

        if ($exists) {
            return response()->json(['message' => 'Name already exists'], 409);
        }

        $technique->update($dto->toArray());

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

    private function loadWithParents(?int $id = null, array $visited = []): Collection|Techniques|null
    {
        if ($id !== null) {
            if (in_array($id, $visited)) return null; // evita loop infinito
            $visited[] = $id;

            $technique = Techniques::with('category')->find($id);

            if ($technique && $technique->linked_technique) {
                $technique->setRelation(
                    'linkedTechnique',
                    $this->loadWithParents($technique->linked_technique, $visited)
                );
            }

            return $technique;
        }

        return Techniques::with('category')->get()->map(function ($technique) {
            if ($technique->linked_technique) {
                $technique->setRelation(
                    'linkedTechnique',
                    $this->loadWithParents($technique->linked_technique, [$technique->id])
                );
            }
            return $technique;
        });
    }
}
