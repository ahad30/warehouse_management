<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator as Validation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CategoryRequest extends FormRequest
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
        //  if the request method is post
        if ($this->method() == 'POST') {
            return [
                'warehouse_id' => 'required|exists:warehouses,id',
                'category_name' => 'required|string|max:255',
                'description' => 'nullable',
            ];
        }

        //  if the request method is put
        if ($this->method() == 'PUT') {
            return [
                'warehouse_id' => ['required', 'exists:warehouses,id'],
                'category_name' => 'required|string|max:255',
                'description' => 'nullable',
            ];
        }
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
