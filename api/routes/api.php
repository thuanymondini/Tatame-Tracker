<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TechniqueCategorieController;
use App\Http\Controllers\TechniqueController;
use App\Http\Controllers\DailyWorkoutController;

Route::get('/techniqueCategorie', [TechniqueCategorieController::class, 'index']);
Route::get('/techniqueCategorie/{id}', [TechniqueCategorieController::class, 'show']);
Route::post('/techniqueCategorie', [TechniqueCategorieController::class, 'store']);
Route::get('/technique', [TechniqueController::class, 'index']);
Route::get('/technique/{id}', [TechniqueController::class, 'show']);
Route::post('/technique', [TechniqueController::class, 'store']);
Route::put('/technique/{id}', [TechniqueController::class, 'update']);
Route::delete('/technique/{id}', [TechniqueController::class, 'destroy']);
Route::get('/dailyWorkouts', [DailyWorkoutController::class, 'index']);
Route::get('/dailyWorkouts/{id}', [DailyWorkoutController::class, 'show']);
Route::post('/dailyWorkouts', [DailyWorkoutController::class, 'store']);
