<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{

    public function __construct()
    {
        /* --------------------- jwtAuth has been created custom -------------------- */

        $this->middleware('jwtAuth', ['except' => ['store']]);
    }
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        // return $request->all();
        $codeValidation = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255',],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'string'],
            'status' => ['required', 'string'],
            'phone' => ['required', 'string', 'unique:' . User::class],
            'address' => ['required', 'string'],
            'zip_code' => ['nullable', 'string'],
            'city' => ['required', 'string'],
            'state' => ['nullable', 'string'],
            'country' => ['required', 'string'],
        ]);

        if ($codeValidation->fails()) {
            return response()->json([

                'errors' => $codeValidation->errors()
            ], 500);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'status' => $request->status,
            'phone' => $request->phone,
            'address' => $request->address,
            'zip_code' => $request->zip_code,
            'city' => $request->city,
            'state' => $request->state,
            'country' => $request->country,
        ]);

        /* ----------------- generating token after registering user ---------------- */
        $credentials = $request->only('email', 'password');
        if ($token = auth()->user()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }

        event(new Registered($user));

        Auth::login($user);
        $token = $user->createToken('api_token');

        return response()->json([
            'status' => true,
            'message' => 'Registration Successful',
            'user' => $user,
            'api_token' => $token,
        ], 201);
    }
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ]);
    }
}