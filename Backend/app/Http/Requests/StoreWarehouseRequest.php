<?php

namespace App\Http\Requests;

use App\Models\Warehouse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator as Validation;
use Illuminate\Http\Exceptions\HttpResponseException;


class StoreWarehouseRequest extends FormRequest
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
            'name' => 'required|unique:warehouses,name',
            'country' => 'required|string',
            'city' => 'required|string',
            'address' => 'nullable',
            'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
            'email' => 'required|email|string|lowercase',
            'site_link' => 'nullable',
            'image' => 'nullable',
        ];
    }
    public function failedValidation(Validation $validator)
    {
        throw new HttpResponseException(response()->json([
            'status'   => false,
            'message'   => 'Validation errors',
            'errors'      => $validator->errors()
        ],400));
    }


}
