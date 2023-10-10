<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        User::create([
            'name' => "Admin",
            'email' => "admin@mail.com",
            'role_id' => 1,
            'status' => "active",
            'password' => bcrypt('password'),
        ]);

        // accountant
        User::create([
            'name' => "Manager",
            'email' => "manager@mail.com",
            'role_id' => 2,
            'status' => "active",
            'password' => bcrypt('password'),
        ]);

        // sales_representative
        User::create([
            'name' => "Accountant",
            'email' => "accountant@mail.com",
            'role_id' => 3,
            'status' => "active",
            'password' => bcrypt('password'),
        ]);
        User::create([
            'name' => "Cashier",
            'email' => "cashier@mail.com",
            'role_id' => 4,
            'status' => "inactive",
            'password' => bcrypt('password'),
        ]);
        User::create([
            'name' => "Inventory Manager",
            'email' => "inventory_manager@mail.com",
            'role_id' => 5,
            'status' => "inactive",
            'password' => bcrypt('password'),
        ]);
        User::create([
            'name' => "Sales Representative",
            'email' => "sales_representative@mail.com",
            'role_id' => 6,
            'status' => "active",
            'password' => bcrypt('password'),
        ]);
    }
}
