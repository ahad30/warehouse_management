<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LicenseController extends Controller
{
    public function createLicense($purchaseCode, $envantoUsername)
    {
        //create license
        $licenseKey = Str::uuid()->toString();
        $license = [
            'purchaseCode' => $purchaseCode,
            'envantoUsername' => $envantoUsername,
            'licenseKey' => $licenseKey,
        ];
        file_put_contents('../license.txt', json_encode($license));
    }
}
