"use client";
import React, { useState, useEffect } from 'react';

import {
  HSC,
  IACA,
  IPC,
  IPACRC,
  UNBOCC,
  UNHRC,
  CSW,
  COE,
  committeeData,
} from '../../components/ui/committeeComponents'

const Page = () => {
  const [selectedCommittee, setSelectedCommittee] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const initialLoadState: {[key: string]: boolean} = {};
    committeeData.forEach(committee => {
      initialLoadState[committee.name] = false;
    });
    setImagesLoaded(initialLoadState);
  }, []);

  const handleImageLoad = (committeeName: string) => {
    setImagesLoaded(prev => ({
      ...prev,
      [committeeName]: true
    }));
  };

  const renderCommitteeComponent = () => {
    switch(selectedCommittee) {
      case 'UNHRC':
        return <UNHRC />;
      case 'HSC':
        return <HSC />;
      case 'IACA':
        return <IACA />;
      case 'IPACRC':
        return <IPACRC />;
      case 'UNBOCC':
        return <UNBOCC />;
      case 'IPC':
        return <IPC />;
      case 'CSW':
        return <CSW />;
      case 'COE':
        return <COE />;
      default:
        return null;
    }
  };
  const calculatePosition = (index: number, totalItems: number, radius: number) => {
    const angle = (index / totalItems) * 2 * Math.PI;
    
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return { x, y };
  };

  return (
    <div className='min-h-screen text-center p-2 bg-black text-white'>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='relative w-[700px] h-[700px]'>
            <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
              <h1 className='text-6xl font-bold'>Committees</h1>
            </div>
            {committeeData.map((committee, index) => {
              const radius = 300; 
              const { x, y } = calculatePosition(
                index, 
                committeeData.length, 
                radius
              );
              
              return (
                <div
                  key={index}
                  className='absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110'
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  onClick={() => setSelectedCommittee(committee.name)}
                >
                  <div className='flex flex-col items-center'>
                    <div className='w-[160px] h-[160px] flex items-center justify-center'>
                      <img
                        src={`/images/${committee.logo}`}
                        alt={`${committee.name} Logo`}
                        width={160}
                        height={160}
                        className='object-contain max-w-full max-h-full'
                        onLoad={() => handleImageLoad(committee.name)}
                        style={{ 
                          opacity: imagesLoaded[committee.name] ? 1 : 0,
                          transition: 'opacity 0.3s ease-in-out'
                        }}
                      />
                    </div>
                    <h2 className='text-xl font-bold'>{committee.name}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {selectedCommittee && (
          renderCommitteeComponent()
        )}
      </div>
  );
}

export default Page;