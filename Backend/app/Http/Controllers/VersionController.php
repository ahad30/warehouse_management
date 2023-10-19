<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VersionController extends Controller
{
    public $requiredPhpVersion;
    //set php version
    public function __construct()
    {
        $this->requiredPhpVersion = '8.2.11';
    }
    //current php version
    public function currentPhpVersion()
    {
        $phpVersion = phpversion();
        return $phpVersion;
    }
}
