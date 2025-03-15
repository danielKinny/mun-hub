"use client";
import React, { useEffect } from 'react'
import {CustomNav} from '@/components/ui/customnav'
import {speeches} from '@/app/db/index'
import {useUser} from '../context/usercontext'
import {useRouter} from 'next/navigation'
import {Speech} from '@/app/db/types'

const page = () => {
    const {currentUser} = useUser()
    const router = useRouter()

    useEffect(() => {
        if (!currentUser) {
          router.push("/login");
        }
      }, [currentUser, router]);
    
      if (!currentUser) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            Loading...
          </div>
        );
      }

  return (
    <div className='bg-black text-white min-h-screen'>
        <header>
            <h1 className='text-4xl text-center p-4 border-b border-gray-800'>Speech Repository</h1>
        </header>

        <main>
            <section>
                <CustomNav/>
            </section>

            <section>

                <div className= " m-4 rounded-lg p-4 w-1/3 bg-gray-800">
                    <h2 className='text-2xl font-semibold mb-4 text-center'>Speeches</h2>
                    <div className='h-96 overflow-y-auto'>
                        <ul>
                            {speeches.filter(speech => speech.speechID.substring(0, 3) === currentUser.id)
                                    .map((speech) => (
                                        <li key={speech.speechID} className='p-2 border-b border-gray-700'>
                                            <h3 className='text-xl'>{speech.title}</h3>
                                            <p>{speech.content}</p>
                                        </li>
                                    ))}
                        </ul>
                    </div>
                </div>

            </section>
        </main>
        
    </div>
  )
}

export default page