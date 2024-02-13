<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            "id" => $this->id,
            'warehouse_id' => $this->warehouse_id,
            'brand_name' => $this->brand_name,
            'brand_img' => $this->brand_img,
        ];
    }
}
