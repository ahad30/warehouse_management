<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    // index
    public function index()
    {
        $customers = Customer::orderBy('id', 'DESC')->get();

        if ($customers->count() > 0) {
            return response()->json([
                'status' => true,
                'customers' => $customers,
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'No Item Found',
            ]);
        }
    }

    // store
    public function store(Request $request)
    {
        $validateInput = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'email|max:255',
            // 'profile_image' => 'nullable|string|max:255',
            'phone' => 'required|max:255',
            'address' => 'string|max:255',
            'notes' => 'nullable|string|max:255',
        ]);

        if ($validateInput->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error!',
                'errors' => $validateInput->errors()
            ], 401);
        }
        // uploading image
        $imageData = null;
        if ($request->hasFile('profile_image')) {
            $file = $request->file('profile_image');
            $filename = $file->getClientOriginalName();
            $imageData = $request->name . "-" . time() . '-' . $filename;
            $file->move('uploads/customers/', $imageData);
        }

        $customerexist = Customer::where('phone', $request->phone)->first();
        if ($customerexist) {
            return response()->json([
                'status' => false,
                'message' => 'Customer Already Exist',
            ], 401);
        } else {
            Customer::create([
                'name' => $request->name,
                'email' => $request->email,
                'profile_image' => $imageData,
                'phone' => $request->phone,
                'address' => $request->address,
                'notes' => $request->notes,
            ]);

            $customer = Customer::latest()->first();

            return response()->json([
                'status' => true,
                'message' => 'Customer Successfully Created',
                'customer' => $customer,
            ], 201);
        }
    }

    // edit
    public function edit($id)
    {
        $customer = Customer::find($id);

        if ($customer) {
            return response()->json([
                'status' => true,
                'customer' => $customer,
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Customer Not Found',
            ], 500);
        }
    }

    // update
    public function update(Request $request, )
    {
        $customer = Customer::find($request->id);

        if ($customer) {
            $validateInput = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'email|max:255',
                'profile_image' => 'nullable|string|max:255',
                'phone' => 'required|max:255',
                'address' => 'string|max:255',
                'notes' => 'nullable|string|max:255',
            ]);

            if ($validateInput->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error!',
                    'errors' => $validateInput->errors()
                ], 401);
            }

            $customer->update([
                'name' => $request->name,
                'email' => $request->email != null ? $request->email : $customer->email,
                'profile_image' => $request->profile_image,
                'phone' => $request->phone,
                'address' => $request->address != null ? $request->address : $customer->address,
                'notes' => $request->notes,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Customer Successfully Updated',
                'customer' => $customer,
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Customer Not Found',
            ], 500);
        }
    }


    // distroy
    public function distroy($id)
    {
        $customer = Customer::find($id);

        if ($customer) {
            // deleting image
            if ($customer->profile_image != null) {
                $imagePath = public_path('uploads/customers/' . $customer->profile_image);
                // Check if the file exists before attempting to delete it
                if (File::exists($imagePath)) {

                    File::delete($imagePath);
                }
            }
            $customer->delete();

            return response()->json([
                'status' => true,
                'message' => "Customer successfully deleted",
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => "Customer Not Found",
            ], 500);
        }
    }
}