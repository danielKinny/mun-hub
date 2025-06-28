"use client";
import React, {useEffect} from 'react'
import { Update } from '@/db/types'
import Image from 'next/image'
import { ProtectedRoute } from '@/components/protectedroute'
import { useMobile } from '@/hooks/use-mobile'

const Page = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [updates, setUpdates] = React.useState<Update[]>([]);
    const isMobile = useMobile();
    
    useEffect( () => {
        const fetchUpdates = async () => {
            try {
                setIsLoading(true);
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
            } finally {
                setIsLoading(false);
            }
        }

        fetchUpdates();
    },[]);

  return (
    <ProtectedRoute>
        <div className="min-h-screen text-white pb-8 bg-black">
            <h1 className="text-4xl md:text-6xl font-bold text-center p-4 animate-fadein bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Live Updates
            </h1>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 animate-fadein-up">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                    <p className="text-xl text-gray-400 animate-pulse">Loading updates...</p>
                </div>
            ) : (
                <ul className="space-y-8 p-2 md:p-4 mx-2 md:mx-8 animate-fadein-up">
                    { updates.length > 0 ? (updates.map((update, index) => (
                    <li key={update.updateID} 
                        className={`group outline outline-gray-800 p-3 md:p-4 w-full h-auto md:h-[30rem] rounded-lg shadow-md flex flex-col ${isMobile ? '' : index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} cursor-pointer transform transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl hover:outline-gray-600 animate-slidein-up hover-interactive`}
                        style={{animationDelay: `${index * 0.1}s`}}>
                        <div className={`w-full md:w-1/2 px-2 md:px-4 text-center ${isMobile ? 'mb-4' : ''} animate-text-pop`}
                             style={{animationDelay: `${index * 0.1 + 0.2}s`}}>
                            <h2 className="text-xl md:text-2xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-bold mb-2">{update.title}</h2>
                            <p className="text-gray-400 mb-2 text-sm md:text-base">{new Date(update.time.slice(0,10)).toLocaleDateString() + " " + new Date(update.time).toLocaleTimeString()}</p>
                            <p className="text-base md:text-lg">{update.content}</p>
                        </div>
                        <div className='w-full md:w-1/2 flex justify-center animate-slidein-left'
                             style={{animationDelay: `${index * 0.1 + 0.3}s`}}>
                            {update.href ? (
                                <Image
                                    src={update.href}
                                    alt="Update Image"
                                    width={500}
                                    height={700}
                                    className="rounded-lg object-cover shadow-md transition-all duration-300 max-h-[300px] md:max-h-[500px] w-auto hover-interactive"
                                    onError={(e) => {
                                        console.error("Error loading image:", update.href);
                                        e.currentTarget.src = "/images/placeholder.jpg";
                                    }}
                                />
                            ) : (
                                <div className="flex items-center justify-center bg-gray-800 rounded-lg w-full h-[300px] animate-fadein">
                                    <p className="text-gray-400">No image available</p>
                                </div>
                            )}
                        </div>
                    </li>
                ))): (
                    <div className="animate-fadein-up">
                        <p className="text-center text-gray-400">No updates available at the moment.</p>
                    </div>
                )}
                </ul>
            )}
            
        </div>
    </ProtectedRoute>
  )
}

export default Page;