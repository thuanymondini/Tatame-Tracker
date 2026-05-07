<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TechniqueCategoryController;
use App\Http\Controllers\TechniqueController;
use App\Http\Controllers\DailyWorkoutController;

// Auth routes (public)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',     [AuthController::class, 'me']);

    Route::get('/techniqueCategory', [TechniqueCategoryController::class, 'index']);
    Route::get('/techniqueCategory/{id}', [TechniqueCategoryController::class, 'show']);
    Route::post('/techniqueCategory', [TechniqueCategoryController::class, 'store']);
    Route::match(['put', 'patch'], '/techniqueCategory/{id}', [TechniqueCategoryController::class, 'update']);
    Route::delete('/techniqueCategory/{id}', [TechniqueCategoryController::class, 'destroy']);

    Route::get('/technique', [TechniqueController::class, 'index']);
    Route::get('/technique/{id}', [TechniqueController::class, 'show']);
    Route::post('/technique', [TechniqueController::class, 'store']);
    Route::match(['put', 'patch'], '/technique/{id}', [TechniqueController::class, 'update']);
    Route::delete('/technique/{id}', [TechniqueController::class, 'destroy']);

    Route::get('/dailyWorkouts', [DailyWorkoutController::class, 'index']);
    Route::get('/dailyWorkouts/{id}', [DailyWorkoutController::class, 'show']);
    Route::post('/dailyWorkouts', [DailyWorkoutController::class, 'store']);
    Route::match(['put', 'patch'], '/dailyWorkouts/{id}', [DailyWorkoutController::class, 'update']);
    Route::delete('/dailyWorkouts/{id}', [DailyWorkoutController::class, 'destroy']);
});
