<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

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
            $roleWithUser['jwt_token'] = request()->bearerToken();
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
        // return $request->file('img');
        $loggedInUser = auth()->user();
        if ($loggedInUser != null && $loggedInUser->id != null) {
            $codeValidation = Validator::make($request->all(), [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'unique:users,email,' . $loggedInUser->id],
                'password' => ['confirmed', Password::defaults()],
                'phone' => ['required', 'string'],
                'address' => ['required', 'string'],
                'zip_code' => ['nullable', 'string'],
                'city' => ['required', 'string'],
                'state' => ['nullable', 'string'],
                'country' => ['required', 'string'],
            ]);

            if ($codeValidation->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error!',
                    'errors' => $codeValidation->errors()
                ], 400);
            }





            /* ------------------------------ image upload ------------------------------ */

            $imageData = $request->oldImg;

            if ($request->img != null) {

                $file = $request->img;
                $filename = $file->getClientOriginalName();
                $imageData = time() . '-' . $filename;
                $file->move('uploads/users', $imageData);

                // deleting old image image

                unlink('uploads/users/' . $request->oldImg);
            }


            if ($request->password != null && $request->role_id != null) {
                $user = DB::table('users')->where('id', $loggedInUser->id)->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'role_id' => $request->role_id,
                    'password' => Hash::make($request->password),
                    'status' => $request->status,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'zip_code' => $request->zip_code,
                    'city' => $request->city,
                    'state' => $request->state,
                    'country' => $request->country,
                    'img' => $imageData
                ]);
            } else if ($request->role_id != null) {
                $user = DB::table('users')->where('id', $loggedInUser->id)->update([
                    'name' => $request->name,
                    'email' => $request->email,
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
            } else if ($request->password != null) {
                $user = DB::table('users')->where('id', $loggedInUser->id)->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'status' => $request->status,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'zip_code' => $request->zip_code,
                    'city' => $request->city,
                    'state' => $request->state,
                    'country' => $request->country,
                    'img' => $imageData
                ]);
            } else {
                $user = DB::table('users')->where('id', $loggedInUser->id)->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'status' => $request->status,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'zip_code' => $request->zip_code,
                    'city' => $request->city,
                    'state' => $request->state,
                    'country' => $request->country,
                    'img' => $imageData
                ]);
            }

            $user = User::find($loggedInUser->id);

            return response()->json([
                'status' => true,
                'message' => 'Profile Updated Successful',
                'user' => $user,
            ], 200);
        }


        return response()->json([
            'status' => false,
            'message' => "Unauthorized"
        ], 401);
    }
}