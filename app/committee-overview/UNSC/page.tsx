"use client";
import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../context/usercontext';
import {CustomNav} from '@/components/ui/customnav';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

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
            <section className="flex flex-wrap items-center justify-center">
                <div className='text-center w-1/2 p-4'>
                    <p>
                        The United Nations Security Council (UNSC) is one of the principal organs of the United Nations and is charged with the maintenance of international peace and security.
                                            </p>
                                            <br/>
                                            <p>
                                                The Security Council consists of fifteen members, including five permanent members—China, France, Russia, the United Kingdom, and the United States—and ten non-permanent members elected for two-year terms.
                                            </p>
                                            <br/>
                                            <p>
                                                The Council's powers include the establishment of peacekeeping operations, the authorization of military action, and the imposition of sanctions.
                                            </p>
                                            <br/>
                                            <p>
                                                It is the only UN body with the authority to issue binding resolutions on member states.
                    </p>
                </div>
            </section>
        </main>

    </div>
  )
}

export default page