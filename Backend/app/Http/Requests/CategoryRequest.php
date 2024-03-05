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
        // If the request method is post
        if ($this->isMethod('post')) {
            return [
                'category_name' => 'required|string|max:255|unique:categories',
                'image' => 'required|mimes:jpg,jpeg,png',
                'description' => 'nullable',
            ];
        }
        info($this->route('category'));
        // If the request method is put
        if ($this->isMethod('put')) {
            return [
                'category_name' => [
                    'required',
                    'max:255',
                    Rule::unique('categories')->ignore($this->id),
                ],
                'new_image' => 'sometimes|mimes:jpg,jpeg,png',
                'description' => 'nullable',
            ];
        }
    }
    public function failedValidation(Validation $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => 'Validation Error',
            'errors' => $validator->errors()
        ], 400));
    }
}