<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 20; $i++) {
            Product::create([
                'warehouse_id' => 1,
                'category_id' => 1, // Replace with the actual category ID
                'brand_id' => 1, // Replace with the actual brand ID
                'product_name' => 'Product ' . $i,
                'unique_code' => 'PD' . '-' . $i . time() . Str::random(4),
                'scan_code' => 'SP' . '-' . $i . Str::random(8),
                'product_unit' => 'pcs',
                // 'product_quantity' => 10,
                'product_retail_price' => 29.99,
                'product_sale_price' => 24.99,
                // Add more product data here
            ]);
        }
    }
}
