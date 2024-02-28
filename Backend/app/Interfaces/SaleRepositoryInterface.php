<?php 

namespace App\Interfaces;

use Illuminate\Http\Request;

Interface SaleRepositoryInterface
{
    public function sale(Request $request);
}