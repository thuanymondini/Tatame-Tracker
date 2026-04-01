<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DailyWorkouts;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DailyWorkoutController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(DailyWorkouts::with('techniques')->get());
    }

    public function show(int $id): JsonResponse
    {
        $dailyWorkout = DailyWorkouts::with('techniques')->find($id);

        if (!$dailyWorkout) {
            return response()->json(['message' => 'Daily workout not found'], 404);
        }

        return response()->json($dailyWorkout);
    }

    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'training_date'    => 'required|date|before_or_equal:today',
            'observations'     => 'nullable|string|max:600',
            'techniques'       => 'required|array|min:1',
            'techniques.*'     => 'required|integer|exists:techniques,id',
        ]);

        $dailyWorkout = DailyWorkouts::create([
            'training_date' => $validatedData['training_date'],
            'observations'  => $validatedData['observations'] ?? null,
        ]);

        $dailyWorkout->techniques()->attach($validatedData['techniques']);

        return response()->json($dailyWorkout->load('techniques'), 201);
    }
}
