<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use 
\Http\Response;
use App\Exports\ProductsExport;
use App\Imports\ProductsImport;
use Maatwebsite\Excel\Facades\Excel;

class ImportExportController extends Controller
{
    // Import
    public function import(Request $request)
    {
        Excel::import(new ProductsImport,  $request->file('file'));
    }
    /**
     * Export product CSV file
     */
    public function export(){
        try{
           return Excel::download(new ProductsExport, 'products.csv');
            // return "ok";
        }catch(\Exception $e){
            return $e->getMessage();
        }
    }
}
