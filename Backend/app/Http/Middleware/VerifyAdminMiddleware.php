<?php

namespace App\Http\Middleware;

use Closure;
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