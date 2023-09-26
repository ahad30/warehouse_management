<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyJwtTokenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if (!is_null($user)) {
            $tokenExpireTime = strtotime($user->token_expire_time);
            $timeNow = strtotime(Carbon::now());
            $diff = $tokenExpireTime - $timeNow;
            if ($diff <= 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'Unauthorized or Access token has expired'
                ], 401);
            }
            return $next($request);
        } else {
            return response()->json([
                'status' => false,
                'message' => "Unauthorized"
            ], 401);
        }
    }
}