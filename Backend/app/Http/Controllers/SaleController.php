<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\Sale;
use App\Models\Product;
use App\Models\Customer;
use App\Models\SaleItem;
use App\Models\CompanyInfo;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SaleController extends Controller
{
    // index
    public function index($from = null, $to = null)
    {

        $invoices = Sale::with('saleitems', 'customer')->latest()->get();

        if ($invoices->count() <= 0) {
            return response()->json([
                'status' => false,
                'message' => 'No Invoices found',
                'invoices' => $invoices,
            ]);
        } else {
            if ($from != null && $to != null) {
                $beginningDate = date('Y-m-d', strtotime($from));
                $endingDate = date('Y-m-d', strtotime($to));
                $invoices = Sale::with('saleitems', 'customer')->whereBetween('issue_date', [$beginningDate, $endingDate])->latest()->get();
                return response()->json([
                    'status' => true,
                    'invoices' => $invoices,
                ]);
            } else {
                return response()->json([
                    'status' => true,
                    'invoices' => $invoices,
                ]);
            }

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
            'invoiceInfo.issueDate' => 'required|date_format:Y-m-d',
            'invoiceInfo.dueDate' => 'date_format:Y-m-d',
            'calculation.discount' => 'required|numeric',
            'calculation.shipping' => 'required|numeric',
            'calculation.subTotal' => 'required|numeric',
            'calculation.total' => 'required|numeric',
            'calculation.paidAmount' => 'required',
            'customer.name' => 'required|string',
            'customer.phone' => 'required|string',
            'items' => 'required',
            'items.*.category_id' => 'required|numeric',
            'items.*.id' => 'required|numeric',
            'items.*.quantity' => 'required|numeric',
        ]);
        if ($codeValidation->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $codeValidation->errors()
            ], 400);
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
            $formattedDueDate = null;
            if ($calculation->due > 0) {
                $formattedDueDate = date('Y-m-d', strtotime($invoiceInfo->dueDate));
            }
            DB::beginTransaction();
            try {
                $sale = Sale::create([
                    'invoice_no' => $invoice_no,
                    'customer_id' => $customer_id,
                    'discount' => $calculation->discount,
                    'shipping' => $calculation->shipping,
                    'sub_total' => $calculation->subTotal,
                    'total' => $calculation->total,
                    'paid_amount' => $calculation->paidAmount,
                    'due_amount' => $calculation->due,
                    'issue_date' => $formattedIssueDate,
                    'due_date' => $formattedDueDate,
                    'status' => $formattedDueDate != null ? 0 : 1,
                ]);

                $sale = Sale::find($sale->id);
                $sale_id = $sale->id;
                $input = $request->all();
                foreach ($input['items'] as $key => $value) {
                    $product = DB::table('products')->where('id', $value['id'])->first();

                    $quantityLeft = $product->product_quantity;
                    // when product is not available as desired
                    if ($quantityLeft < $value['quantity']) {
                        return response()->json(['status' => false, 'message' => $product->product_name . " only " . $quantityLeft . " items left "], 400);

                    } else {
                        // decreasing items from stock
                        DB::table('products')->where('id', $value['id'])->update(['product_quantity' => $quantityLeft - $value['quantity']]);

                    }
                    // when product is not available
                    if ($product == null) {
                        return response()->json([
                            'status' => false,
                            'error' => "Product not found"
                        ], 404);
                    }

                    $item = [
                        'sale_id' => $sale_id,
                        'product_id' => $value['id'],
                        'name' => $product->product_name,
                        'code' => $product->product_code,
                        'quantity' => $value['quantity'],
                        'rate' => $product->product_sale_price,
                        'product_retail_price' => $product->product_retail_price,
                        'unit' => $product->product_unit,
                        'description' => $product->product_desc,
                    ];

                    DB::table('sale_items')->insert($item);





                }
            } catch (Exception $e) {
                // rolling back transaction if transaction failed
                DB::rollBack();
                return response()->json([
                    'status' => false,
                    'message' => $e->getMessage()
                ], 500);
            }
            // committing after transaction
            DB::commit();
            $items = SaleItem::where('sale_id', $sale_id)->get();
            $customer = Customer::find($customer_id);
            return response()->json([
                'status' => true,
                'message' => 'Invoice successfully created',
                'data' => [
                    'invoice' => $sale,
                    'items' => $items,
                    'customer' => $customer
                ]
            ]);
        }
    }
}