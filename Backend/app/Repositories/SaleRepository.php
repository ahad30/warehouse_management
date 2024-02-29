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
    private $newSaleId;
    
   /**
    * Set new sale id
    *
    * @param [type] $newSaleId
    * @return void
    */
    private function setNewSaleId($newSaleId)
    {
        $this->newSaleId = $newSaleId;
    }
    /**
     * Generate new invoice id
     *
     * @return string
     */
    public function generateNewInvoiceId():string
    {
          /** Generate invoice number */
          $prefix = "INV-";
          $year = date("y");
          $newSaleId = Sale::max('id') + 1;
          /** Initializing new sale id */
          $this->setNewSaleId($newSaleId);
          /** Generating new invoice id */
          $invoice_no = $prefix . $year . str_pad($newSaleId, 4, 0, STR_PAD_LEFT);
          return $invoice_no;
    }

    /**
     * Creating new sale 
     *
     * @param Request $request
     * @return array
     */
    public function sale(Request $request) :array
    {
        $invoice_no = $this->generateNewInvoiceId();
        /** Start database transaction */
        DB::beginTransaction();
        try {
            $totalAmount = $this->calculateTotalAmount($request->input('items'), $request);
            /** Creating the sale record */
            $sale = Sale::create([
                'invoice_no' => $invoice_no,
                'discount' => $request->discount,
                'tax' => $request->tax,
                'shipping' => $request->shipping,
                'total' => $totalAmount
            ]);

            DB::commit();
            /** Commit the transaction */
            return [
                'status' => true,
                'message' => 'Invoice successfully created',
                'code' => 201
            ];
        } catch (Exception $e) {
            /** Rollback the transaction and handle the exception */
            DB::rollBack();
            return [
                'status' => false,
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
            ];
        }
    }
   /**
    * Calculate Total Amount
    *
    * @param [type] $items
    * @param Request $request
    * @return integer
    */
    private function calculateTotalAmount($items,Request $request):int
    {
        $total = 0;
        foreach ($items as $item) {
            $product = Product::find($item);
            if (!$product || $product->is_sold) {
                DB::rollBack();
                throw new Exception("Product not found or Already sold out",404);
            }
           /** Gathering product's price */
            $total += $product->product_sale_price;
            
            /** Storing items in different model */
            SaleItem::create([
                'sale_id' =>  $this->newSaleId,
                'product_id' => $product->id,
                'name' => $product->product_name,
                'code' => $product->scan_code,
                'product_sold_price' => $product->product_sale_price, 
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
        /** Calculate Tax */
        $productPriceWithTax = $this->calculateTax($total,$request->tax);
        /** Calculate discount */
        $productPriceWithDiscount = $this->calculateDiscount($total,$request->tax);
        /** Adding product's tax and discount together to get actual price */
        $total+= $productPriceWithTax + $productPriceWithDiscount;

        return $total;
    }

    /**
     * Calculate tax
     *
     * @param [type] $total
     * @param integer $tax
     * @return integer
     */
     private function calculateTax($total,$tax=0) : int 
     {
           $productPriceWithTax = $total + ($tax*$total)/100;
           return $productPriceWithTax;
     }

     /**
      * Calculate discount
      *
      * @param [type] $total
      * @param integer $discount
      * @return integer
      */
     private function calculateDiscount($total,$discount=0) : int 
     {
           $productPriceWithDiscount = $total - ($discount*$total)/100;
           return $productPriceWithDiscount;
     }
}