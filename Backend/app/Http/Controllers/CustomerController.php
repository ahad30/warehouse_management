<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // index
    public function index(){
        $customers = Customer::latest()->get();

        return response()->json([
            'customers' => $customers,
        ]);
    }

    // distroy
    public function distroy($id){
        $customer = Customer::findOrFail($id);

        if ($customer) {
            $customer->delete();

            return response()->json([
                'customer' => "customer successfully deleted",
            ],201);
        } else {
            return response()->json([
                'customer' => "customer Not Found",
            ],500);
        }
    }
}
