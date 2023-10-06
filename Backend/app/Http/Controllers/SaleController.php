<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Sale;
use App\Models\Product;
use App\Models\Customer;
use App\Models\SaleItem;
use App\Models\CompanyInfo;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
            'invoiceInfo.issueDate' => 'required|date_format:d-M-Y',
            'invoiceInfo.dueDate' => 'required|date_format:d-M-Y',
            'calculation.discount' => 'required|numeric',
            'calculation.shipping' => 'required|numeric',
            'calculation.subTotal' => 'required|numeric',
            'calculation.total' => 'required|numeric',
            'calculation.due' => 'required|numeric',
            'customer.address' => 'required|string',
            'customer.email' => 'required|email',
            'customer.id' => 'required|numeric',
            'customer.name' => 'required|string',
            'customer.phone' => 'required|string',
            'items.*.category_id' => 'required|numeric',
            'items.*.category_name' => 'required|string',
            'items.*.code' => 'required|string',
            'items.*.desc' => 'required|string',
            'items.*.id' => 'required|numeric',
            'items.*.name' => 'required|string',
            'items.*.price' => 'required|numeric',
            'items.*.quantity' => 'required|numeric',
            'items.*.unit' => 'required|string',
        ]);
        if ($codeValidation->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $codeValidation->errors()
            ], 500);
        } else {
            $customerInfo = (object) $request->customer;
            $customer = Customer::where('phone', $customerInfo->phone)->orWhere('email', $customerInfo->email)->first();
            if ($customer != null) {
                $customer_id = $customer->id;
                $customer_name = $customer->name;
                $customer_email = $customer->email;
                $customer_phone = $customer->phone;
                $customer_address = $customer->address;
            } else {
                $customer = Customer::create([
                    'name' => $customerInfo->name,
                    'email' => $customerInfo->email,
                    'phone' => $customerInfo->phone,
                    'address' => $customerInfo->address,
                ]);
                $newCustomer = Customer::find($customer->id);
                $customer_id = $newCustomer->id;
                $customer_name = $newCustomer->name;
                $customer_email = $newCustomer->email;
                $customer_phone = $newCustomer->phone;
                $customer_address = $newCustomer->address;
            }

            $prefix = "#INV-";
            $year = date("y");
            $latestSale = Sale::latest()->first();
            if ($latestSale != null) {
                $newSaleId = $latestSale->id + 1;
            } else {
                $newSaleId = 1;
            }
            $invoice_no = $prefix . $year . str_pad($newSaleId, 4, 0, STR_PAD_LEFT);
            $invoiceInfo = (object) $request->invoiceInfo;
            $calculation = (object) $request->calculation;
            $formattedIssueDate = date('Y-m-d', strtotime($invoiceInfo->issueDate));
            $formattedDueDate = date('Y-m-d', strtotime($invoiceInfo->dueDate));
            $sale = Sale::create([
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
                'discount' => $calculation->discount,
                'shipping' => $calculation->shipping,
                'total' => $calculation->total,
                'issue_date' => $formattedIssueDate,
                'due_date' => $formattedDueDate
            ]);

            $sale = Sale::find($sale->id);
            $sale_id = $sale->id;
            $input = $request->all();
            foreach ($input['items'] as $key => $value) {
                $product = Product::find($value['id']);

                if ($product == null) {
                    return response()->json([
                        'status' => false,
                        'error' => "Product not found"
                    ], 404);
                }
                if ($product['product_desc'] == null) {
                    return $product->id . " description is empty";
                }
                $item['sale_id'] = $sale_id;
                $item['product_id'] = $value['id'];
                $item['name'] = $product['product_name'];
                $item['code'] = $product['product_code'];
                $item['quantity'] = $value['quantity'];
                $item['rate'] = $value['price'];
                $item['product_retail_price'] = $product->product_retail_price;
                $item['unit'] = $value['unit'];

                $item['description'] = $product['product_desc'];
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