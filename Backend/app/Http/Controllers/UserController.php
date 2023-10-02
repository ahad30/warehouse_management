<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    // index
    public function index()
    {
        $users = User::latest()->select('name', 'email', 'phone', 'status', 'address', 'city', 'state', 'country', 'img', 'email_verified_at', 'role_id')->with('getRole')->get();

        if ($users->count() <= 0) {
            return response()->json([
                'status' => false,
                'message' => 'No Item Found',
            ]);
        } else {

            return response()->json([
                'status' => true,
                'users' => $users,
            ]);
        }
    }
    /**
     *
     *  Edit user
     */

    public function update(Request $request)
    {
        if ($request->id != null) {
            $user = User::find($request->id);
            if ($user == null) {
                return response()->json([
                    'status' => false,
                    'message' => 'User Not Found',

                ], 404);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => 'User id is required'
            ], 400);
        }
        $codeValidation = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'unique:users,email,' . $request->id],
            'password' => ['required', 'confirmed', Password::defaults()],
            'role_id' => ['required', 'int'],
            'status' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'address' => ['required', 'string'],
            'zip_code' => ['nullable', 'string'],
            'city' => ['required', 'string'],
            'state' => ['nullable', 'string'],
            'country' => ['required', 'string'],
            'id' => ['required'],

        ]);

        if ($codeValidation->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $codeValidation->errors()
            ], 400);
        }



        $role = Role::find($request->role_id);
        if ($role == null) {
            return response()->json([
                'status' => false,
                'message' => "role doesn't exist",

            ], 404);
        }

        /* ------------------------------ image upload ------------------------------ */

        $imageData = $request->oldImg;

        if ($request->img != null) {
            $file = $request->file('img');
            $filename = $file->getClientOriginalName();
            $imageData = time() . '-' . $filename;
            $file->move('uploads/users', $imageData);

            // deleting old image image

            unlink('uploads/users/' . $request->oldImg);
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
            'status' => $request->status,
            'phone' => $request->phone,
            'address' => $request->address,
            'zip_code' => $request->zip_code,
            'city' => $request->city,
            'state' => $request->state,
            'country' => $request->country,
            'img' => $imageData
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Registration Successful',
            'user' => $user,
        ], 200);
    }
    // distroy
    public function distroy($id)
    {
        $user = User::find($id);

        if ($user) {
            $user->delete();

            return response()->json([
                'status' => true,
                'message' => "User successfully deleted",
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => "User Not Found",
            ], 500);
        }
    }
}