<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator as Validation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;


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
            'id' => ['required', 'exists:products,id'],
            'warehouse_id' => ['required'],
            'category_id' => ['required'],
            'brand_id' => ['nullable'],
            'product_name' => ['required', 'string', 'max:255'],
            'product_retail_price' => ['required', 'max:10'],
            'product_sale_price' => ['nullable', 'max:10'],
            'description' => ['nullable', 'string', 'max:255'],
            'scan_code' => ['nullable', Rule::unique('products')->ignore(request()->input('id'))],
        ];
    }
    public function failedValidation(Validation $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => 'Validation errors',
            'errors' => $validator->errors()
        ], 400));
    }
}
