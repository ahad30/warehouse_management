<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class WarehouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $warehouses = [];
        for ($i = 1; $i < 10; $i++) {
            $warehouses[] = [
                'name' => 'warehouse' . $i,
                'slug' => Str::random(5),
                'image' => '',
                'country' => 'Bangladesh',
                'city' => 'Chittagong',
                'address' => 'GEC',
                'phone' => '+880945987997',
                'email' => 'warehouse@example.com',
            ];
        }
        Warehouse::insert($warehouses);
    }
}
