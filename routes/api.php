<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::controller(AuthController::class)->group(function(){
    Route::middleware('web')->get('/auth/redirect', 'redirect');
    Route::get('/auth/social_login/login', 'social_login');
    Route::get('/auth/social_logout/logout', 'social_logout');
    Route::post('/auth/register','register');
    Route::post('/auth/login','login');
});

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/blog',[BlogController::class,'index']);
    Route::post('/blog',[BlogController::class,'store']);
    Route::get('/blog/{blog}',[BlogController::class,'show']);
    Route::put('/blog/{blog}',[BlogController::class,'update']);
    Route::delete('/blog/{blog}',[BlogController::class,'destroy']);
    Route::post('/auth/logout',[AuthController::class,'logout']);
});
