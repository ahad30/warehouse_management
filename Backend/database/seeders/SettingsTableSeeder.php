<?php

namespace Database\Seeders;

use App\Models\Settings;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Settings::create([
            'discount' => 0,
            'shipping' => 0,
            'taxation' => "VAT",
            'tax_value' => 0,
            'currency' => "$",
            'mail_option' => "off",
            'mail_credential_status' => 'inactive',
        ]);
    }
}
