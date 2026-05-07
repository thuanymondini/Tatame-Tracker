<?php

namespace App\Http\Controllers;

use App\Models\Techniques;
use Illuminate\Http\JsonResponse;
use App\DTOs\TechniqueDTO;
use App\Http\Requests\TechniqueRequest;
use App\Http\Resources\TechniqueResource;
use Illuminate\Support\Collection;

class TechniqueController extends Controller
{
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

        $technique = Techniques::create([
            ...$dto->toArray(),
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'message'    => 'Técnica criada com sucesso!',
            'created_id' => $technique->id,
        ], 201);
    }

    public function update(TechniqueRequest $request, int $id): JsonResponse
    {
        $technique = Techniques::where('user_id', auth()->id())->find($id);

        if (!$technique) {
            return response()->json(['message' => 'Technique not found'], 404);
        }

        $dto = TechniqueDTO::fromRequest($request);
        $technique->update($dto->toArray());

        return response()->json([
            'message'    => 'Técnica atualizada com sucesso!',
            'updated_id' => $technique->id,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $technique = Techniques::where('user_id', auth()->id())->find($id);

        if (!$technique) {
            return response()->json(['message' => 'Technique not found'], 404);
        }

        $technique->delete();

        return response()->json([
            'message'    => 'Técnica excluída com sucesso!',
            'deleted_id' => $technique->id,
        ]);
    }

    private function loadWithParents(?int $id = null, array $visited = []): Collection|Techniques|null
    {
        $userId = auth()->id();

        if ($id !== null) {
            if (in_array($id, $visited)) return null;
            $visited[] = $id;

            $technique = Techniques::with('category')
                ->where('user_id', $userId)
                ->find($id);

            if ($technique && $technique->linked_technique) {
                $technique->setRelation(
                    'linkedTechnique',
                    $this->loadWithParents($technique->linked_technique, $visited)
                );
            }

            return $technique;
        }

        return Techniques::with('category')
            ->where('user_id', $userId)
            ->get()
            ->map(function ($technique) {
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
