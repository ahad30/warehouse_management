<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Installate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (!file_exists('../license.txt')) {
            return redirect()->route('/step-1');
        }
        return $next($request);
    }
}
