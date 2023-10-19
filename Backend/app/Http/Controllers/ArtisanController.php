<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class ArtisanController extends Controller
{
    public function optimizeClear()
    {
        Artisan::call('optimize:clear');
        return redirect()->back()->with('status', 'your software is optimized');
    }
}
