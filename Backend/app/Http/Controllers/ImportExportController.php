<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;

class ImportExportController extends Controller
{
    // Import
    public function import(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|mimes:csv,xls,xlsx'
        ]);

        $file = $request->file('file');
        $fileContents = file($file->getPathname());

        foreach ($fileContents as $line) {
            $data = str_getcsv($line);

            Product::create([
                'name' => $data[0],
                'price' => $data[1],
                // Add more fields as needed
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'CSV file imported successfully.'
        ], 200);
    }

    // Export
    // public function export(Request $request)
    // {
    //     $products = Product::all();
    //     $csvFileName = 'products.csv';
    //     $headers = [
    //         'Content-Type' => 'text/csv',
    //         'Content-Disposition' => 'attachment; filename="' . $csvFileName . '"',
    //     ];

    //     $handle = fopen('php://output', 'w');
    //     $handle = fopen('php://output', 'w');
    //     fputcsv($handle, [
    //     "warehouse_id",
    //     "category_id",
    //     "brand_id",
    //     "product_name",
    //     "unique_code",
    //     'scan_code',
    //     "product_unit",
    //     "product_retail_price",
    //     "product_sale_price",]); // Add more headers as needed

    //     foreach ($products as $product) {
    //         fputcsv($handle, [
    //             $product->warehouse_id, 
    //             $product->category_id,
    //             $product->brand_id,
    //             $product->product_name,
    //             $product->unique_code,
    //             $product->scan_code,
    //             $product->product_unit,
    //             $product->product_retail_price,
    //             $product->product_sale_price,

    //             ]); // Add more fields as needed
    //     }

    //     fclose($handle);

    //     // return "ok";
    // }
    public function export(){
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
