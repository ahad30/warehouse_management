<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImage;
use App\Models\Warehouse;
use App\Traits\ImageTrait;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    use ResponseTrait, ImageTrait;
    // index
    public function index()
    {
        $products = ProductResource::collection(Product::latest()->paginate(20));
        return response()->json([
            'status' => true,
            'products' => $products
        ], 200);
    }

    // create
    public function create()
    {
        $warehouses = Warehouse::all();
        $categories = Category::all();
        $brands = Brand::all();
        return response()->json([
            'status' => true,
            'data' => [
                'warehouses' => $warehouses,
                'categories' => $categories,
                'brands' => $brands,
            ],

        ], 200);
    }

    // store
    public function store(StoreProductRequest $request)
    {
        try {
            DB::beginTransaction();
            $input = [
                'warehouse_id' => $request->warehouse_id,
                'category_id' => $request->category_id,
                'brand_id' => $request->brand_id,
                'unique_code' => Str::random(8),
                'scan_code' => $request->scan_code,
            ];
            $product = Product::create(array_merge($request->validated(), $input));

            $images = $this->multipleImageUpload($request, 'uploads/products/images');

            $productImageData = [];
            foreach ($images as $image) {
                $productImageData[] = [
                    'product_id' => $product->id,
                    'image' => $image,
                ];
            }
            /**Inserting product image */
            ProductImage::insert($productImageData);

            DB::commit();
            return $this->successResponse(['status' => true, 'message' => "Products uploaded"]);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse([
                'status' => false,
                'message' => "something went wrong"
            ]);
        }
    }


    // edit
    public function edit($id)
    {
        $data = ProductResource::collection(Product::latest()->get());
        if ($data->count() > 0) {
            return $this->successResponse([
                'status' => true,
                'data' => $data,
            ]);
        } else {
            return $this->errorResponse(null, 'Data Not Found', 404);
        }
    }


    // update
    public function update(UpdateProductRequest $request)
    {
        $product = Product::find($request->id);
        if (!$product) {
            return $this->errorResponse(null, 'Product not found', 404);
        }

        $input = [
            'warehouse_id' => $request->warehouse_id,
            'category_id' => $request->category_id,
            'brand_id' => $request->brand_id,
            'unique_code' => Str::random(8),
            'scan_code' => $request->scan_code,
        ];

        $data = $product->update(array_merge($request->validated(), $input));
        if (!$data) {
            return $this->errorResponse(null, 'Something went wrong');
        }
        return $this->successResponse([
            'status' => true,
            'message' =>  "Product successfully updated"
        ]);
    }

    public function imageUpdate(Request $request, $id)
    {
        if (!Product::find($id)) {
            return $this->badRequestResponse([
                'status' => false,
                "Product not found"
            ]);
        }

        /**
         * !Delete Multiple Product Images
         */
        if ($request->image_ids) {
            foreach ($request->image_ids as $image_id) {
                $product_images = ProductImage::where('id', $image_id)->first();
                if (!$product_images) {
                    return response()->json(['data' => null, 'message' => 'data not found'], 200);
                }
                // delete files
                if (File::exists($product_images->image)) {
                    File::delete($product_images->image);
                }
                $product_images->delete();
            }
            return $this->successResponse(['status' => true, 'message' => 'Image deleted']);
        }
        /**
         * * insert multiple images
         */
        $images = $this->multipleImageUpload($request, 'uploads/products/images');
        foreach ($images as $image) {
            $data =  ProductImage::create([
                'product_id' => $id,
                'image' => $image,
            ]);
            if ($data) {
                DB::commit();
            }
        }
        return $this->successResponse(['status' => true, 'message' =>  'Image Updated']);
    }


    // destroy
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['data' => null, 'message' => 'data not found'], 200);
        }
        try {
            /**
             * !Delete Multiple Product Images
             */
            $product_images = ProductImage::where('product_id', $product->id)->get();
            foreach ($product_images as $item) {
                // delete files
                if (File::exists($item->image)) {
                    File::delete($item->image);
                }
                $item->delete();
            }

            $product->delete();
            return $this->successResponse(['status' => true, 'message' => 'product deleted successfully']);
        } catch (\Exception $e) {
            return $this->errorResponse(null, "Unable to delete product", 400);
        }
    }
}
