"use client";

import Image from 'next/image';
import { Mona_Sans } from 'next/font/google';
import {CheckIcon, CheckCircledIcon, CrossCircledIcon} from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import {formatToIDR} from './tools/currency';
import paymentList from "./data/grade";

const monaFont = Mona_Sans({
    subsets: ['latin'],
    display: 'swap',
    weight: '600'
});


export default function Page(){
    const Router = useRouter()    
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white p-6">
        <div className="max-w-4xl w-full bg-[#181818] p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Choose the plan thats right for you</h2>
          <div className='flex flex-row justify-start items-center'>
            <CheckIcon color='red'/>
            <p className="text-sm text-gray-300">Play 60K+ song ad-free.</p>
          </div>
          <div className='flex flex-row justify-start items-center'>
            <CheckIcon color='red'/>
            <p className="text-sm text-gray-300">1080p - 4K videos resolution</p>
          </div>
          <div className='h-3'/>
          <div className='flex flex-row'>
            <div className='space-y-5'>
                <div className='h-31'>
                    <Image
                        src="/happy_puppy.png"
                        width={125}
                        height={125}
                        alt="Picture of the author"
                    />
                </div>
                <div className='flex flex-row items-center space-x-2'>
                    <div className='w-4 h-4'>
                            <Image
                                src={'/hd.png'}
                                height={128}
                                width={128}
                                alt='stb'
                            />
                        </div>
                    <p className={`${monaFont.className} text-xs`}>
                        HD Videos Resolution
                    </p>
                </div>
                    <div className='flex flex-row items-center space-x-2'>
                        <div className='w-4 h-4'>
                            <Image
                                src={'/stb.png'}
                                height={128}
                                width={128}
                                alt='stb'
                            />
                        </div>
                        <p className={`${monaFont.className} text-xs`}>Set Top Box</p>
                </div>
                    <div className='flex flex-row items-center space-x-2'>
                        <div className='w-4 h-4'>
                            <Image
                                src={'/limit.png'}
                                height={128}
                                width={128}
                                alt='stb'
                            />
                        </div>
                    <p className={`${monaFont.className} text-xs`}>
                        Limit Download
                    </p>
                </div>
                    <div className='flex flex-row items-center space-x-2'>
                        <div className='w-4 h-4'>
                            <Image
                                src={'/support.png'}
                                height={128}
                                width={128}
                                alt='stb'
                            />
                        </div>
                        <p className={`${monaFont.className} text-xs`}>24h Support</p>
                    </div>
                <div className='flex flex-row items-center space-x-2'>
                    <div className='w-4 h-4'>
                            <Image
                                src={'/4k.png'}
                                height={128}
                                width={128}
                                alt='stb'
                            />
                        </div>
                    <p className={`${monaFont.className} text-xs`}>4K resolution</p>
                </div>
                    <div className='flex flex-row items-center space-x-2'>
                    <div className='w-4 h-4'>
                            <Image
                                src={'/block.png'}
                                height={128}
                                width={128}
                                alt='stb'
                            />
                        </div>
                    <p className={`${monaFont.className} text-xs`}>Ads Free</p>
                </div>
            </div>
            <div className='w-12'/>
            {
                paymentList.map((plan)=>(
                    <div key={plan.name} className='mr-4 space-y-5 flex flex-col items-center hover:bg-gray-800 hover:scale-105 hover:rounded-lg p-2'>
                        <div className='h-31 flex flex-col items-center'>
                            <p>{plan.name}</p>
                            <p>{formatToIDR(plan.price)}</p>
                        </div>
                            {plan.ads ? <CheckCircledIcon color='red'/> : <CrossCircledIcon color='red'/>}
                            {plan.stb ? <CheckCircledIcon color='red'/> : <CrossCircledIcon color='red'/>}
                            {plan.limit_download ? <CheckCircledIcon color='red'/> : <CrossCircledIcon color='red'/>}
                            {plan.support ? <CheckCircledIcon color='red'/> : <CrossCircledIcon color='red'/>}
                            {plan.ultra_hd ? <CheckCircledIcon color='red'/> : <CrossCircledIcon color='red'/>}
                            {plan.ads ? <CheckCircledIcon color='red'/> : <CrossCircledIcon color='red'/>}
                            <button onClick={()=> Router.push(`/payment/${plan.name}`) } className="bg-red-600 px-3 mx-6 py-2 rounded text-sm text-white font-semibold">Choose Plan</button>
                    </div>               
                ))
            }
        </div>
      </div>
    </div>
  );
}