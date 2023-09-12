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
        Product::create([
            'name' => 'Samsung galexy M40',
            'category_id' => '1',
            'slug' => 'samsung-galexy-m40',
            'code' => 'SMGM40',
            'price' => '23990',
            'unit' => '',
            'desc' => 'Samsung galexy M40, RAM: 6GB, ROM: 128GB',
        ]);

        Product::create([
            'name' => 'I-phone 11 Pro Max',
            'category_id' => '1',
            'slug' => 'i-phone-11-pro-max',
            'code' => 'IP11PM',
            'price' => '93990',
            'unit' => '',
            'desc' => 'I-phone 11 Pro Max, RAM: 8GB, ROM: 528GB',
        ]);

        Product::create([
            'name' => 'Panasonic 342MR',
            'category_id' => '2',
            'slug' => 'panasonic-342mr',
            'code' => 'P342MR',
            'price' => '33999',
            'unit' => '',
            'desc' => 'Panasonic 342MR, Android, ROM: 28GB, Display: 32 inch',
        ]);

        Product::create([
            'name' => 'Nippon Taski LED 09NL',
            'category_id' => '2',
            'slug' => 'nippon-taski-led-09nl',
            'code' => 'NT09NL',
            'price' => '21999',
            'unit' => '',
            'desc' => 'Nippon Taski LED 09NL, LED, Display: 21 inch',
        ]);

        Product::create([
            'name' => 'NOVA Rice Cooker 867M',
            'category_id' => '3',
            'slug' => 'nova-rice-cooker-867m',
            'code' => 'NRC867M',
            'price' => '8999',
            'unit' => '',
            'desc' => 'NOVA Rice Cooker 867M, quantity: 2.5kg',
        ]);
    }
}
