<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\AdminController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/products', [ProductController::class, 'index']);

Route::get('/categories/{category}/products', [ProductController::class, 'index']);

Route::get('/products/{id}', [ProductController::class, 'show'])
    ->whereNumber('id');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'userProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update'])->whereNumber('id');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->whereNumber('id');

    Route::post('/products/{id}/reviews', [ReviewController::class, 'store'])->whereNumber('id');

    Route::post('/purchase', [PurchaseController::class, 'store']);
    
    Route::get('/user/activities', [PurchaseController::class, 'getActivities']);
});

Route::prefix('admin')
    ->middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/users', [AdminController::class, 'getAllUsers']);
        Route::get('/users/{id}', [AdminController::class, 'getUserDetails'])->whereNumber('id');
        Route::delete('/products/{id}', [AdminController::class, 'destroyProduct'])->whereNumber('id');
    });

Route::middleware('auth:sanctum')->get('/whoami', function () {
    $u = auth()->user();
    return response()->json([
        'id' => $u?->id,
        'email' => $u?->email,
        'roles' => $u?->getRoleNames(),
        'isAdmin' => $u?->hasRole('admin'),
    ]);
});