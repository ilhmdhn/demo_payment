"use client";

import { useState } from "react"
import { useParams } from "next/navigation";
import {formatToIDR} from "../../tools/currency";
import paymentList from "../../data/grade";

export default function Page(){
    const [month, setMonth] = useState(1);
    const params = useParams();
    const { id } = params;
    const data = paymentList.filter(plan => plan.name == id)[0];
    const price = data.price * month;

    return(
        <div className="w-screen h-screen flex items-center justify-center bg-black text-white p-6">
            <div className="max-w-4xl w-full bg-[rgb(24,24,24)] p-8 rounded-lg flex flex-row justify-between">
                <div className="flex-1">
                    <div className="flex flex-col items-stretch w-24">
                            <p>Jumlah bulan</p>
                            <p className="text-center">{month}</p>
                            <div className="flex flex-row justify-between px-2">
                            <div className="bg-slate-500 px-2 rounded-lg">
                                <button onClick={()=>{
                                    if(month>1){
                                        setMonth(month - 1);
                                    }
                                }}>
                                    -
                                </button>
                            </div>
                            <div className="bg-slate-500 px-2 rounded-lg">
                                <button onClick={()=>setMonth(month + 1)}>
                                    +
                                </button>
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
                        <p>Rincian Pembayaran</p>
                        <p>{formatToIDR(price)}</p>
                    </div>
                    <button className="button-">
                        Pay
                    </button>
                </div>
            </div>
        </div>
    )
}