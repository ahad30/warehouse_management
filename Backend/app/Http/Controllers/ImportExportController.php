<?php

namespace App\Http\Controllers;

use App\Exports\ProductByWarehouseExport;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Exports\ProductsExport;
use App\Http\Requests\CsvRequest;
use App\Imports\ProductsImport;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Warehouse;
use Maatwebsite\Excel\Facades\Excel;

class ImportExportController extends Controller
{
    // Import from app
    public function appImport(CsvRequest $request)
    {
        // Validate the request data
        $data = $request->validated();

        $warehouses = Warehouse::whereIn('name', array_column($data, 'warehouse'))->get()->keyBy('name');
        $categories = Category::whereIn('category_name', array_column($data, 'category'))->get()->keyBy('category_name');

        $othersBrand = Brand::firstOrCreate(['brand_name' => 'Others']);

        $products = [];

        foreach ($data as $item) {
            // Check if warehouse and category exist
            if (!isset($warehouses[$item['warehouse']]) || !isset($categories[$item['category']])) {
                return response()->json([
                    'status' => false,
                    'message' => 'Some data are invalid',
                ], 404);
            }

            $warehouseId = $warehouses[$item['warehouse']]->id;
            $categoryId = $categories[$item['category']]->id;

            $brand = $item['brand'] ? Brand::firstOrCreate(['brand_name' => $item['brand']]) : $othersBrand;

            $products[] = [
                'warehouse_id' => $warehouseId,
                'category_id' => $categoryId,
                'brand_id' => $brand->id,
                'product_name' => $item['name'],
                'unique_code' => uniqid('PRD-'),
                'scan_code' => $item['code'],
                'product_retail_price' => $item['retail_price'],
                'product_sale_price' => $item['sale_price'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Product::insert($products);
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
