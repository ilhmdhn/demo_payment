"use client";
import { useState } from "react";
import paymentList from "../../data/payment_type";
import { ChevronRight } from "lucide-react";
import { getVaList } from "../../network/network";
import { ChoosedPaymentModel } from "../../data/models/ChoosedPaymentModel";


interface PaymentType {
  isOpen: boolean;
  price: number;
  month: number;
  onClose: () => void;
  onConfirm: (selectedMethod: ChoosedPaymentModel | undefined) => void;
}

interface PaymentMethod {
  id: string;
  name: string;
}

interface PaymentTypeMethod {
  id: string;
  name: string;
}

export default function PaymentDialog({ isOpen, price, month, onClose, onConfirm }: PaymentType) {
  if (!isOpen) return null;

  const data = paymentList;
  const [methodList, setMethodList] = useState<PaymentMethod[]>([]);
  const [choosedMethod, setChoosedMethod] = useState<ChoosedPaymentModel | undefined>(undefined);
  const [typePayment, settypePayment] = useState<PaymentTypeMethod>();
  
  const setPaymentType = (id: string, name: string) => {
    settypePayment({id: id, name: name});
    setListPayment(id);
  };

  const setListPayment = async (method: string) => {
    setMethodList([]);

    if (method === "ewallet") {
      const newList = data[0]?.list || [];
      setMethodList(newList.map((value) => ({ id: value.code, name: value.name })));
    } else if (method === "qris") {
      setMethodList([{ id: "qris", name: "QRIS" }]);
    } else if (method === "va") {
      const data = await getVaList();
      // setMethodList(data.map((value) => ({ id: value.code, name: value.name })));
      setMethodList(data.map((value: { code: string; name: string }) => ({ id: value.code, name: value.name })));
    } else if (method === "retail") {
      const newList = data[2]?.list || [];
      setMethodList(newList.map((value) => ({ id: value.code, name: value.name })));
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
                <ul>
                  {data.map((paymentType) => (
                    <li className="border-dotted" key={paymentType.id}>
                      <button onClick={() => setPaymentType(paymentType.id, paymentType.name)}>
                        <div className="flex justify-between items-center">
                          <p>{paymentType.name}</p>
                          <ChevronRight className="w-5 h-5 ml-1" />
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col mt-3 w-60 items-start">
                <p>Metode tersedia</p>
                {methodList.map((method) => (
                  <button
                    key={method.id}
                    onClick={() =>
                      setChoosedMethod({
                        tipe_id: typePayment?.id??'',
                        tipe_name: typePayment?.name??'',
                        item_code: method.id,
                        item_name: method.name,
                      })
                    }
                  >
                    <div className="flex flex-col justify-start">
                      <p
                        className={`text-start ${
                          choosedMethod?.item_code === method.id ? "bg-white text-black" : "bg-[rgb(24,24,24)]"
                        }`}
                      >
                        - {method.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="bg-red-500 px-4 py-2 rounded" onClick={onClose}>
            Batal
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => onConfirm(choosedMethod)}>
            Pilih
          </button>
        </div>
      </div>
    </div>
  );
}
