<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Settings;
use Illuminate\Support\Env;
use App\Jobs\SmtpCheckerJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Notifications\SmtpCheckerMail;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Settings::find(1);
        $mailCredential = [
            'mailer' => env('MAIL_MAILER'),
            'mailer_host' => env('MAIL_HOST'),
            'mailer_port' => env('MAIL_PORT'),
            'mailer_username' => env('MAIL_USERNAME'),
            'mailer_password' => env('MAIL_PASSWORD'),
            'mailer_encryption' => env('MAIL_ENCRYPTION'),
            'mailer_from_address' => env('MAIL_FROM_ADDRESS'),
            'mail_from' => env('APP_NAME'),
        ];
        return response()->json([
            'status' => true,
            'settings' => $settings,
            'mailCredentials' => $mailCredential
        ], 200);
    }
    public function update(Request $request)
    {
        /* ---------------------- getting settings from seeder ---------------------- */

        $settings = Settings::find(1);

        $validateInput = Validator::make($request->all(), [
            'discount' => ['string', 'max:10'],
            'shipping' => ['max:10'],
            'taxation' => ['string', 'max:20'],
            'tax_value' => ['max:10'],
            'currency' => ['max:20'],
        ]);
        if ($validateInput->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error!',
                'errors' => $validateInput->errors()
            ], 400);
        } else {
            /* ---------------------------- updating settings --------------------------- */
            DB::table('settings')->where('id', 1)->update([
                'discount' => $request->discount,
                'shipping' => $request->shipping,
                'taxation' => $request->taxation,
                'tax_value' => $request->tax_value,
                'currency' => $request->currency,
                'footer_note' => $request->footer_note,
            ]);

            if ($request->mail_option == null || $request->mail_option == "off") {
                return response()->json([
                    'status' => true,
                    'message' => "Settings has been updated successfully"
                ], 200);
            } else {


                // mail option is on so we need to send email and sms notification
                try {

                    SmtpCheckerJob::dispatch($request->all());
                    DB::commit();
                    return response()->json([
                        'status' => true,
                        'message' => "Settings has been updated successfully and SMTP successfully configured"
                    ], 200);
                } catch (\Exception $e) {

                    DB::rollBack();
                    return response()->json([
                        'status' => true,
                        'message' => "Settings has been updated successfully, but SMTP failed to configured"
                    ], 200);
                }

            }
        }
    }



}