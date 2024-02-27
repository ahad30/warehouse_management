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
        return response()->json([
            'success' => true,
            'message' => "Imported successfully"
        ], 200);
    }
    /**
     * Export product CSV file
     */
    public function export()
    {
        try {
            Excel::store(new ProductsExport, 'public/products.csv');
            // Generate the link to the file
            $url = asset('storage/products.csv');
            return response()->json([
                'status' => true,
                'url' => $url
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => "something went wrong",
            ], 400);
        }
    }
    public function exportByWarehouse($id)
    {
        $product = Product::where('warehouse_id', $id)->latest()->get();
        return $product;
    }
}
