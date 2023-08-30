<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // index
    public function index(){
        $users = User::latest()->get();

        return response()->json([
            'users' => $users,
        ]);
    }

    // distroy
    public function distroy($id){
        $user = User::findOrFail($id);

        if ($user) {
            $user->delete();

            return response()->json([
                'users' => "User successfully deleted",
            ],201);
        } else {
            return response()->json([
                'users' => "User Not Found",
            ],500);
        }
    }
}
