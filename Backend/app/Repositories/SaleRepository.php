<?php
namespace App\Repositories;

use App\Interfaces\SaleRepositoryInterface;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SaleRepository implements SaleRepositoryInterface
{
    public function sale(Request $request)
    {
        // Generate invoice number
        $prefix = "INV-";
        $year = date("y");
        $newSaleId = Sale::max('id') + 1;
        $invoice_no = $prefix . $year . str_pad($newSaleId, 4, 0, STR_PAD_LEFT);
        // Start a database transaction
        DB::beginTransaction();
        try {

          
            // Store sale items
            $items = $request->input('items');
            $totalAmount = $this->calculateTotalAmount($items,$newSaleId);
            /**Creating the sale record */
            $sale = Sale::create([
                'invoice_no' => $invoice_no,
                'discount' => $request->discount,
                'shipping' => $request->shipping,
                'total' => $totalAmount
            ]);

            DB::commit();
            // Commit the transaction

            return response()->json([
                'status' => true,
                'message' => 'Invoice successfully created',
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
    /**
     * Calculate Total Amount
     * 
     * @return $totalPrice
     */
    private function calculateTotalAmount($items, $newSaleId):mixed
    {
        $total = 0;
        foreach ($items as $item) {
            $product = Product::find($item);
            if (!$product || $product->is_sold) {
                DB::rollBack();
                throw new Exception("Product not found or Already sold out",404);
            }
            info($product);
            $total+=$product->product_sale_price;
            /**storing items in different model */
            SaleItem::create([
                'sale_id' =>  $newSaleId,
                'product_id' => $product->id,
                'name' => $product->product_name,
                'code' => $product->scan_code,
                'product_sold_price' => $product->product_sale_price, //working here
                'product_retail_price' => $product->product_retail_price,
            ]);
            /**Updating product's sold status to 1; */
           $product->increment('is_sold',1);
         

            $averagePriceOfProduct = SaleItem::avg('product_sold_price');
            /**Initializing average price of product */
            DB::table('sale_items')->where('product_id', $product->id)->update([
                'average_rate' => $averagePriceOfProduct
            ]);
        }
        return $total;
    }
}