<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\BrandTableSeeder;
use Database\Seeders\StoreTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(WarehouseSeeder::class);
        $this->call(RoleTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(CompanyInfoSeeder::class);
        $this->call(CategoryTableSeeder::class);
        $this->call(BrandTableSeeder::class);
        $this->call(ProductTableSeeder::class);
        $this->call(StoreTableSeeder::class);
        $this->call(SettingsTableSeeder::class);
        $this->call(StaffSeeder::class);
    }
}
