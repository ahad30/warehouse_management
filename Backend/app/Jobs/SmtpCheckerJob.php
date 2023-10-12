<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SmtpCheckerJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $request;
    /**
     * Create a new job instance.
     */
    public function __construct($request)
    {
        $this->request = $request;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {



        // change mailer

        $this->changeEnvValue("MAIL_MAILER", env('MAIL_MAILER'), $this->request['mailer']);
        // change mailer host
        $this->changeEnvValue("MAIL_HOST", env('MAIL_HOST'), $this->request['mail_host']);
        // change mailer port
        $this->changeEnvValue("MAIL_PORT", env('MAIL_PORT'), $this->request['mail_port']);
        // change mailer username
        $this->changeEnvValue("MAIL_USERNAME", env('MAIL_USERNAME'), $this->request['mail_username']);
        // change mailer password
        $this->changeEnvValue("MAIL_PASSWORD", env('MAIL_PASSWORD'), $this->request['mail_password']);
        // change mailer encryption
        $this->changeEnvValue("MAIL_ENCRYPTION", env('MAIL_ENCRYPTION'), $this->request['mail_encryption']);
        // change mailer address
        $this->changeEnvValue("MAIL_FROM_ADDRESS", '"' . env('MAIL_FROM_ADDRESS') . '"', '"' . $this->request['mail_address'] . '"');



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