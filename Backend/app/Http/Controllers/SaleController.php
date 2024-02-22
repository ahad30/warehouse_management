<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\Sale;
use App\Models\Product;
use App\Models\Customer;
use App\Models\SaleItem;
use App\Models\Settings;
use App\Models\CompanyInfo;
use Illuminate\Http\Request;
use App\Jobs\InvoiceCreatedJob;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class SaleController extends Controller
{
    // index
    // Index - Retrieve invoices with optional date filtering
    public function index($from = null, $to = null, $dayCount = null): Response
    {
        $invoices = Sale::with('saleitems', 'customer')->latest()->get();

        if ($invoices->count() <= 0) {
            return response()->json([
                'status' => false,
                'message' => 'No Invoices found',
                'invoices' => $invoices,
            ]);
        } else {
            // Handle date filtering options
            if ($from != null && $from != "null" && $to != null && $to != "null") {
                $invoices = $this->getInvoice($from, $to);
                return response()->json([
                    'status' => true,
                    'count' => $invoices->count(),
                    'invoices' => $invoices,
                ]);
            } else if ($from == "null" && $dayCount != null && $dayCount != "null") {
                // Handle different day count options
                if ($dayCount == 1) {
                    $from = Carbon::today()->startOfDay();
                    $to = Carbon::now()->endOfDay();
                } else if ($dayCount == 7) {
                    $from = Carbon::now()->subDays(7);
                    $to = Carbon::now();
                } else if ($dayCount == 31) {
                    $from = Carbon::now()->startOfMonth();
                    $to = Carbon::now()->endOfMonth();
                }
                $invoices = $this->getInvoice($from, $to);
                return response()->json([
                    'status' => true,
                    'count' => $invoices->count(),
                    'invoices' => $invoices,
                ]);
            } else {
                // Retrieve all invoices from the database
                return response()->json([
                    'status' => true,
                    'count' => $invoices->count(),
                    'invoices' => $invoices,
                ]);
            }
        }
    }

    /**
     *
     * @return invoices of particular times
     *
     */
    // Helper function to retrieve invoices based on date range
    protected function getInvoice($from, $to)
    {
        $beginningDate = Carbon::parse($from)->format('Y-m-d');
        $endingDate = Carbon::parse($to)->format('Y-m-d');
        $invoices = Sale::with('saleitems', 'customer')
            ->whereBetween('issue_date', [$beginningDate, $endingDate])
            ->latest()
            ->get();

        return $invoices;
    }



  

    /**
     *
     * @create Request $request
     *
     */
    // Create - Generate and store invoices
    public function create( Request $request): Response
    {
    
        $productsQuery = Product::where('is_sold',false);

        if ($request->brand_id != null) {
            $productsQuery->where('brand_id', $request->brand_id);
        }

        if ($request->category_id != null) {
            $productsQuery->where('category_id', $request->category_id);
        }

        if($request->warehouse_id!=null){
            $productsQuery->where('warehouse_id', $request->warehouse_id);
        }

        if($request->scan_code != null)
        {
            $productsQuery->where('scan_code', $request->scan_code);

        }


        $products = $productsQuery->paginate(15);

        return response()->json([
            'status' => true,
            'data' =>  $products ,
     
        ]);
    }

    // Store - Create and store a new invoice
    public function store(Request $request)
    {
        // return $request->all();
        $validator = Validator::make($request->all(), [
            'invoiceInfo.issueDate' => 'required|date_format:Y-m-d',
            'invoiceInfo.dueDate' => 'date_format:Y-m-d',
            'calculation.discount' => 'required|numeric',
            'calculation.shipping' => 'required|numeric',
            'calculation.subTotal' => 'required|numeric',
            'calculation.total' => 'required|numeric',
            'calculation.paidAmount' => 'required',
            'customer.name' => 'required|string',
            'customer.phone' => 'required|string',
            'items' => 'required|array',
            'items.*.category_id' => 'required|numeric',
            'items.*.id' => 'required|numeric',
            'items.*.quantity' => 'required|numeric',
            'items.*.total_price_quantity_tax' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validator->errors(),
            ], 400);
        }

        // Create or find the customer
        $customerInfo = $request->input('customer');
        $customer = Customer::firstOrNew(['phone' => $customerInfo['phone']]);
        $customer->fill($customerInfo)->save();

        // Generate invoice number
        $prefix = "INV-";
        $year = date("y");
        $newSaleId = Sale::max('id') + 1;
        $invoice_no = $prefix . $year . str_pad($newSaleId, 4, 0, STR_PAD_LEFT);

        // Prepare the data for the new sale
        $invoiceInfo = $request->input('invoiceInfo');
        $calculation = $request->input('calculation');
        $formattedIssueDate = Carbon::parse($invoiceInfo['issueDate'])->format('Y-m-d');
        $formattedDueDate = $invoiceInfo['dueDate'] ? Carbon::parse($invoiceInfo['dueDate'])->format('Y-m-d') : null;

        // Start a database transaction
        DB::beginTransaction();

        try {

            // Create the sale record
            $sale = Sale::create([
                'invoice_no' => $invoice_no,
                'customer_id' => $customer->id,
                'discount' => $calculation['discount'],
                'shipping' => $calculation['shipping'],
                'sub_total' => $calculation['subTotal'],
                'total' => $calculation['total'],
                'paid_amount' => $calculation['paidAmount'],
                'due_amount' => $calculation['due'],
                'issue_date' => $formattedIssueDate,
                'due_date' => $formattedDueDate,
                'status' => $calculation['due'] > 0 ? 0 : 1,
            ]);

            // Store sale items
            $items = $request->input('items');
            foreach ($items as $item) {
                $product = Product::find($item['id']);

                if (!$product || $product->product_quantity < $item['quantity']) {
                    DB::rollBack();
                    return response()->json([
                        'status' => false,
                        'message' => 'Product not found or insufficient quantity in stock',
                    ], 400);
                }

                // storing items in different model
                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,
                    'name' => $product->product_name,
                    'code' => $product->product_code,
                    'quantity' => $item['quantity'],
                    'tax' => $item['tax'],
                    'total_price_quantity_tax' => $item['total_price_quantity_tax'],
                    'rate' => $product->product_sale_price,
                    'product_retail_price' => $product->product_retail_price,
                    'unit' => $product->product_unit,
                    'description' => $product->product_desc,
                ]);
                $averagePriceOfProduct = SaleItem::avg('rate');
                // return $averagePriceOfProduct; //average price of product
                DB::table('sale_items')->where('product_id', $product->id)->update([
                    'average_rate' => $averagePriceOfProduct
                ]);
                // Update product quantity in stock
                $product->decrement('product_quantity', $item['quantity']);
            }
            DB::commit();
            // Commit the transaction



            $settings = Settings::find(1); //getting settings

            $companyInfo = CompanyInfo::find(1);
            // Fetch sale items and customer for response
            $items = SaleItem::where('sale_id', $sale->id)->get();
            $customer = $sale->customer;
            if ($settings->mail_option == 'on' && $customer->email != null) {
                InvoiceCreatedJob::dispatch($customer, $sale, $items, $settings, $companyInfo);
            }

            return response()->json([
                'status' => true,
                'message' => 'Invoice successfully created',
                'data' => [
                    'invoice' => $sale,
                    'items' => $items,
                    'customer' => $customer,
                ],
            ]);
        } catch (Exception $e) {
            // Rollback the transaction and handle the exception
            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }



    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'invoice_id' => 'required',
            'paid_amount' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validator->errors(),
            ], 400);
        }

        // Find the invoice by ID
        $invoice = Sale::find($request->invoice_id);

        if (!$invoice) {
            return response()->json([
                'status' => false,
                'message' => "Invoice Not Found",
            ], 404);
        }

        $oldPaidAmount = $invoice->paid_amount;
        $oldDueAmount = $invoice->due_amount;
        $newPaidAmount = $request->paid_amount;

        if ($newPaidAmount > $oldDueAmount) {
            return response()->json([
                'status' => false,
                'message' => "Can't pay more than due",
            ], 400);
        }

        // Start a database transaction
        DB::beginTransaction();

        try {
            // Update paid amount and due amount
            $invoice->increment('paid_amount', $newPaidAmount);
            $invoice->decrement('due_amount',  $newPaidAmount);


            // Update status when due is empty
            if ($invoice->due_amount == 0) {
                $invoice->update(['status' => 1]);
            }

            // Commit the transaction
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => "Payment Paid Successfully",
            ], 200);
        } catch (Exception $e) {
            // Rollback the transaction and handle the exception
            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id): Response
    {
        if ($id) {
            // Find the invoice by its ID
            $invoice = Sale::find($id);

            if ($invoice) {
                // Deleting the invoice
                $invoice->delete();

                return response()->json([
                    'status' => true,
                    'message' => 'Invoice deleted successfully',
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Invoice not found',
                ], 404);
            }
        }

        return response()->json([
            'status' => false,
            'message' => 'Invalid Invoice ID provided',
        ], 400);
    }



    public function search(Request $request)
    {   
        // $category_id = request('category'),
        // $warehouse_id = request('warehouse'),
        // $brand_id = request('brand'),

        // if('category_id' == $category_id && 'warehouse_id' == $warehouse_id && 'brand_id' == $brand_id )
        // {

        // }

    }


}
