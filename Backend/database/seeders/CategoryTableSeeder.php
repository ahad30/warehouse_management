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
            'category_name' => 'Other',
            'slug' => 'other',
            'description' => 'The Uncategorized Products',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        Category::create([
            'category_name' => 'Mobile',
            'slug' => 'mobile',
            'description' => 'The Best mobile collection',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        Category::create([
            'category_name' => 'Tv',
            'slug' => 'tv',
            'description' => 'The Best tv collection',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        Category::create([
            'category_name' => 'Electronices',
            'slug' => 'electronices',
            'description' => 'The Best electronices collection',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}