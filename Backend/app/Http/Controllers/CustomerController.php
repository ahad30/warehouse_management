<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // index
    public function index(){
        $customers = Customer::orderBy('id', 'DESC')->get();

        if($customers->count() > 0){            
            return response()->json([
                'customers' => $customers,
            ]);
        }else{
            return response()->json([
                'errors' => 'No Item Found',
            ]);
        }

    }

    // distroy
    public function distroy($id){
        $customer = Customer::find($id);

        if ($customer) {
            $customer->delete();

            return response()->json([
                'success' => "customer successfully deleted",
            ],201);
        } else {
            return response()->json([
                'error' => "customer Not Found",
            ],500);
        }
    }
}
