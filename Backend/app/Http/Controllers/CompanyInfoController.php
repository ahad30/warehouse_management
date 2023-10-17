<?php

namespace App\Http\Controllers;

use App\Models\CompanyInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CompanyInfoController extends Controller
{
    // index
    public function index()
    {
        $company_info = CompanyInfo::latest()->first();

        if ($company_info) {
            return response()->json([
                'status' => true,
                'company_info' => $company_info,
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Company Information Not Found',
            ]);
        }
    }

    // edit
    public function edit($id)
    {
        $company_info = CompanyInfo::find($id);

        if ($company_info) {
            return response()->json([
                'status' => true,
                'company_info' => $company_info,
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Company Information Not Found',
            ]);
        }
    }

    // update
    public function update(Request $request)
    {

        $company_info = CompanyInfo::find($request->id);

        if ($company_info) {
            $codeValidation = Validator::make($request->all(), [
                'company_name' => 'required',
                'company_email' => 'required|email',
                'company_phone' => 'required',
                'company_address' => 'required',
                'company_img' => 'nullable|mimes:jpg,png,jpeg,gif,svg|max:5000'
            ]);

            if ($codeValidation->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error!',
                    'errors' => $codeValidation->errors(),
                ], 500);
            }
            $imageData = null; //new image name
            if ($request->hasFile('company_img')) {
                $file = $request->file('company_img');
                $extension = $file->getClientOriginalExtension(); //input image name
                $imageData = $request->company_name . '-' . time() . '.' . $extension;
                $file->move('uploads/companyInfo/', $imageData);

                // Check if the file exists before attempting to delete it
                // if ($company_info->company_img != null) {
                //     $imagePath = public_path('uploads/companyInfo/' . $company_info->company_img);
                //     if (File::exists($imagePath)) {

                //         File::delete($imagePath);
                //     }
                // }
            }
            $company_info->update([
                'company_name' => $request->company_name,
                'company_email' => $request->company_email,
                'company_phone' => $request->company_phone,
                'company_address' => $request->company_address,
                'company_img' => $imageData != null ? $imageData : $company_info->company_img
            ]);

            return response()->json([
                'status' => true,
                'message' => "Company Info successfully updated",
                'company_info' => $company_info,
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => "Company Information Not Found",
            ], 404);
        }
    }
}