"use client";
import React, {useEffect, useState, useMemo, memo} from 'react'
import { ChairRoute } from '@/components/protectedroute'
import { CustomNav } from '@/components/ui/customnav'
import { useSession } from '@/app/context/sessionContext'
import { Chair } from '@/db/types'
import {toast} from 'sonner'

const DelegateItem = memo(({ delegate }: { delegate: {
    delegateID: string;
    firstname: string;
    lastname: string;
    resoPerms: {
        "view:ownreso": boolean;
        "view:allreso": boolean;
        "update:ownreso": boolean;
    };
} }) => (
  <li key={delegate.delegateID} className='outline outline-gray-800 p-4 w-full rounded-lg shadow-md'>
    <div className='flex flex-col items-center'>
        <div>
            <h2 className="text-2xl text-white font-semibold mb-2">{delegate.firstname} {delegate.lastname}</h2>
        </div>
        <div className='flex gap-4'>
            <div>
            <span className='mx-2'>Allow to view own resolutions</span>
            <input type="checkbox" className='mb-2' defaultChecked={delegate.resoPerms["view:ownreso"]} />
            </div>
            <div>
            <span className='mx-2'>Allow to view all resolutions</span>
            <input type="checkbox" className='mb-2' defaultChecked={delegate.resoPerms["view:allreso"]} />
            </div>
            <div>
            <span className='mx-2'>Allow to update own resolutions</span>
            <input type="checkbox" className='mb-2' defaultChecked={delegate.resoPerms["update:ownreso"]} />
            </div>
        </div>
    </div>
  </li>
));

DelegateItem.displayName = 'DelegateItem';
const MemoizedNav = memo(CustomNav);

const Page = () => {
    const { user: currentUser } = useSession();
    const [delegates, setDelegates] = useState<{
        delegateID: string;
        firstname: string;
        lastname: string;
        resoPerms: {
            "view:ownreso": boolean;
            "view:allreso": boolean;
            "update:ownreso": boolean;
        };
    }[]>([]);

    useEffect(() => {
        const fetchDelegates = async () => {
            try {
                const res = await fetch(`/api/delegates?committeeID=${(currentUser as Chair).committee.committeeID}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch delegates');
                }
                const data = await res.json();
                setDelegates(data);
            } catch (error) {
                console.error("Error fetching delegates:", error);
                toast.error("Failed to load delegates");
            }
        };

        fetchDelegates();
    }, [currentUser]);

    // Memoize the delegates list to prevent unnecessary re-renders
    const memoizedDelegatesList = useMemo(() => (
      <ul className='space-y-4 p-4 mx-8'>
        {delegates.map((delegate) => (
          <DelegateItem key={delegate.delegateID} delegate={delegate} />
        ))}
      </ul>
    ), [delegates]);

  return (
    <ChairRoute>
        <div className='min-h-screen bg-black text-white'>
            <MemoizedNav />
            <div className='text-center p-4'>
                this is where all delegates will go
            </div>
            {memoizedDelegatesList}
        </div>
    </ChairRoute>
  )
}

export default Page;