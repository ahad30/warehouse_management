<?php

namespace App\Traits;

use Illuminate\Support\Facades\File;

trait ImageTrait
{
    /*
    | upload image
    |
    | Request $request
    | input field name = "image"        // "Input field name"
    | path = "/uploads/categories"      // public/uploads/categories
    |
    |*/
    public function imageUpload($request, string $inputField, string $path)
    {
        if ($request->file($inputField)) {
            $file = $request->file($inputField);
            $extension = $file->getClientOriginalExtension();
            $filename = uniqid('img-') . '.' . $extension;
            $file->move(public_path($path), $filename);

            $filePath = $path . '/' . $filename;
            return $filePath;
        }
        return null;
    }

    /*
    | update image
    |
    | Request $request
    | find model objects = modelField->database field name        // $model->image
    | input field name = "image"        // "Input field name"
    | oldPath = "/uploads/categories/"   // public/uploads/categories/.$filename
    | newPath = "/uploads/categories"  // public/uploads/categories
    |
    |*/
    public function imageUpdate($request, string $inputField, $modelField, string $newPath)
    {
        if ($request->file($inputField)) {
            $previous_path = public_path($modelField);
            if (File::exists($previous_path)) {
                File::delete($previous_path);
            }

            $file = $request->file($inputField);
            $filename = uniqid('img-') . '.' . $file->getClientOriginalExtension();
            $file->move(public_path($newPath), $filename);
            $filePath = $newPath . '/' . $filename;
            return $filePath;
        }
        return $modelField;
    }


    /*
    | delete image
    |
    | find model objects = modelField->database field name        // $model->image
    | oldPath = "/uploads/categories"   // public/uploads/categories/.$filename
    |
    |*/
    public function deleteImage($modelField)
    {
        $previous_path = public_path($modelField);
        if (File::exists($previous_path)) {
            File::delete($previous_path);
        }
    }


    /*
    | delete multiple images
    |
    | find model objects = $query        // PropertyImage::where('property_id', $property->id)->get()
    | oldPath = "uploads/properties/images/"   // uploads/properties/images/.$filename
    |
    |*/
    public function deleteMultipleImages($query, $oldPath)
    {
        $images = $query;
        // delete all exists images on local storage
        foreach ($images as $image) {
            // existing file path
            $previous_path = public_path($oldPath . $image->image);
            // delete files
            if (File::exists($previous_path)) {
                File::delete($previous_path);
            }
        }
        return $images;
    }
    // For uploading Image
    public function multipleImageUpload($request, string $path)
    {
        try {
            $allowedFileExtension = ['jpg', 'png', 'jpeg', 'gif', 'svg'];
            $imagePaths = [];

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $key => $image) {
                    $extension = $image->getClientOriginalExtension();
                    $checkExtension = in_array($extension, $allowedFileExtension);
                    $checkSize = ($image->getSize() <= 5 * 1024 * 1024); // Max 5MB

                    if ($checkExtension && $checkSize) {
                        $imageName = uniqid('img-') . '.' . $extension;
                        $image->move(public_path($path), $imageName);
                        $imagePath = $path . "/" . $imageName;
                        $imagePaths[] = $imagePath;
                    }
                }
            }

            return $imagePaths;
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => "Something went wrong",
            ]);
        }
    }
}
