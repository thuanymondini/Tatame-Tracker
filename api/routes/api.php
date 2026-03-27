<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TechniqueCategorieController;

Route::get('/techniqueCategorie', [TechniqueCategorieController::class, 'index']);
Route::get('/techniqueCategorie/{id}', [TechniqueCategorieController::class, 'show']);
Route::post('/techniqueCategorie', [TechniqueCategorieController::class, 'store']);
