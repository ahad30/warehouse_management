<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    // index
    public function index(): Response
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

    public function update(Request $request): Response
    {
        $validator = Validator::make($request->all(), [
            'role_id' => 'required',
            // 'status' => 'required',
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
        $loggedInUser = auth()->user();
        // not permitting when the user wants to update his role
        if ($user->id == $loggedInUser->id) {
            return response()->json([
                'status' => false,
                'message' => "You can't update your role",
            ], 401);
        }
        // not permitting when the user wants to update super admin
        if ($user->id == 1) {
            return response()->json([
                'status' => false,
                'message' => "You can't update superadmin",
            ], 401);
        }
        if ($user == null) {
            return response()->json([
                'status' => false,
                'message' => 'User not found',

            ], 400);
        }


        // updating brand
        $user->update([
            'role_id' => $request->role_id,
            'status' => $request->status == null ? $user->status : $request->status,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'User Updated',
            'brand' => $user,
        ], 200);
    }
    // destroy
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => "User Not Found",
            ], 404);
        }
        $user->delete();

        return response()->json([
            'status' => true,
            'message' => "User successfully deleted",
        ], 200);
    }
}
