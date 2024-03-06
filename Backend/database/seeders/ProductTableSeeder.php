<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Warehouse;
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

        $products = [];
        for ($i = 0; $i < 500; $i++) {
            $products[] = [
                'warehouse_id' => Warehouse::inRandomOrder()->first()->id,
                'category_id' => Category::inRandomOrder()->first()->id, // Replace with the actual category ID
                'brand_id' => Brand::inRandomOrder()->first()->id, // Replace with the actual brand ID
                'product_name' => fake()->firstNameMale(),
                'unique_code' => 'PD' . '-' . $i . time() . Str::random(4),
                'scan_code' => 'SP' . '-' . fake()->ean13,
                // 'product_unit' => 'pcs',
                'product_retail_price' => 29.99,
                'product_sale_price' => 24.99,
                // Add more product data here
                'created_at' => now(),
            ];
        }
        Product::insert($products);

        //    ProductImage::factory(1000)->create();
        // Product::where('id','!=',0)->update([
        //     'product_id' => Product::inRandomOrder()->first()->id,
        //     'image' => fake()->randomElement(['uploads/products/170910351241.webp'])
        // ]);
        $productImage = [];
        foreach (Product::all() as $product) {
            $productImage[] = [
                'product_id' => $product->id,
                'image' => fake()->randomElement(['uploads/products/170910351241.webp'])
            ];
        }
        ProductImage::insert($productImage);
    }
}
