@extends('MailTemplates.InvoiceMail.html.layout')
@section('invoice')
    @php
        $invoice = json_decode($invoice);
    @endphp
    <div class="wrapper">
        <header>
            <div class="invoice-header">
                <h4>Invoice</h4>
                <p><span>Date: </span>{{ $invoice->sale->issue_date }}</p>
                <p><span>Invoice: </span> #{{ $invoice->sale->invoice_no }}</p>
            </div>
            <div>
                <img class="logo" src="{{ asset('uploads/companyInfo/' . $invoice->companyInfo->company_img) }}"
                    alt="{{ asset('uploads/companyInfo/' . $invoice->companyInfo->company_img) }}" />
            </div>
        </header>
        <main>
            <div class="client-container">
                <div>
                    <h4>Bill to</h4>
                    <h3>Client</h3>
                    <p>{{ $invoice->customer->address }}</p>
                </div>
                <div>
                    <h4>PAY to</h4>
                    <h3>Admin</h3>
                    <p>{{ $invoice->companyInfo->company_address }}</p>
                </div>
            </div>
            <table class="data-container">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Qty.</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($invoice->items as $item)
                        <tr>
                            <td>{{ $item->name }}</td>
                            <td>{{ $item->rate }}</td>
                            <td>{{ $item->quantity }}</td>
                            <td>{{ $item->rate * $item->quantity }}</td>
                        </tr>
                    @endforeach

                </tbody>
            </table>
            <div class="flex-col" style="margin-top: 70px">
                <div class="flex-row">
                    <h3>Subtotal</h3>
                    <h3>{{ $invoice->settings->currency . ' ' . $invoice->sale->sub_total }}</h3>
                </div>
            </div>
            <div class="flex-col">
                <div class="flex-row">
                    <h3>Discount</h3>
                    <h3>৳ 100,320.90</h3>
                </div>
                <div class="flex-row">
                    <h3>Shipping</h3>
                    <h3>{{ $invoice->settings->currency . ' ' . $invoice->sale->shipping }}</h3>
                </div>
                <div class="flex-row" style="font-weight: 600;">
                    <h3>Total</h3>
                    <h3>{{ $invoice->settings->currency . ' ' . $invoice->sale->total }}</h3>
                </div>
            </div>
        </main>
    </div>
@endsection
