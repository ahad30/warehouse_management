<?php

namespace App\Http\Controllers;

use App\Models\CompanyInfo;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class SaleController extends Controller
{
    // index
    public function index(){
        $invoices = Sale::latest()->get();

        if ($invoices->count() <= 0){
            return response()->json([
                'error' => 'No item found',
            ]);
        }else{            
            return response()->json([
                'invoices' => $invoices,
            ]);
        }
    }

    // create
    public function create(){
        $company_info = CompanyInfo::latest()->first();
        $customers = Customer::all();
        $products = Product::all();

        return response()->json([
            'company_info' => $company_info,
            'customers' => $customers,
            'products' => $products,
        ]);
    }

    // store
    public function store(Request $request){
        $codeValidation = Validator::make($request->all(),[
            'invoice_no' => 'unique:sales|required',
            'invoice_date' => 'required',
            'company_name' => 'string|nullable',
            'company_email' => 'nullable|email',
            'company_phone' => 'nullable',
            'company_address' => 'nullable',
            'customer_name' => 'string|required',
            'customer_email' => 'nullable|email',
            'customer_phone' => 'nullable',
            'customer_address' => 'nullable',
            'discount' => 'required',
            'shipping' => 'required',
            'total' => 'required',
        ]);
        if($codeValidation->fails())        {
            return response()->json([
                'status' => false,
                'errors'=> $codeValidation->errors()
            ],500);
        }else{
            $customer = Customer::where('phone', $request->customer_phone)->orWhere('email', $request->customer_email)->first();
            if($customer){
                $customer_id = $customer->id;
                $customer_name = $customer->name;
                $customer_email = $customer->email;
                $customer_phone = $customer->phone;
                $customer_address = $customer->address;
            }else{
                Customer::create([
                    'name' => $request->customer_name,
                    'email' => $request->customer_email,
                    'phone' => $request->customer_phone,
                    'address' => $request->customer_address,
                ]);
                $newcustomer = Customer::latest()->first();
                $customer_id = $newcustomer->id;
                $customer_name = $newcustomer->name;
                $customer_email = $newcustomer->email;
                $customer_phone = $newcustomer->phone;
                $customer_address = $newcustomer->address;
            }

            $prefix = "#INV-";
            $invoice_no = IdGenerator::generate(['table' => 'invoices', 'length' => 9, 'prefix' =>$prefix]);
            Sale::create([
                'invoice_no' => $invoice_no,
                'invoice_date' => $request->invoice_date,
                'company_name' => $request->company_name,
                'company_email' => $request->company_email,
                'company_phone' => $request->company_phone,
                'company_address' => $request->company_address,
                'customer_id' => $customer_id,
                'customer_name' => $customer_name,
                'customer_email' => $customer_email,
                'customer_phone' => $customer_phone,
                'customer_address' => $customer_address,
                'discount' => $request->discount,
                'shipping' => $request->shipping,
                'total' => $request->total,
            ]);
            $sale = Sale::latest()->first();
            $sale_id = $sale->id;

            $input = $request->all();        
            foreach($input['items'] as $key => $value){            
                $item['sale_id'] = $sale_id;
                $item['product_id'] = $value['product_id'];
                $item['name'] = $value['name']; 
                $item['code'] = $value['code']; 
                $item['quantity'] = $value['quantity']; 
                $item['rate'] = $value['rate']; 
                $item['unit'] = $value['unit']; 
                $item['description'] = $value['description']; 
                SaleItem::create($item);
            }
            
            $items = SaleItem::where('sale_id', $sale_id)->get();
            
            return response()->json([
                'success' => 'Invoice successfully created',
                'invoice' => $sale,
                'items' => $items,
            ]);
        }
    }
}
