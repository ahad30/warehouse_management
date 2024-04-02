<?php

namespace Database\Seeders;

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
            'description' => 'The Uncategorized Products',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
