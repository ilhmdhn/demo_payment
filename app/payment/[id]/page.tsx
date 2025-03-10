"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { formatToIDR } from "../../tools/currency";
import paymentList from "../../data/grade";
import { ChevronRight } from "lucide-react";
import PaymentType from "./payment_type";
import {createEwalletPayment, getVaList} from '../../network/network.js';

export default function Page() {
  const [month, setMonth] = useState(1);
  const [isPaymentTypeDialogOpen, setIsPaymentTypeDialogOpen] = useState(false);
  const params = useParams();
  const { id } = params;
  const data = paymentList.filter((plan) => plan.name == id)[0];
  const price = data.price * month;

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="max-w-4xl w-full bg-[rgb(24,24,24)] p-8 rounded-lg flex flex-row justify-between">
        <div className="flex-1">
          <div className="flex flex-col items-stretch w-24">
            <p>Jumlah bulan</p>
            <p className="text-center">{month}</p>
            <div className="flex flex-row justify-between px-2">
              <div className="bg-slate-500 px-2 rounded-lg">
                <button onClick={() => setMonth((prev) => Math.max(1, prev - 1))}>-</button>
              </div>
              <div className="bg-slate-500 px-2 rounded-lg">
                <button onClick={() => setMonth((prev) => prev + 1)}>+</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p>Langganan {id}</p>
          <div className="flex flex-row justify-between space-x-5">
            <p>Harga perbulan</p>
            <p>{formatToIDR(data.price)}</p>
          </div>
          <div className="flex flex-row justify-between space-x-5">
            <p>Biaya Langganan</p>
            <p>{formatToIDR(price)}</p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <p className="flex flex-1 text-sm">Metode pembayaran </p>
            <button onClick={() => setIsPaymentTypeDialogOpen(true)}>
              <div className="flex items-center text-white font-medium">
                <span className="text-sm">Metode Pembayaran</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </button>
          </div>
          <div className="w-full mt-4 flex flex-row justify-end">
            <button onClick={()=> createEwalletPayment('aa','aa')} className="bg-green-500 text-white w-28 rounded">
              Pay
            </button>
          </div>
        </div>
      </div>

      <PaymentType
        isOpen={isPaymentTypeDialogOpen}
        price={price}
        month={month}
        onClose={() => setIsPaymentTypeDialogOpen(false)}
        onConfirm={() => {
          alert("Pembayaran berhasil!");
          setIsPaymentTypeDialogOpen(false);
        }}
      />
    </div>
  );
}
