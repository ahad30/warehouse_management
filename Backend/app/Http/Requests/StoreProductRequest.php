<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator as Validation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'warehouse_id' => 'required|exists:warehouses,id',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'product_name' => ['required', 'string', 'max:255'],
            'product_retail_price' => ['required', 'max:10'],
            'product_sale_price' => ['nullable', 'max:10'],
            'scan_code' => ['required', 'unique:products,scan_code'],
            'description' => ['nullable', 'string', 'max:255'],
        ];
    }
    public function failedValidation(Validation $validator)
    {
        throw new HttpResponseException(response()->json([
            'status'   => false,
            'message'  => 'Validation errors',
            'errors'   => $validator->errors()
        ], 400));
    }
}
