"use client";
import { useState } from "react";
import paymentList from "../../data/payment_type";
import { ChevronRight } from "lucide-react";
import {getVaList} from "../../network/network";

interface PaymentType {
  isOpen: boolean;
  price: number;
  month: number;
  onClose: () => void;
  onConfirm: () => void;
}

interface PaymentMethod {
  id: string;
  name: string;
}

export default function PaymentDialog({ isOpen, price, month, onClose, onConfirm }: PaymentType) {
  if (!isOpen) return null;

  const data = paymentList;

  // const [isLoading, setLoading] = useState(true);
 
  const [methodList, setMethodList] = useState<PaymentMethod[]>([]);
  
  const setListPayment = async (method: string) => {
    setMethodList([]); // Reset sebelum menambahkan data baru

    if (method === "ewallet") {
      const newList = data[0]?.list || [];

      const updatedList: PaymentMethod[] = newList.map((value) => ({
        id: value.code,
        name: value.name
      }));

      setMethodList(updatedList);
    } else if (method === "qris") {
      const itemQr: PaymentMethod = {
        id: 'qris',
        name: 'QRIS'
      }
      setMethodList([itemQr]);
    }else if(method === 'va' ){
      const data = await getVaList();
      console.log(data)
      const updatedList: PaymentMethod[] = data.map((value)=>({
        id: value.code,
        name: value.name
      }));
      setMethodList(updatedList);
    }else if(method === 'retail'){
      const newList = data[2]?.list||[];

      const updatedList: PaymentMethod[] = newList.map((value) => ({
        id: value.code,
        name: value.name
      }));

      setMethodList(updatedList);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[rgb(24,24,24)] text-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-semibold">Pilih metode pembayaran</h2>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p>Metode pembayaran:</p>
            <div className="flex">
              <div className="flex flex-col w-48 items-start mt-3">
                {
                  data.map((paymentType)=>(
                    <button key={paymentType.id} onClick={() => setListPayment(paymentType.id)}>
                      <div className="flex justify-between items-center">
                        <p>{paymentType.name}</p>
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </div>
                    </button>
                  ))
                }
              </div>
              <div className="flex flex-col mt-3 w-60 items-start">
                <p>Metode tersedia</p>
                {
                  methodList.map((method)=>(
                    <button key={method.id}>
                      <div className="flex flex-col justify-start">
                        <p className="text-start">{method.name}</p>
                      </div>
                    </button>
                  ))
                }

              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="bg-red-500 px-4 py-2 rounded" onClick={onClose}>
            Batal
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onConfirm}>
            Pilih
          </button>
        </div>
      </div>
    </div>
  );
}
