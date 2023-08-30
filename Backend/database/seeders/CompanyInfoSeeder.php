<?php

namespace Database\Seeders;

use App\Models\CompanyInfo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanyInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CompanyInfo::create([
            'company_name' =>  "Z8 Tech",
            'company_email' =>  "z8tech@gmail.com",
            'company_phone' => '+8890182783633',
            'company_address' => "Chittagong, Bangladesh",
        ]);
    }
}
