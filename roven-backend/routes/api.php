<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OrderItemController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\PaymentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('products', ProductController::class);
Route::resource('category', CategoryController::class);
Route::resource('order', OrderController::class);
Route::resource('users', UserController::class);
Route::post('/users/register', [UserController::class, 'createUser']);
Route::post('/users/login', [UserController::class, 'loginUser']);
Route::resource('order-items', OrderItemController::class);
Route::resource('reviews', ReviewController::class);
Route::resource('wishlists', WishlistController::class);
Route::resource('payments', PaymentController::class);
