"use client";
import React, {useEffect, useState} from 'react'
import ProtectedRoute from '@/components/protectedroute'
import { useSession } from '../context/sessionContext'
import isDelegate from '@/lib/isdelegate';
import { Editor } from '@tiptap/react'
import { SimpleEditor } from '../../components/tiptap-templates/simple/simple-editor'

const Page = () => {
  const { user: currentUser } = useSession();
  const editorRef = React.useRef<Editor | null>(null)
  const [fetchedResos, setFetchedResos] = useState<any[]>([]);
  // Example: fetchedContent would come from your database
  useEffect( () => {
    const fetchResos = async () => {
      const res = await fetch(`/api/resos/delegate?delegateID=${isDelegate(currentUser) ? currentUser?.delegateID : '0000'}`);
      if (!res.ok) {
        console.error('Failed to fetch resolutions');
        return;
      }
      const data = await res.json();
      setFetchedResos(data);
      console.log(data[0])
    }

    fetchResos();

  }, [currentUser]);


  const postReso = async () => {
    if (!editorRef.current) {
      console.error('Editor not initialized');
      return;
    }

    const content = editorRef.current.getJSON();
    const res = await fetch('/api/resos/delegate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        delegateID: isDelegate(currentUser) ? currentUser?.delegateID : '0000',
      }),
    });

    if (!res.ok) {
      console.error('Failed to post resolution');
      return;
    }

    const data = await res.json();
    console.log('Resolution posted:', data);
    
  }



  const handlePrintContent = () => {
    //using this for logging
    const text = "<h1>Write your resolution here !</h1><p>placeholder cos idk what to say</p><ol><li><p>hahaha</p></li><li><p>hehehe</p></li><li><p>hohoho</p></li></ol><blockquote><p>this </p><p>is </p><p>going to be a list</p></blockquote><p><strong>does</strong> <em>this</em> <s>work</s></p> page.tsx:15:14"
    if (editorRef.current) {
      console.log(JSON.stringify(editorRef.current.getJSON()))
    } else {
      console.log('Editor not ready')
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="cursor-pointer text-7xl font-extrabold text-white text-center transition-all">
          RESOLUTIONS
        </h1>
        <div className="w-full h-[80vh] max-w-2xl mt-8 bg-black text-white outline outline-gray-800 rounded shadow p-4">
          <SimpleEditor ref={editorRef} content={fetchedResos[0]?.content}/>
        </div>
        <button onClick={handlePrintContent} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Print Content</button>
      </div>
    </ProtectedRoute>
  )
}

export default Page;