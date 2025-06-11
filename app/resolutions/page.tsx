"use client";
import React from 'react'
import ProtectedRoute from '@/components/protectedroute'
import { useSession } from '../context/sessionContext'
import isDelegate from '@/lib/isdelegate';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Page = () => {
  const { user: currentUser } = useSession();

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your resolution...</p>',
  });

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="cursor-pointer text-7xl font-extrabold text-white text-center transition-all">
          RESOLUTIONS
        </h1>
        <div className="w-full h-[80vh] max-w-2xl mt-8 bg-black text-white outline outline-gray-800 roundedshadow p-4">
          <EditorContent editor={editor} />
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Page;