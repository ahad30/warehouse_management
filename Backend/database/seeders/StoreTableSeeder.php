<?php

namespace Database\Seeders;

use App\Models\Store;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class StoreTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Store::create([
            'store_name' => 'Others',
            'store_phone' => '00000000000',
            'store_email' => 'other@gmail.com',
            'store_web' => 'http://127.0.0.1:8000/',
            'store_address' => 'no address',
        ]);
    }
}