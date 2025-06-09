"use client";
import React from 'react'
import { useSession } from '../context/sessionContext'
import AdminRoute from '@/components/adminroute'


const Page = () => {
    
    const { user: currentUser } = useSession()

  return (
    <AdminRoute>
        <div className="flex flex-col items-center justify-center h-screen text-white">
            sarah is so cool happy birthday
        </div>
    </AdminRoute>
  )
}

export default Page