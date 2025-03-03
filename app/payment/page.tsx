"use client";

import { useState } from "react"

export default function Page(){

    const [month, setMonth] = useState(0);

    return(
        <div className="w-screen h-screen flex items-center justify-center bg-black text-white p-6">
            <div className="max-w-4xl w-full bg-[rgb(24,24,24)] p-8 rounded-lg flex flex-row justify-between">
                <div className="flex flex-col">
                    <p>Jumlah bulan</p>
                    <p className="text-center">{month}</p>
                    <div className="flex flex-row justify-between px-2">
                        <div className="bg-slate-500 px-2 rounded-lg">
                            <button onClick={()=>setMonth(month - 1)}>
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
                <div className="flex flex-col">
                    <p>Rincian Pembayaran</p>
                </div>
            </div>
        </div>
    )
}