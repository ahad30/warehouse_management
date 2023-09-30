<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserProfileController extends Controller
{
    /**
     *
     * @return Logged In User
     *
     */
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
                    'message' => 'User found',
                    'user' => $roleWithUser
                ]);
            }
        }

        return response()->json([
            'status' => false,
            'message' => 'User not found'
        ], 404);
    }
    /**
     *
     * to update own profile
     *
     */
    public function updateProfile(Request $request)
    {
        $loggedInUser = auth()->user();
        if ($loggedInUser != null && $loggedInUser->id != null) {
            return ($loggedInUser);
        }

        return response()->json([
            'status' => false,
            'message' => "Unauthorized"
        ], 401);
    }
}
