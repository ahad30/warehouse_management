<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class VerificationController extends Controller
{
    public function verify($purchaseCode, $envantoUsername)
    {
        // Define the JSON data which want to send
        $verificationAsset = [
            'purchaseCode' => $purchaseCode,
            'envantoUsername' => $envantoUsername,
            'ipAddress' => $_SERVER['REMOTE_ADDR'],
        ];
        // Send the JSON data to the API
        $curl = curl_init();
        // Set the URL to the API endpoint
        $url = 'https://product.asgs.homes/api/purchase-code-verification';
        // Set the cURL options
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
        ]);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($verificationAsset));
        // Execute the cURL request
        $response = curl_exec($curl);
        $responseData = json_decode($response, true);
        // check for validation
        if ($responseData == "Valid") {
            return $status = 200;
        } else {
            return $status = 500;
        }
    }
}
