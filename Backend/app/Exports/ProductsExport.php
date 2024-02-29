<?php

namespace App\Exports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ProductsExport implements FromCollection
// class ProductsExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        // $products = Product::with('warehouse:id,name','getBrand:id,brand_name','getCategory:id,category_name')->get();

        // return $products->map(function ($product) {
        //     return [
        //         'warehouse_name' => $product->warehouse->name,
        //         'category_name' => $product->getCategory->category_name,
        //         'brand_name' => $product->getBrand->brand_name,
        //         'product_name' => $product->product_name,
        //         'unique_code' => $product->unique_code,
        //         'scan_code' => $product->scan_code,
        //         'product_unit' => $product->product_unit,
        //         'product_retail_price' => $product->product_retail_price,
        //         'product_sale_price' => $product->product_sale_price,
        //     ];
        // });
        return Product::all();
    }
    // for csv heading 
    // public function headings(): array
    // {
    //     // Define your column headings here
    //     return [
    //         "warehouse name",
    //         "category name",
    //         "brand name",
    //         "product_name",
    //         "unique_code",
    //         'scan_code',
    //         "product_unit",
    //         "product_retail_price",
    //         "product_sale_price",
    //         // Add more headings as needed based on your Product model attributes
    //     ];
    // }
}
