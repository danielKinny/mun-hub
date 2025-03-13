import React from 'react'
import {CustomNav} from '@/components/ui/customnav';
const page = () => {
  return (
    <div className='min-h-screen items-center justify-center bg-black text-white'>
      <header className='text-center border-b border-gray-800'>
        <h1 className='text-4xl font-extrabold p-4'>
          Global Affairs
        </h1>
      </header>
      <main>
        <section className='w-full mb-8 block border-b border-gray-800'>
          <CustomNav />
        </section>
        <section className='flex items-start justify-center'>
          <div className='w-full text-center p-5 text-3xl space-y-6 border border-gray-800'>
            <h1 className='text-4xl font-extrabold'>
              Top News Headlines
            </h1>
            
          </div>
        </section>
      </main>
    </div>
  )
}

export default page