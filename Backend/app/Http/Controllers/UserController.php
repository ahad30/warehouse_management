<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // index
    public function index()
    {
        $users = User::latest()->get();

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
