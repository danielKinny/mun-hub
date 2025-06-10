"use client";
import React, {useEffect} from 'react'
import {CustomNav} from '@/components/ui/customnav'
import { Update } from '@/db/types'
import Image from 'next/image'
import { useSession } from '../context/sessionContext'
import { AdminNav } from '@/components/ui/adminnav'
const Page = () => {
    const {user: currentUser}= useSession();
    const [updates, setUpdates] = React.useState<Update[]>([]);
    const isAdmin = 'adminID' in (currentUser || {});
    useEffect( () => {
        const fetchUpdates = async () => {
            const res = await fetch('/api/updates');
            const data = await res.json();
            if (res.ok) {
                setUpdates(data);
                console.log(data);
            }
            else {
                console.error("Failed to fetch updates:", data);
            }
        }

        fetchUpdates();
    },[]);

  return (
    <div>
        {isAdmin ? <AdminNav/> : <CustomNav />}
        <div className="h-screen text-white">
            <h1 className="text-6xl font-bold text-center p-4">Live Updates</h1>

            <ul className="space-y-4 p-4 mx-8">
                {updates.map((update, index) => (
                    <li key={update.updateID} 
                        className={`outline outline-gray-800 p-4 w-full h-[30rem] rounded-lg shadow-md flex items-center ${index % 2 !== 0 ? 'flex-row-reverse' : ''} transition-transform duration-300 hover:scale-102`}>
                        <div className='w-1/2 px-4 text-center'>
                            <h2 className="text-2xl text-white font-semibold mb-2">{update.title}</h2>
                            <p className="text-gray-400 mb-2">{new Date(update.time.slice(0,10)).toLocaleDateString() + " " + new Date(update.time).toLocaleTimeString()}</p>
                            <p className="text-lg">{update.content}</p>
                        </div>
                        <div className='w-1/2 flex justify-center'>
                            <Image
                                src={update.href}
                                alt="Update Image"
                                width={500}
                                height={700}
                                className="rounded-lg object-cover shadow-md"
                            />
                        </div>
                    </li>
                ))}
            </ul>
            
        </div>
    </div>
  )
}

export default Page;