<?php

namespace Database\Seeders;

use App\Models\Staff;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $staffUsers = User::where('role_id', 3)->get();
        foreach ($staffUsers as $user) {
            Staff::insert([
                'user_id' => $user->id,
                'warehouse_id' => Warehouse::inRandomOrder()->first()->id,
            ]);
        }
    }
}
