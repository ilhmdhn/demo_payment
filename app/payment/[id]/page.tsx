"use client";

import { createContext, useContext, useState } from "react";
import { useParams } from "next/navigation";
import { formatToIDR } from "../../tools/currency";
import paymentList from "../../data/grade";
import { ChevronRight } from "lucide-react";
import PaymentType from "./payment_type";
import { generateVAPayment, createEwalletPayment, generateRetailPayment, createQrisPayment } from "../../network/network.js";
import { ChoosedPaymentModel } from "../../data/models/ChoosedPaymentModel";
import { useData } from "../../context/PaymentDetailContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const [month, setMonth] = useState(1);
  const [isPaymentTypeDialogOpen, setIsPaymentTypeDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { id } = params;
  const data = paymentList.find((plan) => plan.name === id);
  const price = data ? data.price * month : 0;
  const [choosedPayment, setChoosedPayment] = useState<ChoosedPaymentModel>();
  const router = useRouter();
  const {setData} = useData();

  const handlePayment = async () => {
    if (!choosedPayment?.item_code || !choosedPayment?.tipe_id) {
      alert("Lengkapi metode payment");
      return;
    }

    setIsLoading(true);
    const response = await createPayment(choosedPayment?.tipe_id ?? "", choosedPayment?.item_code ?? "", price ?? 0);
    setIsLoading(false);
    if(response){
      setData(response);
      router.push("/payment/code");
    }
  };

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
            <p>Harga per bulan</p>
            <p>{formatToIDR(data?.price ?? 0)}</p>
          </div>
          <div className="flex flex-row justify-between space-x-5">
            <p>Biaya Langganan</p>
            <p>{formatToIDR(price)}</p>
          </div>
          {choosedPayment ? (
            <div className="flex flex-col">
              <div className="flex flex-row justify-between space-x-5">
                <p>Metode pembayaran dipilih</p>
                <p>{choosedPayment.tipe_name}</p>
              </div>
            </div>
          ) : (
            <div />
          )}
          <div className="w-full flex flex-row justify-between mt-3">
            <p className="flex flex-1 text-sm">Pilih metode pembayaran</p>
            <button onClick={() => setIsPaymentTypeDialogOpen(true)}>
              <div className="flex items-center text-white font-medium">
                <span className="text-sm">{choosedPayment?.item_name}</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </button>
          </div>
          <div className="w-full mt-4 flex flex-row justify-end">
            <button onClick={handlePayment} className="bg-green-500 text-white w-28 rounded">
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
        onConfirm={(data) => {
          if (data) {
            setChoosedPayment(data);
          }
          setIsPaymentTypeDialogOpen(false);
        }}
      />

      {/* Pop-up Loading */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-dotted animate-spin rounded-full"></div>
            <p className="mt-4 text-gray-700">Processing Payment...</p>
          </div>
        </div>
      )}
    </div>
  );
}

const createPayment = async (id: string, item_id: string, nominal: number) => {
  try {
    console.log(`id: ${id} item_id: ${item_id} nominal: ${nominal}`);
    let response;
    if (id === "ewallet") {
      response = await createEwalletPayment(nominal, item_id);
    } else if (id === "qris") {
      response = await createQrisPayment(nominal);
    } else if (id === "retail") {
      response = await generateRetailPayment(item_id, nominal, "ihp test payment");
    } else if (id === "va") {
      response = await generateVAPayment(nominal, item_id, "ihp_test");
    }
    return response;
  } catch (err) {
    alert(`${err}`);
  }
};
