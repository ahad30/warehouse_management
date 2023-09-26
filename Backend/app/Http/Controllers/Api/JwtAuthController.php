<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class JwtAuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        /* --------------------- jwtAuth has been created custom -------------------- */

        // $this->middleware('jwtAuth', ['except' => ['login', 'register']]);
    }
    /**
     *
     * Api to register user
     */
    public function register(Request $request)
    {

        $codeValidation = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Password::defaults()],
            'role_id' => ['required', 'int'],
            'status' => ['required', 'string'],
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
                'message' => 'validation error',
                'errors' => $codeValidation->errors()
            ], 400);
        }

        /* ----------------------- checking roles from database ---------------------- */

        $role = Role::find($request->role_id);
        if ($role == null) {
            return response()->json([
                'status' => false,
                'message' => "role doesn't exist",

            ], 404);
        }

        /* ------------------------------ image upload ------------------------------ */
        $imageData = null;
        if ($request->img != null) {
            $file = $request->file('img');
            $filename = $file->getClientOriginalName();
            $imageData = time() . '-' . $filename;
            $file->move('uploads', $imageData);
        }
        // return asset($imageData);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
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

        return response()->json([
            'status' => true,
            'message' => 'Registration Successful',
            'user' => $user,
        ], 201);

    }
    /**
     * Get a JWT token via given
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */


    public function login(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'email' => 'required|email',
                    'password' => 'required'
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }
            $credentials = $request->only('email', 'password');
            // checking users input with database's data. If exists receiving a jwt token and saving it to database
            if ($token = $this->guard()->attempt($credentials)) {
                $user = auth()->user();


                $user->jwt_token = $token;
                $user->token_expire_time = Carbon::now()->addDay();
                $user->save();
                // finding role with user using user role_id

                $roleWithUser = User::where('id', $user->id)->with('getRole')->first();
                $role = $roleWithUser->getRole->role;

                if (!is_null($role)) {
                    // $payload = JWTAuth::decode($user);

                    return response()->json([
                        'status' => true,
                        'message' => 'user  found',
                        'user' => $roleWithUser
                    ]);
                }

            }

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }


        return response()->json(['error' => 'Unauthorized'], 401);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json([
            'status' => true,
            'message' => 'Successfully logged out'
        ], 200);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
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

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }


    public function findLoggedInUser()
    {



        $user = $this->guard()->user();



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
            $roleWithUser = User::where('id', $user->id)->with('getRole')->first();
            $role = $roleWithUser->getRole->role;

            if (!is_null($role)) {
                // $payload = JWTAuth::decode($user);

                return response()->json([
                    'status' => true,
                    'message' => 'user  found',
                    'user' => $roleWithUser
                ]);
            }

        }

        return response()->json([
            'status' => false,
            'message' => 'user not found'
        ], 404);
    }
}