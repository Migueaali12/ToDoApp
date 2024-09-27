<?php

use App\Http\Controllers\Api\taskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('task')->group(function () {
    Route::patch('/update-field-task/{id}', [taskController::class, 'updateField']);
    Route::post('/filter-status', [taskController::class, 'filterByStatus']);
    Route::post('/sort-status', [taskController::class, 'sortByStatus']);
});

Route::apiResource('task', taskController::class);
