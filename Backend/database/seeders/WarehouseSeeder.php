<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Warehouse::create([
            'name' => 'warehouse 1',
            'image' => '',
            'country' => 'Bangladesh',
            'city' => 'Chittagong',
            'address' => 'GEC',
            'phone' => '+880945987997',
            'email' => 'warehouse@example.com',
        ]);
    }
}
