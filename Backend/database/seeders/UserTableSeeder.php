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
        // admin
        User::create([
            'name' =>  "admin",
            'email' =>  "admin@gmail.com",
            'role' =>  "admin",
            'status' =>  "active",
            'password' => bcrypt('password'),
        ]);

        // accountant
        User::create([
            'name' =>  "Md. Akramuol",
            'email' =>  "akramul@gmail.com",
            'role' =>  "accountant",
            'status' =>  "active",
            'password' => bcrypt('password'),
        ]);

        // sales_representative
        User::create([
            'name' =>  "Md. Morshed",
            'email' =>  "morshed@gmail.com",
            'role' =>  "sales_representative",
            'status' =>  "active",
            'password' => bcrypt('password'),
        ]);
    }
}
