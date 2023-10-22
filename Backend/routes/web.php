<?php


use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Notifications\TestNotification;
use App\Http\Controllers\DatabaseSetupController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/test', [DatabaseSetupController::class, 'setupSQL']);


require __DIR__ . '/auth.php';
