"use client";
import React from 'react'
import {AdminRoute} from '@/components/protectedroute'
import { CustomNav } from '@/components/ui/customnav'
import supabase from '@/lib/supabase'
import {toast} from 'sonner'
import { useSession } from '../context/sessionContext'
const Page = () => {
    const [content, setContent] = React.useState<string>("");
    const [title, setTitle] = React.useState<string>("");
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [error, setError] = React.useState<string>("");
    const { user: currentUser } = useSession();
    const role = currentUser && ('delegateID' in currentUser ? 'delegate' : 'chairID' in currentUser ? 'chair' : 'admin')

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }
    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    }

    const handleAddUpdate = async () => {
        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }
        
        if (!content.trim()) {
            toast.error("Content is required");
            return;
        }
        
        if (!selectedFile) {
            toast.error("Image file is required");
            return;
        }

        try {
            const timestamp = new Date().getTime();
            const fileExtension = selectedFile.name.split('.').pop();
            const safeFileName = `update_${timestamp}.${fileExtension}`;
            
            const imageFilePath = `/images/updates/${safeFileName}`;
            
            const { error: dbError } = await supabase
                .from('Updates')
                .insert({
                    updateID: `update_${timestamp}`,
                    title: title,
                    content: content,
                    time: new Date().toISOString(),
                    href: imageFilePath,
                })
                .select();
                
            if (dbError) {
                throw new Error(dbError.message);
            }

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('filename', safeFileName);
            
            const uploadResponse = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });
            
            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.message || 'Failed to upload image');
            }
            setTitle("");
            setContent("");
            setSelectedFile(null);
            toast.success("Update added successfully!");
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) fileInput.value = "";
            
        } catch (error) {
            console.error('Error adding update:', error);
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }

  return (
    <AdminRoute>
      <CustomNav role={role ? role : 'delegate'} activeLink="admin" />
      <div className="flex flex-col items-center justify-center min-h-screen text-white p-8">
        {error && (
          <div className="w-full max-w-4xl mb-6 p-4 bg-red-600 rounded-lg text-white animate-slidein-up">
            <p className="font-semibold">{error}</p>
          </div>
        )}
        
        <div className="flex flex-wrap items-start justify-center gap-6 w-full max-w-4xl animate-slidein-up" style={{animationDelay: '0.1s'}}>
          <div className='text-white flex flex-col animate-fadein' style={{animationDelay: '0.2s'}}>
            <p className="mb-2 font-medium animate-text-pop" style={{animationDelay: '0.3s'}}>Upload Image</p>
            <input 
              type="file" 
              accept="image/*" 
              className='p-2 rounded-lg cursor-pointer outline outline-gray-800 bg-gray-900 w-full mb-2 hover:animate-wiggle focus:animate-focus-scale-bounce transition-all duration-300 animate-fadein' 
              style={{animationDelay: '0.4s'}}
              onChange={handleFileChange}
            />
            {selectedFile && (
              <div className="mt-2 animate-fadein-up">
                <p className="text-sm text-gray-300">Selected: {selectedFile.name}</p>
              </div>
            )}
          </div>
          
          <div className='flex flex-col flex-1 animate-fadein' style={{animationDelay: '0.2s'}}>
            <p className="mb-2 text-2xl font-bold text-center animate-text-pop" style={{animationDelay: '0.3s'}}>Title</p>
            <textarea 
              className='p-4 rounded-lg outline outline-gray-800 bg-gray-900 text-white resize-none h-[10rem] hover:scale-102 focus:animate-focus-scale-bounce transition-transform animate-fadein-up' 
              style={{animationDelay: '0.4s'}}
              value={title} 
              placeholder='Write your update title here...' 
              onChange={handleTitleChange}
            ></textarea>
            
            <p className="mt-4 mb-2 text-center text-2xl font-bold animate-text-pop" style={{animationDelay: '0.5s'}}>Content</p>
            <textarea 
              className='p-4 rounded-lg outline outline-gray-800 bg-gray-900 text-white resize-none h-[24rem] hover:scale-102 focus:animate-focus-scale-bounce transition-transform animate-fadein-up' 
              style={{animationDelay: '0.6s'}}
              value={content} 
              placeholder='Write your update content here...' 
              onChange={handleContentChange}
            ></textarea>
            
            <button 
              onClick={handleAddUpdate}
              className='p-4 mt-6 bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all hover:scale-102 duration-300 rounded-lg text-white font-semibold animate-btn-pop'
              style={{animationDelay: '0.2s'}}
            >
              Add Update
            </button>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}

export default Page