<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator as Validation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateProductRequest extends FormRequest
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
            'product_name' => ['required', 'string', 'max:255'],
            'product_quantity' => ['integer', 'required'],
            'product_unit' => ['string', 'required'],
            'product_retail_price' => ['required', 'max:10'],
            'product_sale_price' => ['required', 'max:10'],
            'product_code' => ['string'],
            'category_id' => ['required'],
            'warehouse_id' => ['required'],
            'brand_id' => ['nullable'],
            'product_img' => ['nullable', 'mimes:jpg,png,jpeg,gif,svg', 'max:5000']
        ];
    }
    public function failedValidation(Validation $validator)
    {
        throw new HttpResponseException(response()->json([
            'status'   => false,
            'message'   => 'Validation errors',
            'errors'      => $validator->errors()
        ], 400));
    }
}
