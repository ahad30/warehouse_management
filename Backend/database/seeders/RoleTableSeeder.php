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
            'role' => 'Admin'
        ]);
        Role::create([
            'role' => 'Sub Admin'
        ]);
        Role::create([
            'role' => 'Staff'
        ]);
    }
}