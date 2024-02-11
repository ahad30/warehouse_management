<?php

use App\Models\Settings;
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
use App\Http\Controllers\ProductReportController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\InstallationController;
use App\Http\Controllers\WarehouseController;

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
/*                                Installation                                */
/* -------------------------------------------------------------------------- */
Route::controller(InstallationController::class)->group(function () {
    Route::get('/already-install', 'alreadyInstall')->name('/already-install');
    Route::get('/step-1', 'step1')->name('/step-1');
    Route::get('/step-2', 'step2')->name('/step-2');
    Route::post('/step-3', 'step3')->name('/step-3');
    Route::post('/step-4', 'step4')->name('/step-4');
    Route::post('/final-step', 'finalStep')->name('/final-step');
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

    Route::controller(DashboardController::class)->prefix('dashboard')->group(function () {
        Route::get('/', 'index');
        Route::get('/sell-graph', 'sellGraph');
        Route::get('/revenue-graph', 'revenueGraph');
    });

    Route::controller(CategoryController::class)->prefix('categories')->group(function () {
        Route::get('/', 'index');
        Route::post('/store', 'store');
        Route::get('/edit/{id}', 'edit');
        Route::put('/update', 'update');
        Route::delete('/delete/{id}', 'destroy');
    });

    Route::controller(ProductController::class)->prefix('/products')->group(function () {
        Route::get('/', 'index');
        Route::get('/create', 'create');
        Route::post('/store', 'store');
        Route::get('/edit/{id}', 'edit');
        Route::put('/update', 'update');
        Route::delete('/delete/{id}', 'destroy');
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
        Route::delete('/delete/{id}', 'destroy');
    });

    Route::middleware('verifyAdmin')->controller(UserController::class)->prefix('users')->group(function () {
        Route::get('/', 'index');
        Route::put('/update', 'update');
        Route::delete('/delete/{id}', 'destroy');
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

    /* -------------------------------------------------------------------------- */
    /*                             Settings controller                            */
    /* -------------------------------------------------------------------------- */

    Route::controller(SettingsController::class)->middleware('verifyAdmin')->prefix('/settings')->group(function () {
        Route::get('/', 'index');
        Route::put('/update', 'update');
    });
    /* -------------------------------------------------------------------------- */
    /*                               Sale controller                              */
    /* -------------------------------------------------------------------------- */
    Route::controller(SaleController::class)->prefix('invoice')->group(function () {
        /* ------------------------------- sale report ------------------------------ */
        Route::get('list/{from?}/{to?}/{dayCount?}', 'index');
        Route::get('/create/{brand_id?}/{category_id?}/', 'create');
        Route::post('/store', 'store');
        Route::get('/edit/{id}', 'edit');
        Route::put('/update', 'update');
        Route::middleware('verifyAdmin')->delete('/delete/{id}', 'destroy');
    });

    /* -------------------------------------------------------------------------- */
    /*                               Product Report                               */
    /* -------------------------------------------------------------------------- */

    Route::get('/product-report/{time_range?}/{start_date?}/{end_date?}', ProductReportController::class);
    /* -------------------------------------------------------------------------- */
    /*                               Warehouse Crud                               */
    /* -------------------------------------------------------------------------- */
    Route::apiResource('warehouses', WarehouseController::class);
});
