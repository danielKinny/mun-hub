"use client";
import React, {useEffect, useState, useMemo, memo, useCallback} from 'react'
import { ChairRoute } from '@/components/protectedroute'
import { useSession } from '@/app/context/sessionContext'
import { useMobile } from '@/hooks/use-mobile'
import { Chair } from '@/db/types'
import {toast} from 'sonner'
import { shortenedDel } from '@/db/types'

const DelegateItem = memo(({ 
  delegate, 
  onPermissionChange,
  isMobile
}: { 
  delegate: shortenedDel,
  onPermissionChange: (delegateID: string, permKey: string, value: boolean) => void;
  isMobile?: boolean;
}) => (
  <li key={delegate.delegateID} className='outline outline-gray-800 p-3 sm:p-4 w-full rounded-lg shadow-md'>
    <div className='flex flex-col items-center'>
        <div>
            <h2 className="text-xl sm:text-2xl text-white font-semibold mb-2">{delegate.firstname} {delegate.lastname}</h2>
        </div>
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md'>
            <div className='flex items-center justify-between w-full sm:block'>
                <span className='mr-2'>{isMobile ? 'View own' : 'View own resolutions'}</span>
                <input 
                  type="checkbox" 
                  className='scale-110' 
                  checked={delegate.resoPerms["view:ownreso"]} 
                  onChange={(e) => onPermissionChange(delegate.delegateID, "view:ownreso", e.target.checked)}
                />
            </div>
            <div className='flex items-center justify-between w-full sm:block'>
                <span className='mr-2'>{isMobile ? 'View all' : 'View all resolutions'}</span>
                <input 
                  type="checkbox" 
                  className='scale-110' 
                  checked={delegate.resoPerms["view:allreso"]} 
                  onChange={(e) => onPermissionChange(delegate.delegateID, "view:allreso", e.target.checked)}
                />
            </div>
            <div className='flex items-center justify-between w-full sm:block'>
                <span className='mr-2'>{isMobile ? 'Update own' : 'Update own resolutions'}</span>
                <input 
                  type="checkbox" 
                  className='scale-110' 
                  checked={delegate.resoPerms["update:ownreso"]} 
                  onChange={(e) => onPermissionChange(delegate.delegateID, "update:ownreso", e.target.checked)}
                />
            </div>
        </div>
    </div>
  </li>
));

DelegateItem.displayName = 'DelegateItem';

const Page = () => {
    const { user: currentUser } = useSession();
    const isMobile = useMobile();
    const [delegates, setDelegates] = useState<shortenedDel[]>([]);
    const [originalDelegates, setOriginalDelegates] = useState<shortenedDel[]>([]);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDelegates = async () => {
            setLoading(true);
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
            } finally {
                setLoading(false);
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
      <ul className='space-y-3 sm:space-y-4 p-2 sm:p-4 mx-2 sm:mx-4 md:mx-8'>
        {delegates.map((delegate) => (
          <DelegateItem 
            key={delegate.delegateID} 
            delegate={delegate} 
            onPermissionChange={handlePermissionChange}
            isMobile={isMobile} 
          />
        ))}
      </ul>
    ), [delegates, handlePermissionChange, isMobile]);

  return (
    <ChairRoute>
        <div className='min-h-screen bg-black text-white'>
            <div className='text-center p-3 sm:p-4'>
                <h1 className='text-3xl sm:text-4xl font-bold'>Delegates Permissions</h1>
                <p className='text-base sm:text-lg mt-2'>Manage permissions for delegates in your committee</p>
                {!loading && (
                <div className='mt-4'>
                    <button 
                        className={`${hasChanges 
                          ? 'bg-blue-500 hover:bg-blue-600' 
                          : 'bg-gray-500'} cursor-pointer text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg transition-colors`}
                        onClick={saveChanges}
                        disabled={!hasChanges || saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
                )}
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : delegates.length === 0 ? (
                <div className="text-center p-8">
                    <p className="text-xl">No delegates found in your committee</p>
                </div>
            ) : (
                memoizedDelegatesList
            )}
        </div>
    </ChairRoute>
  )
}

export default Page;