<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyInfoController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/dashboard', [DashboardController::class,'index']);

    Route::controller(CategoryController::class)->prefix('categories')->group(function(){        
        Route::get('/', 'index');
        Route::post('/store', 'store');
        Route::get('/edit/{id}', 'edit');
        Route::put('/update/{id}', 'update');
        Route::delete('/delete/{id}', 'distroy');
    });

    Route::controller(ProductController::class)->prefix('products')->group(function(){        
        Route::get('/', 'index');
        Route::get('/create', 'create');
        Route::post('/store', 'store');
        Route::get('/edit/{id}', 'edit');
        Route::put('/update/{id}', 'update');
        Route::delete('/delete/{id}', 'distroy');
    });

    Route::controller(CompanyInfoController::class)->prefix('company')->group(function(){        
        Route::get('/info', 'index');
        Route::get('/info/edit/{id}', 'edit');
        Route::put('/info/update/{id}', 'update');
    });

    Route::controller(CustomerController::class)->prefix('customers')->group(function(){        
        Route::get('/', 'index');
        Route::post('/store', 'store');
        Route::get('/edit/{id}', 'edit');
        Route::put('/update/{id}', 'update');
        Route::delete('/delete/{id}', 'distroy');
    });

    Route::controller(UserController::class)->prefix('users')->group(function(){        
        Route::get('/', 'index');
        Route::delete('/delete/{id}', 'distroy');
    });

    Route::controller(SaleController::class)->prefix('invoice')->group(function(){        
        Route::get('/list', 'index');
        Route::get('/create', 'create');
        Route::post('/store', 'store');
        
        Route::get('/edit/{id}', 'edit');
        Route::put('/update/{id}', 'update');
        Route::delete('/delete/{id}', 'distroy');
    });

});
