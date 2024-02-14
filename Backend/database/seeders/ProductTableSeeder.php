<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 5; $i++) {
            Product::create([
                'warehouse_id' => 1,
                'category_id' => 1, // Replace with the actual category ID
                'brand_id' => 1, // Replace with the actual brand ID
                'product_name' => 'Product ' . $i,
                'product_code' => 'PD' . '-' . $i . time(),
                'product_unit' => 'pcs',
                'product_quantity' => 10,
                'product_desc' => 'Description of Product 1',
                'product_retail_price' => 29.99,
                'product_sale_price' => 24.99,
                // Add more product data here
            ]);
        }
    }
}
