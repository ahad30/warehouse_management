<?php

namespace App\Imports;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use App\Models\Warehouse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;

class ProductsImport implements ToCollection
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $collection)
    {
        // Start a database transaction
        DB::beginTransaction();

        try {
            $products = [];

            foreach ($collection as $row) {
                // Check if the warehouse with the given ID exists
                $warehouse = Warehouse::find($row[1]);
                $category = Category::find($row[2]);
                $brand = Brand::find($row[3]);
                if(!$warehouse || !$category || !$brand){
                    DB::rollBack();
                    return "Warehouse with ID {$row[1]} does not exist. Import rolled back.";
                }
                $products[] = [
                    'warehouse_id' => $row[1],
                    'category_id' => $row[2],
                    'brand_id' => $row[3],
                    'product_name' => $row[4],
                    'unique_code' => $row[5],
                    'scan_code' => $row[6],
                    'product_retail_price' => $row[8],
                    'product_sale_price' => $row[9],
                    // 'created_at' => $row[10],
                    // 'updated_at' => $row[11],
                ];
            } 
            Product::insert($products);
            DB::commit();
        
        } catch (\Exception $e) {
            // If an exception occurs, rollback the transaction
            DB::rollBack();
            return "An error occurred during import. Import rolled back.";
        }
    }
}