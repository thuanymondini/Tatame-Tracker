<?php

use Illuminate\Support\Facades\Route;

Route::get('/users', fn() => response()->json(['hello' => 'world']));
