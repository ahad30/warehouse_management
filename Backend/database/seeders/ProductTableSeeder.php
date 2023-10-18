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
        for($i=0;$i<100;$i++){
            Product::create([
                [
                    'product_name' => 'Product 1',
                    // 'product_img' => 'image_url_1.jpg',
                    'product_code' => 'P001' . time(),
                    'slug' => 'product-1',
                    'product_unit' => 'pcs',
                    'product_quantity' => 10,
                    'product_desc' => 'Description of Product 1',
                    'product_retail_price' => 29.99,
                    'product_sale_price' => 24.99,
                    'store_id' => 1, // Replace with the actual store ID
                    'category_id' => 1, // Replace with the actual category ID
                    'brand_id' => 1, // Replace with the actual brand ID
                ],
                // Add more product data here
            ]);
           }
    }
}
