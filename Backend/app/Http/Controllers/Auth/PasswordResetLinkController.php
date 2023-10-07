<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class PasswordResetLinkController extends Controller
{
    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::where('email', $request->email)->first();
        if ($user == null) {
            return response()->json([
                'status' => false,
                'message' => 'User not found!',
            ], 400);
        }
        // if (env('MAIL_USERNAME') == null || env('MAIL_PASSWORD')) {
        //     return response()->json([
        //         'status' => false,
        //         'message' => "Please provide the mail server's cridential",
        //     ], 400);
        // }
        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $message = Password::sendResetLink(
            $request->only('email')
        );

        if ($message != Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => [__($message)],
            ]);
        }

        return response()->json(['status' => true, 'message' => __($message)]);
    }
}