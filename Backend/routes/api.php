<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Api\JwtAuthController;
use App\Http\Controllers\CompanyInfoController;
use App\Http\Controllers\Api\UserProfileController;

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

Route::controller(JwtAuthController::class)->prefix('jwt')->group(function () {
    Route::post('/login', 'login')->name('login');
    /* -------------------- verifyJwtToken && verifyAdmin is created custom -------------------- */
    Route::group(['middleware' => 'verifyJwtToken'], function () {
        Route::middleware(['verifyAdmin'])->post('/register', 'register');
    });
    Route::post('/logout', 'logout')->name('logout');
});

/* -------------------------------------------------------------------------- */
/*                             user profile                             */
/* -------------------------------------------------------------------------- */

Route::controller(UserProfileController::class)->middleware('verifyJwtToken')->prefix('profile')->group(function () {
    Route::get('/findLoggedInUser', 'findLoggedInUser');
    Route::put('/updateProfile', 'updateProfile');
});


Route::middleware(['verifyJwtToken'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['verifyJwtToken'])->group(function () {

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
        Route::middleware('verifyAdmin')->get('/info/edit/{id}', 'edit');
        Route::middleware('verifyAdmin')->put('/info/update', 'update');
    });

    Route::controller(CustomerController::class)->prefix('customers')->group(function () {
        Route::get('/', 'index');
        Route::post('/store', 'store');
        Route::get('/edit/{id}', 'edit');
        Route::put('/update', 'update');
        Route::delete('/delete/{id}', 'distroy');
    });

    Route::middleware('verifyAdmin')->controller(UserController::class)->prefix('users')->group(function () {
        Route::get('/', 'index');
        Route::put('/update', 'update');
        Route::delete('/delete/{id}', 'distroy');
    });

    Route::controller(SaleController::class)->prefix('invoice')->group(function () {
        Route::get('list/{from?}/{to?}', 'index');
        Route::get('/create/{brand_id?}/{category_id?}/', 'create');
        Route::post('/store', 'store');
        Route::get('/edit/{id}', 'edit');
        Route::put('/update', 'update');
        Route::delete('/delete/{id}', 'distroy');
    });



    /* -------------------------------------------------------------------------- */
    /*                                 Role Routes                                */
    /* -------------------------------------------------------------------------- */

    Route::get('/roles', RoleController::class)->name('role.index');


    /* -------------------------------------------------------------------------- */
    /*                              Brand controller                              */
    /* -------------------------------------------------------------------------- */

    Route::controller(BrandController::class)->prefix('/brands')->group(function () {
        Route::get('/', 'index');
        Route::post('/store', 'store');
        Route::put('/update', 'update');
        Route::delete('/delete/{id}', 'delete');
    });

    /* -------------------------------------------------------------------------- */
    /*                              store controller                              */
    /* -------------------------------------------------------------------------- */

    Route::controller(StoreController::class)->prefix('/stores')->group(function () {
        Route::get('/', 'index');
        Route::post('/store', 'store');
        Route::put('/update', 'update');
        Route::delete('/delete/{id}', 'delete');
    });
});