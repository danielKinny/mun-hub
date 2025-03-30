"use client";
import React, { useEffect } from 'react'
import { CustomNav } from '@/components/ui/customnav'
import { speeches } from '@/app/db/index'
import { useSession } from '../context/sessionContext'
import { Speech } from '@/app/db/types'
import ProtectedRoute from '@/components/protectedroute';



const page = () => {
    const { user: currentUser } = useSession(); 
    const [selectedSpeech, setSelectedSpeech] = React.useState<Speech | null>(null);
    const [text, setText] = React.useState<string>('');
    const [speechTitle, setSpeechTitle] = React.useState<string>('');

    useEffect(() => {
        if (selectedSpeech) {
            setText(selectedSpeech.content);
        } else {
            setText('');
        }
    }, [selectedSpeech]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleSpeechChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSpeechTitle(e.target.value);
    };

    const handleAddSpeech = async () => {
        
        if (!speechTitle || !text || !currentUser?.id) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            let newSpeech : Speech = {
                speechID: `${currentUser.id}-${speeches.filter(speech => speech.speechID.substring(0, 4) === currentUser.id).length + 1}`,
                title: speechTitle,
                content: text,
            }

            const response = await fetch('/api/speeches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    speechID: `${currentUser.id}-${speeches.filter(speech => speech.speechID.substring(0, 4) === currentUser.id).length + 1}`,
                    title: speechTitle,
                    content: text,
                }),
            });

            if (response.ok) {
                await response.json();
                setSpeechTitle('');
                setText('');
            } else {
                await response.json();
            }
        } catch (error) {
            alert('Failed to add speech.');
        }
    };

    return (
        <ProtectedRoute>
            <div className='bg-black text-white min-h-screen'>
                <header>
                    <h1 className='text-4xl text-center p-4 border-b border-gray-800'>Speech Repository {currentUser?.flag}</h1>
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
                                                    <li 
                                                        key={speech.speechID} 
                                                        className='p-2 border-b border-gray-700 cursor-pointer transition-transform hover:scale-105'
                                                        onClick={() => setSelectedSpeech(speech)}
                                                    >
                                                        <h3 className='text-xl'>{speech.title}</h3>
                                                        <p>{speech.content}</p>
                                                    </li>
                                                ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className='w-full pr-8 items-center justify-center'>
                            <div>
                                <h2 className='text-2xl text-center p-4 border-b border-gray-800'>
                                    Speech Interface
                                </h2>
                                <textarea 
                                className=' w-full p-4 bg-gray-800 rounded-lg text-white h-12'
                                value={speechTitle}
                                onChange={handleSpeechChange}
                                placeholder='Write your speech title here...'
                                style={{ resize: 'none' }}
                                >
                                </textarea>

                                <textarea className='w-full p-4 bg-gray-800 rounded-lg text-white mt-4'
                                value={text}
                                onChange={handleTextChange}
                                placeholder='Write your speech here...'>

                                </textarea>
                            </div>
                            <div className='flex justify-center items-center mt-4'>
                                <button 
                                className='min-w-50 bg-white text-black p-4 rounded-lg cursor-pointer'
                                onClick={() => handleAddSpeech()} >
                                    Add
                                </button>
                            </div>
                            
                        </section>

                    </section>
                </main>

            </div>
        </ProtectedRoute>
    )
}

export default page
