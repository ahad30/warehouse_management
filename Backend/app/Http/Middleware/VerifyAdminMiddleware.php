<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
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
        $user = auth()->user();
        try {
            $userWithRole = User::where('id', $user->id)->with('getRole')->first();
            $tokenExpireTime = strtotime($userWithRole->token_expire_time);
            $timeNow = strtotime(Carbon::now());
            $diff = $tokenExpireTime - $timeNow;
            if ($diff <= 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'Unauthorized or Access token has expired'
                ], 401);
            }
            if ($user != null && $userWithRole->getRole->role == 'admin') {
                return $next($request);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 401);
        }

        return response()->json([
            'status' => false,
            'message' => "Unauthorized You don't have permission"
        ], 401);
    }
}