"use client";
import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../context/usercontext';
import {CustomNav} from '@/components/ui/customnav';

const page = () => {

    const { currentUser } = useUser();  
    const router = useRouter();

  return (
    <div className='min-h-screen items-center justify-center bg-black text-white'>

        <header className='text-center border-b border-gray-800'>
            <h1 className="p-4 text-4xl font-extrabold font-serif">
                Committee Overview
            </h1>
            <h4 className='p-2 text-xl font-light font-serif'>
                UNSC - United Nations Security Council
            </h4>
        </header>

        <main>
            <section className="w-full mb-8 block">
                <CustomNav/>
            </section>
            <div>



            </div>
        </main>

    </div>
  )
}

export default page