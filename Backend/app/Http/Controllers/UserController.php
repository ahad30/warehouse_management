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
        $users = User::latest()->select('id', 'name', 'email', 'phone', 'status', 'address', 'city', 'state', 'country', 'img', 'email_verified_at', 'role_id')->with('getRole')->get();

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
        $validator = Validator::make($request->all(), [
            'role_id' => 'required',
            'status' => 'required',
            'id' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validator->errors()
            ], 404);
        }
        $user = User::find($request->id);
        if ($user == null) {
            return response()->json([
                'status' => false,
                'message' => 'User not found',

            ], 400);
        }


        // updating brand
        $user->update([
            'role_id' => $request->role_id,
            'status' => $request->status,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'User Updated',
            'brand' => $user,
        ], 200);
    }
    // distroy
    public function distroy($id)
    {
        $user = User::find($id);

        if ($user != null) {
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