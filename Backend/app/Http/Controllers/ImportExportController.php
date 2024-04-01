<?php

namespace App\Http\Controllers;

use App\Exports\ProductByWarehouseExport;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Exports\ProductsExport;
use App\Http\Requests\CsvRequest;
use App\Imports\ProductsImport;
use Maatwebsite\Excel\Facades\Excel;

class ImportExportController extends Controller
{
    // Import from app
    public function appImport(CsvRequest $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $name = time() . '-' . $file->getClientOriginalName();

            // Set the storage directory
            $storagePath = 'uploads/csv/';

            // Move file to storage directory
            $file->move(storage_path($storagePath), $name);

            // Import the moved file to DB and return OK if there were rows affected
            $path = storage_path($storagePath . '/' . $name);
            $rowsAffected = Excel::import(new ProductsImport,  asset($path));

            return $rowsAffected ? response()->json([
                'success' => true,
                'message' => "Imported successfully"
            ], 200) : response()->json([
                'success' => false,
                'message' => "No rows affected"
            ], 400);
        }
    }


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
        $file_name = time() . uniqid() . '-' . 'products.csv';
        try {
            Excel::store(new ProductsExport, 'public/' . $file_name);
            // Generate the link to the file
            $url = asset('storage/' . $file_name);
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
        $file_name = time() . uniqid() . '-' . 'products.csv';
        try {
            Excel::store(new ProductByWarehouseExport($product), 'public/' . $file_name);
            // Generate the link to the file
            $url = asset('storage/' . $file_name);
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
}
