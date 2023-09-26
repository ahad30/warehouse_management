<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     *
     * @return all the roles
     */
    public function __invoke(Request $request)
    {
        $roles = Role::all();
        if (is_null($roles)) {
            return response()->json([
                'status' => false,
            ], 400);
        } else {
            return response()->json([
                'status' => true,
                'roles' => $roles
            ], 200);
        }

    }
}