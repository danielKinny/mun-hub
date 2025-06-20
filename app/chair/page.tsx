"use client";
import React, {useEffect, useState, useMemo, memo, useCallback} from 'react'
import { ChairRoute } from '@/components/protectedroute'
import { CustomNav } from '@/components/ui/customnav'
import { useSession } from '@/app/context/sessionContext'
import { Chair } from '@/db/types'
import {toast} from 'sonner'
import { shortenedDel } from '@/db/types'

const DelegateItem = memo(({ 
  delegate, 
  onPermissionChange 
}: { 
  delegate: shortenedDel,
  onPermissionChange: (delegateID: string, permKey: string, value: boolean) => void;
}) => (
  <li key={delegate.delegateID} className='outline outline-gray-800 p-4 w-full rounded-lg shadow-md'>
    <div className='flex flex-col items-center'>
        <div>
            <h2 className="text-2xl text-white font-semibold mb-2">{delegate.firstname} {delegate.lastname}</h2>
        </div>
        <div className='flex gap-4'>
            <div>
            <span className='mx-2'>Allow to view own resolutions</span>
            <input 
              type="checkbox" 
              className='mb-2' 
              checked={delegate.resoPerms["view:ownreso"]} 
              onChange={(e) => onPermissionChange(delegate.delegateID, "view:ownreso", e.target.checked)}
            />
            </div>
            <div>
            <span className='mx-2'>Allow to view all resolutions</span>
            <input 
              type="checkbox" 
              className='mb-2' 
              checked={delegate.resoPerms["view:allreso"]} 
              onChange={(e) => onPermissionChange(delegate.delegateID, "view:allreso", e.target.checked)}
            />
            </div>
            <div>
            <span className='mx-2'>Allow to update own resolutions</span>
            <input 
              type="checkbox" 
              className='mb-2' 
              checked={delegate.resoPerms["update:ownreso"]} 
              onChange={(e) => onPermissionChange(delegate.delegateID, "update:ownreso", e.target.checked)}
            />
            </div>
        </div>
    </div>
  </li>
));

DelegateItem.displayName = 'DelegateItem';
const MemoizedNav = memo(CustomNav);

const Page = () => {
    const { user: currentUser } = useSession();
    const [delegates, setDelegates] = useState<shortenedDel[]>([]);
    const [originalDelegates, setOriginalDelegates] = useState<shortenedDel[]>([]);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        const fetchDelegates = async () => {
            try {
                if (!(currentUser as Chair)?.committee?.committeeID) return;
                
                const res = await fetch(`/api/delegates?committeeID=${(currentUser as Chair).committee.committeeID}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch delegates');
                }
                const data = await res.json();
                setDelegates(data);
                setOriginalDelegates(JSON.parse(JSON.stringify(data))); //deep copy
            } catch (error) {
                console.error("Error fetching delegates:", error);
                toast.error("Failed to load delegates");
            }
        };

        fetchDelegates();
    }, [currentUser]);

    const handlePermissionChange = useCallback((delegateID: string, permKey: string, value: boolean) => {
        setDelegates(prevDelegates => {
            const newDelegates = prevDelegates.map(delegate => {
                if (delegate.delegateID === delegateID) {
                    return {
                        ...delegate,
                        resoPerms: {
                            ...delegate.resoPerms,
                            [permKey]: value
                        }
                    };
                }
                return delegate;
            });
            
            const hasAnyChanges = newDelegates.some((delegate, index) => {
                const original = originalDelegates[index];
                return (
                    delegate.resoPerms["view:ownreso"] !== original.resoPerms["view:ownreso"] ||
                    delegate.resoPerms["view:allreso"] !== original.resoPerms["view:allreso"] ||
                    delegate.resoPerms["update:ownreso"] !== original.resoPerms["update:ownreso"]
                );
            });
            
            setHasChanges(hasAnyChanges);
            return newDelegates;
        });
    }, [originalDelegates]);

    const saveChanges = async () => {
        try {
            setSaving(true);
            const changedDelegates = delegates.filter((delegate, index) => {
                const original = originalDelegates[index];
                return (
                    delegate.resoPerms["view:ownreso"] !== original.resoPerms["view:ownreso"] ||
                    delegate.resoPerms["view:allreso"] !== original.resoPerms["view:allreso"] ||
                    delegate.resoPerms["update:ownreso"] !== original.resoPerms["update:ownreso"]
                );
            });
            
            if (changedDelegates.length === 0) {
                toast.info("No changes to save");
                setSaving(false);
                return;
            }
            
            if (changedDelegates.length === 1) {
                const delegate = changedDelegates[0];
                const response = await fetch('/api/delegates', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        delegateID: delegate.delegateID,
                        resoPerms: delegate.resoPerms
                    }),
                });
                
                const result = await response.json();
                
                if (!response.ok) {
                    throw new Error(result.error || 'Failed to update delegate');
                }
                
                toast.success(`Updated permissions for ${delegate.firstname} ${delegate.lastname}`);
            }
            else {
                const formattedDelegates = changedDelegates.map(delegate => ({
                    delegateID: delegate.delegateID,
                    resoPerms: delegate.resoPerms
                }));
                
                const response = await fetch('/api/delegates', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        delegates: formattedDelegates
                    }),
                });
                
                const result = await response.json();
                
                if (!response.ok) {
                    throw new Error(result.error || 'Failed to update delegates');
                }

                type UpdateResult = {
                    delegateID: string;
                    success: boolean;
                    error?: string;
                    delegate?: {
                        delegateID: string;
                        resoPerms: {
                            "view:ownreso": boolean;
                            "view:allreso": boolean;
                            "update:ownreso": boolean;
                            "update:reso": string[];
                        };
                    };
                };
                
                const failures = result.results?.filter((r: UpdateResult) => !r.success) || [];
                
                if (failures.length > 0) {
                    toast.error(`Failed to update ${failures.length} delegates`);
                } else {
                    toast.success(`Updated permissions for ${changedDelegates.length} delegates`);
                }
            }

            setOriginalDelegates(JSON.parse(JSON.stringify(delegates)));
            setHasChanges(false);
            
        } catch (error) {
            console.error("Error saving changes:", error);
            toast.error(error instanceof Error ? error.message : "Failed to save changes");
        } finally {
            setSaving(false);
        }
    };

    const memoizedDelegatesList = useMemo(() => (
      <ul className='space-y-4 p-4 mx-8'>
        {delegates.map((delegate) => (
          <DelegateItem 
            key={delegate.delegateID} 
            delegate={delegate} 
            onPermissionChange={handlePermissionChange} 
          />
        ))}
      </ul>
    ), [delegates, handlePermissionChange]);

  return (
    <ChairRoute>
        <div className='min-h-screen bg-black text-white'>
            <MemoizedNav />
            <div className='text-center p-4'>
                <h1 className='text-4xl font-bold'>Delegates Permissions</h1>
                <p className='text-lg mt-2'>Manage permissions for delegates in your committee</p>
                <div className='mt-4'>
                    <button 
                        className={`${hasChanges 
                          ? 'bg-blue-500 hover:bg-blue-600' 
                          : 'bg-gray-500'} cursor-pointer text-white px-6 py-2 rounded-lg transition-colors`}
                        onClick={saveChanges}
                        disabled={!hasChanges || saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
            {memoizedDelegatesList}
        </div>
    </ChairRoute>
  )
}

export default Page;