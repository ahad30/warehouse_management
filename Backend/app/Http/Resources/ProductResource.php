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
        return array_merge(parent::toArray($request), [
            "category_name" => $this->getCategory->category_name ?? null,
            "brand_name" => $this->getBrand->brand_name ?? null,
            "warehouse_name" => $this->warehouse->name ?? null,
        ]);
    }
}
