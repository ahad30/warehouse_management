<?php

namespace App\Http\Controllers;

use App\Models\CompanyInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyInfoController extends Controller
{
    // index
    public function index(){
        $company_info = CompanyInfo::latest()->first();

        return response()->json([
            'company_info' => $company_info,
        ]);
    }

    // edit
    public function edit($id){
        $company_info = CompanyInfo::find($id);

        return response()->json([
            'company_info' => $company_info,
        ]);
    }

    // update
    public function update(Request $request, $id){
        $company_info = CompanyInfo::find($id);

        if ($company_info) {
            $codeValidation = Validator::make($request->all(),[
                'company_name' => ['required'],
                'company_email' =>['required', 'email'],
                'company_phone' => ['required'],
                'company_address' => ['required'],
            ]);
    
            if($codeValidation->fails())
            {
                return response()->json([
                    'errors'=> $codeValidation->errors()
                ],500);
            }
    
            $company_info->update([
                'company_name' => $request->company_name,
                'company_email' => $request->company_email,
                'company_phone' => $request->company_phone,
                'company_address' => $request->company_address,
            ]);
    
            return response()->json([
                'success' => "Company Info successfully updated",
                'company_info' => $company_info,
            ]);
        }
    }
}
