<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'role' => 'admin'
        ]);

        Role::create([
            'role' => 'manager'
        ]);
        Role::create([
            'role' => 'accountant'
        ]);
        Role::create([
            'role' => 'cashier'
        ]);
        Role::create([
            'role' => 'inventory_manager'
        ]);
        Role::create([
            'role' => 'sales_representative'
        ]);
    }
}