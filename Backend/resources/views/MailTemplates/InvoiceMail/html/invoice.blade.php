@extends('MailTemplates.InvoiceMail.html.layout')
@section('invoice')
    @php
        if (isset($invoice)) {
            $invoice = json_decode($invoice);
        }
    @endphp
    <div class="wrapper ">
        <header>
            <div class="invoice-header">
                <h4>Invoice</h4>
                <p><span>Date: </span>{{ $invoice->sale->issue_date ?? '' }}</p>
                <p><span>Invoice: </span> #{{ $invoice->sale->invoice_no ?? '' }}</p>
            </div>
            <div>
                @if (isset($invoice))
                    <img class="logo" src="{{ asset('uploads/companyInfo/' . $invoice->companyInfo->company_img) }}"
                        alt="{{ $invoice->companyInfo->company_name }}" />
                @endif
            </div>
        </header>
        <main>
            <div class="client-container">
                <div>
                    <h4>Bill to</h4>
                    <h3>Client</h3>
                    <p>{{ $invoice->customer->address ?? '' }}</p>
                </div>
                <div>
                    <h4>PAY to</h4>
                    <h3>Admin</h3>
                    <p>{{ $invoice->companyInfo->company_address ?? '' }}</p>
                </div>
            </div>
            <table class="data-container">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Price </th>
                        <th>Qty.</th>
                        <th>Tax</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    @if (isset($invoice->items))
                        @foreach ($invoice->items as $item)
                            <tr>
                                <td>{{ $item->name }}</td>
                                <td>{{ $invoice->settings->currency . ' ' . $item->rate }}</td>
                                <td>{{ $item->quantity }}</td>
                                <td>{{ $item->tax }}%</td>
                                <td>{{ $item->total_price_quantity_tax }}</td>
                            </tr>
                        @endforeach
                    @endif
                    {{-- <tr>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                    </tr> --}}
                </tbody>
            </table>
            <div class="row align-items-end  py-5 me-5">
                <div class="col-sm-6">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data={{ $invoice->sale->invoice_no }} "
                        alt="">
                </div>
                <div class="col-sm-6">


                    <div class="subtotal mt-5">
                        <h3>Subtotal</h3>
                        <h3>{{ $invoice->settings->currency ?? '' }} {{ ' ' . $invoice->sale->sub_total ?? '' }}</h3>
                    </div>
                    <div class="subtotal">
                        <h3>Discount</h3>
                        <h3>{{ $invoice->settings->currency ?? '' }} {{ ' ' . $invoice->sale->discount ?? '' }}</h3>
                    </div>
                    <div class="subtotal">
                        <h3>Shipping</h3>
                        <h3>{{ $invoice->settings->currency ?? '' }} {{ ' ' . $invoice->sale->shipping ?? '' }}</h3>
                    </div>
                    <div class="subtotal fw-bolder" style="font-weight: bold;color:blue">
                        <h3>Total</h3>
                        <h3>{{ $invoice->settings->currency ?? '' }} {{ ' ' . $invoice->sale->total ?? '' }}</h3>
                    </div>
                    <div class="subtotal fw-bolder" style="font-weight: bold;color:green">
                        <h3>Paid</h3>
                        <h3>{{ $invoice->settings->currency ?? '' }} {{ ' ' . $invoice->sale->paid_amount ?? '' }}</h3>
                    </div>
                    <div class="subtotal fw-bolder" style="font-weight: bold;color:red ">
                        <h3>Due</h3>
                        <h3>{{ $invoice->settings->currency ?? '' }} {{ ' ' . $invoice->sale->due_amount ?? '' }}</h3>
                    </div>
                </div>
            </div>
        </main>
        <div class="p-3 mt-4 text-center">
            {{ $invoice->settings->footer_note }}
            {{-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, eligendi. --}}
        </div>
    </div>
@endsection
