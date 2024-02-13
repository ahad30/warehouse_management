<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'warehouse_id' => $this->warehouse->id,
            'warehouse_name' => $this->warehouse->name,
            'warehouse_slug' => $this->warehouse->slug,
            'category_name' => $this->category_name,
            'image' => $this->image,
            'slug' => $this->slug,
            'description' => $this->description,
        ];
    }
}
