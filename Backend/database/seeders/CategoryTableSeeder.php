<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Carbon\Carbon;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'category_name' => 'Others',
            'slug' => 'other',
            'description' => 'The Uncategorized Products',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        Category::create([
            'category_name' => 'Medicine',
            'slug' => 'medicine',
            'description' => 'The Best Medicine collection',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        Category::create([
            'category_name' => 'Electronics',
            'slug' => 'electronics',
            'description' => 'The Best Electronics collection',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
