import React from 'react'
import {CustomNav} from '@/components/ui/customnav';
const page = () => {
  return (
    <div className='min-h-screen items-center justify-center bg-black text-white'>
    
            <header className='text-center border-b border-gray-800'>
                <h1 className="p-4 text-4xl font-extrabold font-serif">
                    Committee Overview
                </h1>
                <h4 className='p-2 text-xl font-light font-serif'>
                    UNODC - United Nations Office on Drugs and Crime
                </h4>
            </header>
    
            <main>
                <section className="w-full mb-8 block">
                    <CustomNav/>
                </section>
                <div>
    
    
    
                </div>
            </main>
    
        </div>
  )
}

export default page