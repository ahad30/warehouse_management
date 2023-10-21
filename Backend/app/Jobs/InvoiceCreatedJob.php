<?php

namespace App\Jobs;

use Exception;
use App\Mail\SendInvoiceMail;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Notifications\SendInvoiceNotification;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class InvoiceCreatedJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $customerMail; // target user to send invoice through mail
    public $invoice; // invoice data
    public $settings; // settings data
    public $companyInfo; // companyInfo data

    // public $tries = 3;
    /**
     * Create a new job instance.
     */

    public function __construct($customer, $sale, $items, $settings, $companyInfo)
    {
        $this->invoice = [
            'sale' => $sale,
            'items' => $items,
            'customer' => $customer,
            'settings' => $settings,
            'companyInfo' => $companyInfo,
        ];
        $this->customerMail = $customer->email;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        DB::beginTransaction();
        // try {
        Mail::to($this->customerMail)->send(
            (new SendInvoiceMail(json_encode($this->invoice)))->afterCommit()
        );
        //     DB::table('settings')->where('id', 1)->update([
        //         'mail_credential_status' => 'active'
        //     ]);
        //     DB::commit();
        // } catch (Exception $e) {
        //     info($e->getMessage());
        // // DB::rollBack();
        // DB::table('settings')->where('id', 1)->update([
        //     'mail_credential_status' => 'inactive'
        // ]);
        // }
    }
}