<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Api\JwtAuthController;
use App\Http\Controllers\CompanyInfoController;

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
/* -------------------------------------------------------------------------- */
/*                        Jwt  Users registration routes                          */
/* -------------------------------------------------------------------------- */

Route::group(['prefix' => 'jwt', 'as' => 'jwt.'], function () {
    Route::middleware('verifyAdmin')->post('/register', [JwtAuthController::class, 'register'])->name('register');
    Route::post('/login', [JwtAuthController::class, 'login'])->name('login');
    Route::post('/findLoggedInUser', [JwtAuthController::class, 'findLoggedInUser'])->name('findLoggedInUser');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('/logout', [JwtAuthController::class, 'logout'])->name('logout');
    });
});


Route::middleware(['auth:api'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:api'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::controller(CategoryController::class)->prefix('categories')->group(function () {
        Route::get('/', 'index');
        Route::post('/store', 'store');
        Route::get('/edit/{id}', 'edit');
        Route::put('/update', 'update');
        Route::delete('/delete/{id}', 'distroy');
    });

    Route::controller(ProductController::class)->prefix('/products')->group(function () {
        Route::get('/', 'index');
        Route::get('/create', 'create');
        Route::post('/store', 'store');
        Route::get('/edit/{id}', 'edit');
        Route::put('/update', 'update');
        Route::delete('/delete/{id}', 'distroy');
    });

    Route::controller(CompanyInfoController::class)->prefix('company')->group(function () {
        Route::get('/info', 'index');
        Route::get('/info/edit/{id}', 'edit');
        Route::put('/info/update', 'update');
    });

    Route::controller(CustomerController::class)->prefix('customers')->group(function () {
        Route::get('/', 'index');
        Route::post('/store', 'store');
        Route::get('/edit/{id}', 'edit');
        Route::put('/update', 'update');
        Route::delete('/delete/{id}', 'distroy');
    });

    Route::controller(UserController::class)->prefix('users')->group(function () {
        Route::get('/', 'index');
        Route::delete('/delete/{id}', 'distroy');
    });

    Route::controller(SaleController::class)->prefix('invoice')->group(function () {
        Route::get('/list', 'index');
        Route::get('/create', 'create');
        Route::post('/store', 'store');

        Route::get('/edit/{id}', 'edit');
        Route::put('/update', 'update');
        Route::delete('/delete/{id}', 'distroy');
    });



    /* -------------------------------------------------------------------------- */
    /*                                 Role Routes                                */
    /* -------------------------------------------------------------------------- */

    Route::get('/roles', RoleController::class)->name('role.index');
});