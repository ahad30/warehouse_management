<?php

namespace App\Jobs;

use App\Mail\SendInvoiceMail;
use Illuminate\Bus\Queueable;
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

    public $mail; // target user to send invoice through mail
    public $invoice; // invoice data

    /**
     * Create a new job instance.
     */
    public function __construct($customer, $invoice)
    {
        $this->mail = $customer;
        $this->invoice = $invoice;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // $this->customer->notify(new SendInvoiceNotification());
        Mail::to($this->mail)->send(
            (new SendInvoiceMail($this->invoice))->afterCommit()
        );
    }
}