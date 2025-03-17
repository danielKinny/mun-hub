"use client";
import React, { useEffect } from 'react'
import { CustomNav } from '@/components/ui/customnav'
import { speeches } from '@/app/db/index'
import { useSession } from '../context/sessionContext'
import { useRouter } from 'next/navigation'
import { Speech } from '@/app/db/types'
import ProtectedRoute from '@/components/protectedroute';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill-new';
import "react-quill-new/dist/quill.snow.css";


const page = () => {
    const { user: currentUser } = useSession();
    const [editorContent, setEditorContent] = React.useState('');

    return (
        <ProtectedRoute>
            <div className='bg-black text-white min-h-screen'>
                <header>
                    <h1 className='text-4xl text-center p-4 border-b border-gray-800'>Speech Repository for {currentUser?.firstname}</h1>
                </header>

                <main>
                    <section>
                        <CustomNav />
                    </section>

                    <section className='flex'>

                        <section className='p-6 w-1/3'>
                            <div className="m-4 rounded-lg p-4 bg-gray-900">
                                <h2 className='text-2xl font-semibold mb-4 text-center'>Speeches</h2>
                                <div className='h-96 overflow-y-auto bg-gray-800 p-4 rounded-lg'>
                                    <ul>
                                        {
                                            speeches.filter(speech => speech.speechID.substring(0, 4) === currentUser?.id)
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

                        <section className='w-full pr-8 '>
                            <div>
                                <h2 className='text-2xl text-center p-4 border-b border-gray-800'>
                                    Speech Interface
                                </h2>
                                <ReactQuill
                                value={editorContent}
                                onChange={setEditorContent}
                                theme="snow"
                                className= "w-full bg-white text-blackh-96 p-4 rounded-lg"
                                />
                            </div>
                        </section>

                    </section>
                </main>

            </div>
        </ProtectedRoute>
    )
}

export default page