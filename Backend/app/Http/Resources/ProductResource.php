<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "category_id" => $this->category_id,
            "category_name" => $this->getCategory->category_name,
            "brand_id" => $this->brand_id,
            "brand_name" => $this->getBrand->brand_name,
            "warehouse_id" => $this->warehouse_id,
            "warehouse_name" => $this->warehouse->name,
            "product_name" => $this->product_name,
            "slug" => $this->slug,
            "product_img" => $this->product_img,
            "product_unit" => $this->product_unit,
            "product_code" => $this->product_code,
            "product_quantity" => $this->product_quantity,
            "product_retail_price" => $this->product_retail_price,
            "product_sale_price" => $this->product_sale_price,
            "product_desc" => $this->product_desc,
        ];
    }
}
