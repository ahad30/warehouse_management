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
            'email' => "admin@gmail.com",
            'role_id' => 1,
            'status' => "active",
            'password' => bcrypt('password'),
        ]);

        // accountant
        User::create([
            'name' => "Md. Akramuol",
            'email' => "akramul@gmail.com",
            'role_id' => 2,
            'status' => "active",
            'password' => bcrypt('password'),
        ]);

        // sales_representative
        User::create([
            'name' => "Md. Morshed",
            'email' => "morshed@gmail.com",
            'role_id' => 3,
            'status' => "active",
            'password' => bcrypt('password'),
        ]);
    }
}