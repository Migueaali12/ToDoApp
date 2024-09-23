<?php

use App\Http\Controllers\Api\taskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('task')->group(function () {
    Route::patch('/update-field-task/{id}', [taskController::class, 'updateField']);
    Route::post('/mark-all-task', [taskController::class, 'toggleCompletedTask']);
});

Route::apiResource('task', taskController::class);
