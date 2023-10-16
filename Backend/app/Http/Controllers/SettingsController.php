<?php

namespace App\Http\Controllers;


use App\Models\Settings;
use App\Jobs\SmtpCheckerJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class SettingsController extends Controller
{
    public function index(): Response
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
    public function update(Request $request): Response
    {

        // return response()->json($request->all(), 500);
        $settings = Settings::find(1); //getting settings from database
        if ($settings == null) {
            return response()->json([
                'status' => false,
                'message' => "Settings not found"
            ], 404);
        }

        $validateInput = Validator::make($request->all(), [
            'discount' => ['max:100'],
            'taxation' => ['string', 'max:20'],
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
                DB::table('settings')->where('id', 1)->update(['mail_option' => "off"]);
                return response()->json([
                    'status' => true,
                    'message' => "Settings has been updated successfully"
                ], 200);
            } else {


                // mail option is on so we need to send email and sms notification
                try {

                    // SmtpCheckerJob::dispatch($request->all());

                    DB::table('settings')->where('id', 1)->update(['mail_option' => "on"]);
                    /* -------------------------------------------------------------------------- */
                    /*                              changing env value                             */
                    /* -------------------------------------------------------------------------- */
                    $this->changeEnvValue("MAIL_MAILER", env('MAIL_MAILER'), $request->mailer);
                    // change mailer host
                    $this->changeEnvValue("MAIL_HOST", env('MAIL_HOST'), $request->mail_host);
                    // change mailer port
                    $this->changeEnvValue("MAIL_PORT", env('MAIL_PORT'), $request->mail_port);
                    // change mailer username
                    $this->changeEnvValue("MAIL_USERNAME", env('MAIL_USERNAME'), $request->mail_username);
                    // change mailer password
                    $this->changeEnvValue("MAIL_PASSWORD", env('MAIL_PASSWORD'), $request->mail_password);
                    // change mailer encryption
                    $this->changeEnvValue("MAIL_ENCRYPTION", env('MAIL_ENCRYPTION'), $request->mail_encryption);
                    // change mailer address
                    $this->changeEnvValue("MAIL_FROM_ADDRESS", '"' . env('MAIL_FROM_ADDRESS') . '"', '"' . $request->mail_address . '"');

                    DB::table('settings')->where('id', 1)->update(['mail_option' => "on"]);
                    DB::commit();

                    return response()->json([
                        'status' => true,
                        'message' => "Settings has been updated successfully and SMTP also configured soon"
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
    protected function changeEnvValue($keyName, $oldValue, $newValue)
    {

        $value = $newValue == null || $newValue == '' || $newValue == "null" ? "null" : $newValue;
        file_put_contents(
            app()->environmentFilePath(),
            str_replace(
                $keyName . '=' . $oldValue,
                $keyName . '=' . $value
                ,
                file_get_contents(app()->environmentFilePath())
            )
        );
    }


}