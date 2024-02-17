<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BrandTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Brand::create([
            'brand_name' => "Others",
            'brand_img' => "N/A",
        ]);
        Brand::create([
            'brand_name' => "Brand 1",
            'brand_img' => "N/A",
        ]);
    }
}
