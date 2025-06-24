"use client";
import React, {useEffect} from 'react'
import {CustomNav} from '@/components/ui/customnav'
import { Update } from '@/db/types'
import Image from 'next/image'
import { useSession } from '../context/sessionContext'
import { ProtectedRoute } from '@/components/protectedroute'
import { useMobile } from '@/hooks/use-mobile'

const Page = () => {
    const {user: currentUser}= useSession();
    const [updates, setUpdates] = React.useState<Update[]>([]);
    const role =  currentUser && ('delegateID' in currentUser ? 'delegate' : 'chairID' in currentUser ? 'chair' : 'admin');
    const isMobile = useMobile();
    
    useEffect( () => {
        const fetchUpdates = async () => {
            try {
                const res = await fetch('/api/updates');
                const data = await res.json();
                if (res.ok) {
                    console.log("Successfully fetched updates:", data);
                    
                    data.forEach((update: Update) => {
                        if (update.href) {
                            console.log(`Update ${update.updateID} has image URL: ${update.href}`);
                        } else {
                            console.warn(`Update ${update.updateID} has no image URL`);
                        }
                    });
                    
                    setUpdates(data);
                }
                else {
                    console.error("Failed to fetch updates:", data);
                }
            } catch (error) {
                console.error("Error fetching updates:", error);
            }
        }

        fetchUpdates();
    },[]);

  return (
    <ProtectedRoute>
        <CustomNav role={role ? role : "delegate"} activeLink="live-updates" />
        <div className="min-h-screen text-white pb-8 bg-black">
            <h1 className="text-4xl md:text-6xl font-bold text-center p-4">Live Updates</h1>

            <ul className="space-y-8 p-2 md:p-4 mx-2 md:mx-8">
                {updates.map((update, index) => (
                    <li key={update.updateID} 
                        className={`group outline outline-gray-800 p-3 md:p-4 w-full h-auto md:h-[30rem] rounded-lg shadow-md flex flex-col ${isMobile ? '' : index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} cursor-pointer transform transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl hover:outline-gray-600`}>
                        <div className={`w-full md:w-1/2 px-2 md:px-4 text-center ${isMobile ? 'mb-4' : ''}`}>
                            <h2 className="text-xl md:text-2xl text-white font-semibold mb-2">{update.title}</h2>
                            <p className="text-gray-400 mb-2 text-sm md:text-base">{new Date(update.time.slice(0,10)).toLocaleDateString() + " " + new Date(update.time).toLocaleTimeString()}</p>
                            <p className="text-base md:text-lg">{update.content}</p>
                        </div>
                        <div className='w-full md:w-1/2 flex justify-center'>
                            {update.href ? (
                                <Image
                                    src={update.href}
                                    alt="Update Image"
                                    width={500}
                                    height={700}
                                    className="rounded-lg object-cover shadow-md transition-all duration-300 max-h-[300px] md:max-h-[500px] w-auto"
                                    onError={(e) => {
                                        console.error("Error loading image:", update.href);
                                        e.currentTarget.src = "/images/placeholder.jpg";
                                    }}
                                />
                            ) : (
                                <div className="flex items-center justify-center bg-gray-800 rounded-lg w-full h-[300px]">
                                    <p className="text-gray-400">No image available</p>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            
        </div>
    </ProtectedRoute>
  )
}

export default Page;