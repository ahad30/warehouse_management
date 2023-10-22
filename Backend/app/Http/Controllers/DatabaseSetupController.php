<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSetupController extends Controller
{
    private $dbSetupStatus;

    public function setupSQL()
    {
        //check if database already setup
        if (Schema::hasTable('users')) {
            $this->dbSetupStatus = "Database already setup";
            return $this->dbSetupStatus;
        }
        //get sql file
        $endpoint = 'https://product.z8tech.one/api/get-sql-file';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $endpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);

        //execute sql file
        DB::unprepared($response);
        $this->dbSetupStatus = "Database setup completed.";
        return $this->dbSetupStatus;
    }
}