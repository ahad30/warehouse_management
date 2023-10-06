<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class VerifyAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $user = JWTAuth::parseToken()->authenticate();
        // admin role = 1
        if ($user->role_id == 1) {
            return $next($request);
        } else {
            return response()->json([
                'status' => false,
                'message' => "You don't have permission"
            ], 401);
        }



    }
}