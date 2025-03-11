"use client";

import {useData} from "../../context/PaymentDetailContext";
import {formatToIDR} from "../../tools/currency";
import { QRCodeCanvas } from "qrcode.react";

export default function Page(){
    const { data } = useData();
    return(
        <div className="w-screen h-screen flex items-center justify-center bg-black text-white p-6">
            <div className="w-full bg-[rgb(24,24,24)] p-8 rounded-lg flex flex-row justify-between">
                <div className="flex flex-col w-full items-center">
                    <p className="text-xl">Selesaikan pembayaran</p>
                    {
                        !data?
                        <div>
                            <p>Kembali ke halaman sebelumnya</p>
                        </div>:
                        data.payment_method?.virtual_account?
                        <div className="flex flex-col items-center">
                            <p className="text-lg">Pembayaran Virtual Account</p>
                            <p className="text-2xl mt-1">{formatToIDR(data.amount)}</p>
                            <p className="text text-xl mt-1">{data.payment_method?.virtual_account?.channel_properties.virtual_account_number}</p>
                            <p className="text-lg">{data.payment_method?.virtual_account?.channel_code}</p>
                        </div>:
                            (data.checkout_method??'') == 'ONE_TIME_PAYMENT'?
                        <div className="flex flex-col items-center">
                            <p className="text-lg">Pembayaran E-Wallet</p>
                            <p className="text-2xl mt-1">{formatToIDR(data.charge_amount)}</p>
                            <QRCodeCanvas value={data.actions.qr_checkout_string??''} size={200} />
                            {/* <div className="flex space-x-4">
                                <button></button>
                            </div> */}
                            <p className="text-lg">{data.channel_code}</p>
                        </div>:
                        data.qr_string?
                        <div className="flex flex-col items-center">
                            <p className="text-lg">Pembayaran QRIS</p>
                            <p className="text-2xl mt-1">{formatToIDR(data.amount)}</p>
                            <QRCodeCanvas value={data.qr_string??'qr kosongg'} size={200} />
                        </div>:
                        data.retail_outlet_name?
                        <div className="flex flex-col items-center">
                            <p className="text-lg">Bayar di {data.retail_outlet_name}</p>
                            <p className="text-2xl mt-1">{formatToIDR(data.expected_amount)}</p>
                            <p className="text text-xl mt-1">{data.payment_code}</p>
                            <p className="text-lg">Kode Pembayaran</p>
                        </div>:
                        <div className="flex flex-col items-center">
                            {JSON.stringify(data)}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}