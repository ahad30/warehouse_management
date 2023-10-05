<?php

namespace App\Http\Controllers;

use App\Models\CompanyInfo;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class SaleController extends Controller
{
    // index
    public function index()
    {
        $invoices = Sale::latest()->get();

        if ($invoices->count() <= 0) {
            return response()->json([
                'status' => false,
                'message' => 'No Invoices found',
                'invoices' => $invoices,
            ]);


        } else {

            return response()->json([
                'status' => true,
                'invoices' => $invoices,
            ]);
        }
    }

    // create
    public function create($brand_id = null, $category_id = null)
    {
        $company_info = CompanyInfo::latest()->first();
        $customers = Customer::all();
        $products = Product::where('product_quantity', '>', '0')->with('getCategory', 'getBrand', 'getStore')->get();
        if ($brand_id == null && $category_id == null) {
            return response()->json([
                'status' => true,
                'data' => [
                    'company_info' => $company_info,
                    'customers' => $customers,
                    'products' => $products,
                ],
            ]);

        } elseif ($brand_id != null && $category_id == null) {
            $products = Product::where('product_quantity', '>', '0')->where('brand_id', $brand_id)->with('getCategory', 'getBrand', 'getStore')->get();
            return response()->json([
                'status' => true,
                'data' => [
                    'company_info' => $company_info,
                    'customers' => $customers,
                    'products' => $products,
                ],
            ]);
        } elseif ($brand_id == null && $category_id != null) {
            $products = Product::where('product_quantity', '>', '0')->where('category_id', $category_id)->with('getCategory', 'getBrand', 'getStore')->get();
            return response()->json([
                'status' => true,
                'data' => [
                    'company_info' => $company_info,
                    'customers' => $customers,
                    'products' => $products,
                ],
            ]);
        } else {
            $products = Product::where('product_quantity', '>', '0')->where('brand_id', $brand_id)->where('category_id', $category_id)->with('getCategory', 'getBrand', 'getStore')->get();
            return response()->json([
                'status' => true,
                'data' => [
                    'company_info' => $company_info,
                    'customers' => $customers,
                    'products' => $products,
                ],
            ]);
        }

    }

    // store
    public function store(Request $request)
    {

        $codeValidation = Validator::make($request->all(), [
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
            'items' => 'required'
        ]);
        if ($codeValidation->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $codeValidation->errors()
            ], 500);
        } else {
            $customer = Customer::where('phone', $request->customer_phone)->orWhere('email', $request->customer_email)->first();
            if ($customer) {
                $customer_id = $customer->id;
                $customer_name = $customer->name;
                $customer_email = $customer->email;
                $customer_phone = $customer->phone;
                $customer_address = $customer->address;
            } else {
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
            $invoice_no = $prefix . $customer->id . Str::random(3);
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
            foreach ($input['items'] as $key => $value) {
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
                'status' => true,
                'message' => 'Invoice successfully created',
                'data' => [
                    'invoice' => $sale,
                    'items' => $items,
                ]
            ]);
        }
    }
}