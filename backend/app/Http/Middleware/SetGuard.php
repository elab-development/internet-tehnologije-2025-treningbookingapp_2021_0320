<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class SetGuard
{
    public function handle($request, Closure $next, $guard = null)
    {
        if ($guard) {
            Config::set('auth.defaults.guard', $guard);
        }

        return $next($request);
    }
}
