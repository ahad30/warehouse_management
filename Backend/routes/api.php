<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\Api\JwtAuthController;
use App\Http\Controllers\CompanyInfoController;
use App\Http\Controllers\ImportExportController;
use App\Http\Controllers\InstallationController;
use App\Http\Controllers\Api\UserProfileController;
use App\Http\Controllers\ProductShiftingController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SearchProductController;

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
        Route::middleware(['verifyAdmin', 'verifySubAdmin'])->post('/register', 'register');
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

    /* -------------------------------------------------------------------------- */
    /*                              Category controller                              */
    /* -------------------------------------------------------------------------- */
    Route::middleware(['verifyStaff'])->controller(CategoryController::class)->prefix('categories')->group(function () {
        Route::get('/', 'index');
        Route::middleware(['verifyStaff'])->post('/store', 'store');
        Route::middleware(['verifyStaff'])->get('/edit/{id}', 'edit');
        Route::middleware(['verifyStaff'])->put('/update/{id}', 'update');
        Route::middleware(['verifyStaff'])->delete('/delete/{id}', 'destroy');
    });

    Route::middleware(['verifyStaff'])->controller(ProductController::class)->prefix('/products')->group(function () {
        Route::get('/', 'index');
        Route::get('/create', 'create');
        Route::middleware('verifyAdmin')->post('/store', 'store');
        Route::get('/edit/{id}', 'edit');
        Route::middleware('verifySubAdmin')->put('/update', 'update');
        Route::middleware( 'verifyAdmin')->delete('/delete/{id}', 'destroy');
        // for android
        Route::put('/app/update/{id}', [ProductController::class, 'appProductUpdate']);
        Route::put('/app/update/image/{id}', [ProductController::class, 'appProductImageUpdate']);
    });

    Route::controller(CompanyInfoController::class)->prefix('company')->group(function () {
        Route::get('/info', 'index');
        Route::middleware('verifyAdmin')->get('/info/edit/{id}', 'edit');
        Route::middleware('verifyAdmin')->put('/info/update', 'update');
    });

    Route::middleware(['verifySubAdmin'])->controller(UserController::class)->prefix('users')->group(function () {
        Route::get('/', 'index');
        Route::put('/update', 'update');
        Route::delete('/delete/{id}', 'destroy');
    });


    /* -------------------------------------------------------------------------- */
    /*                                 Role Routes                                */
    /* -------------------------------------------------------------------------- */

    Route::middleware(['verifySubAdmin'])->get('/roles', RoleController::class)->name('role.index');


    /* -------------------------------------------------------------------------- */
    /*                              Brand controller                              */
    /* -------------------------------------------------------------------------- */

    Route::controller(BrandController::class)->prefix('/brands')->group(function () {
        Route::get('/', 'index');
        Route::middleware('verifyAdmin')->post('/store', 'store');
        Route::middleware('verifyAdmin')->put('/update/{id}', 'update');
        Route::middleware('verifyAdmin')->delete('/delete/{id}', 'delete');
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
        Route::get('/create', 'create');
        Route::post('/store', 'store');
        Route::get('/edit/{id}', 'edit');
        Route::put('/update', 'update');
        Route::middleware('verifyAdmin')->delete('/delete/{id}', 'destroy');
    });

    /* -------------------------------------------------------------------------- */
    /*                               Product Report                               */
    /* -------------------------------------------------------------------------- */
    Route::controller(ReportController::class)->group(function () {
        Route::get('/sale/report/{timeRange?}/{startDate?}/{endDate?}', 'salesReport');
        Route::get('/shifting/report/{timeRange?}/{startDate?}/{endDate?}', 'shiftingReport');
    });


    /* -------------------------------------------------------------------------- */
    /*                               Warehouse Crud                               */
    /* -------------------------------------------------------------------------- */
    Route::middleware('verifySubAdmin')->apiResource('warehouses', WarehouseController::class);



    /* -------------------------------------------------------------------------- */
    /*                               Product Shifting  route                            */
    /* -------------------------------------------------------------------------- */

    Route::middleware(['verifySubAdmin'])->controller(ProductShiftingController::class)
        ->prefix('/productshift')->group(function () {
            Route::post('/store', 'store');
        });

    /* -------------------------------------------------------------------------- */
    /*                              HistoryController  route                            */
    /* -------------------------------------------------------------------------- */

    Route::middleware(['verifySubAdmin'])->controller(HistoryController::class)
        ->group(function () {
            Route::get('/histories', 'histories');
        });


    /* -------------------------------------------------------------------------- */
    /*                              Search product route                            */
    /* -------------------------------------------------------------------------- */

    Route::controller(SearchProductController::class)
        ->prefix('/product')->group(function () {
            Route::get('/search', 'index');
        });

    Route::post('/import', [ImportExportController::class, 'import']);
    Route::post('/app/import', [ImportExportController::class, 'appImport']);
    Route::post('/export', [ImportExportController::class, 'export']);
    Route::post('/export-By-Warehouse/{id}', [ImportExportController::class, 'exportByWarehouse']);

    Route::get('app/warhouse/list', [ProductController::class, 'getWarehouses']);
    Route::get('app/products/warhouse/{id}', [ProductController::class, 'ProductByWarehouseID']);
});
