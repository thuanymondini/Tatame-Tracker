<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DailyWorkouts;
use App\DTOs\DailyWorkoutDTO;
use App\Http\Requests\DailyWorkoutRequest;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\DailyWorkoutResource;
use App\Http\Controllers\TechniqueController;

class DailyWorkoutController extends Controller
{
    public function index(): JsonResponse
    {
        $dailyWorkouts = DailyWorkouts::with('techniques')->get();
        return response()->json(DailyWorkoutResource::collection($dailyWorkouts));
    }

    public function show(int $id): JsonResponse
    {
        $dailyWorkout = DailyWorkouts::with('techniques')->find($id);

        if (!$dailyWorkout) {
            return response()->json(['message' => 'Daily workout not found'], 404);
        }

        return response()->json(new DailyWorkoutResource($dailyWorkout));
    }

    public function store(DailyWorkoutRequest $request): JsonResponse
    {
        $dto = DailyWorkoutDTO::fromRequest($request);

        $dailyWorkout = DailyWorkouts::create([
            'training_date' => $dto->training_date,
            'observations'  => $dto->observations,
        ]);

        $dailyWorkout->techniques()->attach($dto->techniques);

        return response()->json([
            'message' => 'Treino criado com sucesso!',
            'created_id' => $dailyWorkout->id,
        ], 201);
    }

    public function update(DailyWorkoutRequest $request, int $id): JsonResponse
    {
        $dailyWorkout = DailyWorkouts::find($id);

        if (!$dailyWorkout) {
            return response()->json(['message' => 'Daily workout not found'], 404);
        }

        // dailyWorkout->techniques() -> mantem as q ja tem
        // dailyWorkout->techniques() -> apaga as que nao tem mais
        // dailyWorkout->techniques() -> adiciona as novas
        //
        $dailyWorkout->techniques()->sync($request->input('techniques'));

        $dto = DailyWorkoutDTO::fromRequest($request);

        $dailyWorkout->update($dto->toArray());

        return response()->json([
            'message' => 'Treino atualizado com sucesso!',
            'updated_id' => $dailyWorkout->id,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $dailyWorkout = DailyWorkouts::find($id);

        if (!$dailyWorkout) {
            return response()->json(['message' => 'Daily workout not found'], 404);
        }

        $dailyWorkout->delete();

        return response()->json([
            'message' => 'Treino excluído com sucesso!',
            'deleted_id' => $dailyWorkout->id,
        ]);
    }
}
