<?php

namespace App\Http\Controllers;

use App\Exports\ProductByWarehouseExport;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Exports\ProductsExport;
use App\Http\Requests\CsvRequest;
use App\Imports\ProductsImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;

class ImportExportController extends Controller
{
    // Import from app
    public function appImport(CsvRequest $request)
    {
        // Validate the request data
        $data = $request->validated();


        try {
            DB::beginTransaction();

            $products = [];

            foreach (array_chunk($data, 100) as $chunk) {
                $chunkProducts = [];

                foreach ($chunk as $item) {
                    $chunkProducts[] = [
                        'warehouse_id' => $request->warehouse_id,
                        'category_id' => $request->category_id,
                        'brand_id' => $request->brand_id,
                        'product_name' => $item['product_name'],
                        'unique_code' => uniqid('PRD-'),
                        'scan_code' => $item['scan_code'],
                        'product_retail_price' => $item['product_retail_price'],
                        'product_sale_price' => $item['product_sale_price'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                $products = array_merge($products, $chunkProducts);

                Product::insert($chunkProducts);
            }

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => "Data has been imported successfully"
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => "The given csv is invalid",
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
        $file_name = date('Ymd') . '-' . 'products.csv';
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
