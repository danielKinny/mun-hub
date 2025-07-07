"use client";
import React from 'react'
import {AdminRoute} from '@/components/protectedroute'
import {toast} from 'sonner'
import Image from 'next/image'

const Page = () => {
    const [content, setContent] = React.useState<string>("");
    const [title, setTitle] = React.useState<string>("");
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

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
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('title', title);
            formData.append('content', content);
            const response = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Failed to create update');
            }
            
            setTitle("");
            setContent("");
            setSelectedFile(null);
            toast.success("Update added successfully!");
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) fileInput.value = "";
            
        } catch (error) {
            console.error('Error adding update:', error);
            toast.error("An unknown error occurred");
        }
    }

  return (
    <AdminRoute>
      <div className="flex flex-col items-center justify-center min-h-screen text-white p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row flex-wrap items-start justify-center gap-6 w-full max-w-4xl animate-slidein-up" style={{animationDelay: '0.1s'}}>
          <div className='text-white flex flex-col animate-fadein w-full md:w-1/3' style={{animationDelay: '0.2s'}}>
            <p className="mb-2 font-medium animate-text-pop" style={{animationDelay: '0.3s'}}>Upload Image</p>
            <label htmlFor="image-upload" className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-xl bg-gray-900 p-4 sm:p-6 cursor-pointer transition-all hover:border-blue-500 hover:bg-gray-800 focus-within:border-blue-500 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" /></svg>
              <span className="text-gray-300 mb-2 text-center text-sm sm:text-base">Click or drag an image here to upload</span>
              <input 
                id="image-upload"
                type="file" 
                accept="image/jpeg, image/jpg" 
                className="hidden"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <div className="mt-4 flex flex-col items-center">
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-700 shadow-md mb-2"
                    width={128}
                    height={128}
                  />
                  <p className="text-xs sm:text-sm text-gray-300 break-all text-center">{selectedFile.name}</p>
                </div>
              )}
            </label>
          </div>
          
          <div className='flex flex-col flex-1 animate-fadein w-full md:w-2/3' style={{animationDelay: '0.2s'}}>
            <p className="mb-2 text-xl sm:text-2xl font-bold text-center animate-text-pop" style={{animationDelay: '0.3s'}}>Title</p>
            <textarea 
              className='p-3 sm:p-4 rounded-lg outline outline-gray-800 bg-gray-900 text-white resize-none h-[6rem] sm:h-[10rem] hover:scale-101 focus:animate-focus-scale-bounce transition-transform animate-fadein-up text-sm sm:text-base' 
              style={{animationDelay: '0.4s'}}
              value={title} 
              placeholder='Write your update title here...' 
              onChange={handleTitleChange}
            ></textarea>
            
            <p className="mt-4 mb-2 text-center text-xl sm:text-2xl font-bold animate-text-pop" style={{animationDelay: '0.5s'}}>Content</p>
            <textarea 
              className='p-3 sm:p-4 rounded-lg outline outline-gray-800 bg-gray-900 text-white resize-none h-[12rem] sm:h-[24rem] hover:scale-101 focus:animate-focus-scale-bounce transition-transform animate-fadein-up text-sm sm:text-base' 
              style={{animationDelay: '0.6s'}}
              value={content} 
              placeholder='Write your update content here...' 
              onChange={handleContentChange}
            ></textarea>
            
            <button 
              onClick={handleAddUpdate}
              className='p-3 sm:p-4 mt-4 sm:mt-6 bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all hover:scale-102 duration-300 rounded-lg text-white font-semibold animate-btn-pop w-full sm:w-auto'
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