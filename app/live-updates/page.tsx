import React from 'react'
import {CustomNav} from '@/components/ui/customnav'
import { Update } from '@/db/types'
import Image from 'next/image'

const updates : Update[] = [
    {
        updateID: "001",
        date: "2023-10-01",
        title: "New Committee Established",
        content: "A new committee has been established to address global climate change.",
        href: "none",
    },
    {
        updateID: "002",
        date: "2023-10-02",
        title: "Resolution Passed",
        content: "A resolution has been passed to enhance international cooperation on cybersecurity.",
        href: "none",
    },
    {
        updateID: "003",
        date: "2023-10-03",
        title: "Special Session Scheduled",
        content: "A special session has been scheduled to discuss the ongoing humanitarian crisis in region X.",
        href: "none",
    },
]
const Page = () => {
  return (
    <div>
        <CustomNav />
        <div className="h-screen text-white">
            <h1 className="text-6xl font-bold text-center p-4">Live Updates</h1>

            <ul className="space-y-4 p-4 mx-8">
                {updates.map((update, index) => (
                    <li key={update.updateID} 
                        className={`outline outline-gray-800 p-4 w-full h-[30rem] rounded-lg shadow-md flex items-center ${index % 2 !== 0 ? 'flex-row-reverse' : ''} transition-transform duration-300 hover:scale-102`}>
                        <div className='w-1/2 px-4 text-center'>
                            <h2 className="text-2xl font-semibold mb-2">{update.title}</h2>
                            <p className="text-gray-400 mb-2">{new Date(update.date).toLocaleDateString()}</p>
                            <p className="text-lg">{update.content}</p>
                        </div>
                        <div className='w-1/2 flex justify-center'>
                            <Image
                                src="/images/UN.jpg"
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