<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductInfoUpdateRequest;
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
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    use ResponseTrait, ImageTrait;
    /**
     * Retrieves products
     */

    public function index(Request $request)
    {

        $query = Product::query();
        /**
         * To retrieve product using scan_code
         */

        if ($request->input('query')) {
            $query = $query->orWhere('scan_code', 'like', "%" . $request->input('query') . "%")->orWhere('product_name', 'like', "%" . $request->input('query') . "%");
        }
        /**
         * To retrieve product using scan_code
         */
        if ($request->warehouse_id) {
            $query = $query->where('warehouse_id', $request->warehouse_id);
        }

        $data = $query->with('getCategory:id,category_name', 'warehouse:id,name', 'getBrand:id,brand_name', 'productImages')->latest()->paginate(15);

        return response()->json([
            'status' => true,
            'products' => $data,
            'total' => Product::count()
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

            // Create the product
            $productData = array_merge($request->validated(), [
                'warehouse_id' => $request->warehouse_id,
                'category_id' => $request->category_id,
                'brand_id' => $request->brand_id,
                'unique_code' => uniqid('PRD-'),
                'scan_code' => $request->scan_code,
            ]);
            $product = Product::create($productData);

            // Upload and insert product images
            $images = $this->multipleImageUpload($request, 'uploads/products/images');
            $productImageData = [];
            foreach ($images as $image) {
                $productImageData[] = [
                    'image' => $image,
                ];
            }
            $product->productImages()->createMany($productImageData);

            DB::commit();
            return $this->successResponse(['status' => true, 'message' => "Products uploaded"]);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->errorResponse(['message' => "Something went wrong"]);
        }
    }


    // edit
    public function edit($id)
    {
        $data = ProductResource::collection(Product::latest()->get());

        return $this->successResponse([
            'status' => true,
            'data' => $data,
        ]);
    }


    // update
    public function update(UpdateProductRequest $request)
    {
        $product = Product::find($request->id);
        if (!$product) {
            return $this->errorResponse(null, 'Product not found', 404);
        }

        try {
            $this->imageUpdate($request, $product->id);

            $input = [
                'warehouse_id' => $request->warehouse_id,
                'category_id' => $request->category_id,
                'brand_id' => $request->brand_id,
                'unique_code' => uniqid('PRD-'),
                'scan_code' => $request->scan_code,
            ];

            $data = $product->update(array_merge($request->validated(), $input));
            if (!$data) {
                return $this->errorResponse(null, 'Something went wrong');
            }
            return $this->successResponse([
                'status' => true,
                'message' => "Product successfully updated"
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong"
            ]);
        }
    }
    /**
     * Delete Multiple Product Images
     *
     * @param Request $request
     */
    public function imageUpdate(Request $request, $id)
    {
        if ($request->image_ids[0]) {
            foreach ($request->image_ids as $image_id) {
                $product_images = ProductImage::where('id', $image_id)->first();
                if (!$product_images) {
                    return response()->json([
                        'status' => false,
                        'message' => "Image not found"
                    ]);
                }
                // delete files
                if (File::exists($product_images->image)) {
                    File::delete($product_images->image);
                }
                $product_images->delete();
            }
        }

        /**
         * * insert multiple images
         */
        $images = $this->multipleImageUpload($request, 'uploads/products/images');
        foreach ($images as $image) {
            ProductImage::create([
                'product_id' => $id,
                'image' => $image,
            ]);
        }
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

    // ===================================== For Android App ===========================================//

    // update product information
    public function appProductUpdate(ProductInfoUpdateRequest $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => "Product not found"
            ], 404);
        }

        $product->update($request->validated());

        return response()->json([
            'status' => true,
            'message' => "Product successfully updated"
        ], 404);
    }

    public function appProductImageUpdate(Request $request, $id)
    {
        // Find product with eager loading of productImages relationship
        $product = Product::with('productImages')->find($id);

        // Check if product exists
        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => "Product not found"
            ], 404);
        }

        if ($request->hasFile('images')) {
            // Use bulk insertion for product images
            DB::transaction(function () use ($request, $product) {
                // Upload and insert product images
                $images = $this->multipleImageUpload($request, 'uploads/products/images');

                // Prepare product image data for bulk insertion
                $productImageData = [];
                foreach ($images as $image) {
                    $productImageData[] = [
                        'product_id' => $product->id,
                        'image' => $image,
                    ];
                }

                // Bulk insert product images
                ProductImage::insert($productImageData);
            });
        }

        if ($request->imageId) {
            $product_image = ProductImage::where('id', $request->imageId)->first();
            if (!$product_image) {
                return response()->json([
                    'status' => false,
                    'message' => "Image not found",
                ], 404);
            }
            // delete files
            if (File::exists($product_image->image)) {
                File::delete($product_image->image);
            }
            $product_image->delete();
        }

        // Return success response
        return response()->json([
            'status' => true,
            'message' => "Product images successfully updated"
        ], 200);
    }
}
