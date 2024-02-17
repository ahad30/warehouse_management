<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator as Validation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

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
                'category_name' => 'required|string|max:255|unique:categories',
                'image' => 'required|mimes:jpg,jpeg,png',
                'description' => 'nullable',
            ];
        }

        //  if the request method is put
        if ($this->method() == 'PUT') {
            return [
                'category_name' => ['required', 'max:255'],
                'new_image' => 'sometimes|mimes:jpg,jpeg,png',
                'description' => 'nullable',
            ];
        }
    }
    public function failedValidation(Validation $validator)
    {
        throw new HttpResponseException(response()->json([
            'status'   => false,
            'message'   => 'Please Select Image',
            'errors'      => $validator->errors()
        ], 400));
    }
}
