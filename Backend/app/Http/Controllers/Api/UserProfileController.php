<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserProfileController extends Controller
{
    public function findLoggedInUser()
    {
        $user = auth()->user();
        if (!is_null($user)) {

            $roleWithUser = User::where('id', $user->id)->with('getRole')->first();
            $role = $roleWithUser->getRole->role;

            if (!is_null($role)) {
                // $payload = JWTAuth::decode($user);

                return response()->json([
                    'status' => true,
                    'message' => 'user  found',
                    'user' => $roleWithUser
                ]);
            }

        }

        return response()->json([
            'status' => false,
            'message' => 'user not found'
        ], 404);
    }
}