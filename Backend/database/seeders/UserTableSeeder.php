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
            'name' => "admin",
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
    }
}