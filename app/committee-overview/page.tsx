"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  HSC,
  IACA,
  IPC,
  IPACRC,
  UNBOCC,
  UNHCR,
  COE,
  committeeData,
} from '../../components/ui/committeeComponents'

import { useSession } from '../context/sessionContext';
import {CustomNav} from '../../components/ui/customnav';
import { useMobile } from '../../hooks/use-mobile';

const Page = () => {
  const [selectedCommittee, setSelectedCommittee] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  const {user : currentUser} = useSession();
  const committeeDetailsRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  useEffect(() => {
    const initialLoadState: {[key: string]: boolean} = {};
    committeeData.forEach(committee => {
      initialLoadState[committee.name] = false;
    });
    setImagesLoaded(initialLoadState);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          document.body.style.minHeight = `${window.innerHeight}px`;
        }
      };
      window.addEventListener('resize', handleResize);
      handleResize();  
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isMobile]);

  useEffect(() => {
    if (selectedCommittee && committeeDetailsRef.current) {
      committeeDetailsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [selectedCommittee]);

  const handleImageLoad = (committeeName: string) => {
    setImagesLoaded(prev => ({
      ...prev,
      [committeeName]: true
    }));
  };

  const renderCommitteeComponent = () => {
    switch(selectedCommittee) {
      case 'UNHCR':
        return <UNHCR />;
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
      case 'COE':
        return <COE />;
      default:
        return null;
    }
  };
  const calculatePosition = (index: number, totalItems: number, radius: number) => {
    if (isMobile) {
      const verticalSpacing = 220;
      const startingOffset = 300;
      return { 
        x: 0, 
        y: (index * verticalSpacing) + startingOffset
      };
    }
    
    const angle = (index / totalItems) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return { x, y };
  };

  return (
    <div className='min-h-screen text-center p-2 bg-black text-white'>
      <CustomNav 
      role={
        currentUser 
        ? ('delegateID' in currentUser 
          ? "delegate" 
          : ('chairID' in currentUser 
            ? "chair" 
            : "admin"))
        : undefined
      } 
      />
      {isMobile ? (
        // Mobile layout - vertical list
        <div className='flex flex-col items-center pt-6 pb-20'>
          <h1 className='mb-12'>
            <span className='text-4xl font-extrabold block mb-2'>COMMITTEES</span>
            <span className='text-lg block'>Click on a Logo to explore</span>
          </h1>
          
          <div className='flex flex-col items-center space-y-16'>
            {committeeData.map((committee, index) => (
              <div
                key={index}
                className='cursor-pointer transition-all hover:scale-110 hover:text-blue-400'
                onClick={() => setSelectedCommittee(committee.name)}
              >
                <div className='flex flex-col items-center'>
                  <div className='w-[120px] h-[120px] flex items-center justify-center mb-2'>
                    <Image
                      src={`/committee-resources/${committee.name}/${committee.logo}`}
                      alt={`${committee.name} Logo`}
                      title={`${committee.fullname} Logo`}
                      width={120}
                      height={120}
                      className='object-contain max-w-full max-h-full'
                      onLoad={() => handleImageLoad(committee.name)}
                      style={{
                        opacity: imagesLoaded[committee.name] ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out'
                      }}
                    />
                  </div>
                  <h2 className='text-lg font-bold'>{committee.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Desktop layout - circular arrangement
        <div className='flex items-center justify-center min-h-screen'>
          <div className='relative w-[700px] h-[700px]'>
            <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
              <h1>
                <span className='text-7xl font-extrabold'>COMMITTEES</span><br/>
                <span className='text-2xl'>Click on a Logo to explore</span>
              </h1>
            </div>
            {committeeData.map((committee, index) => {
              const radius = 350; 
              const { x, y } = calculatePosition(
                index, 
                committeeData.length, 
                radius
              );
              
              return (
                <div
                  key={index}
                  className='absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 hover:text-blue-400'
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  onClick={() => setSelectedCommittee(committee.name)}
                >
                  <div className='flex flex-col items-center'>
                    <div className='w-[160px] h-[160px] flex items-center justify-center'>
                      <Image
                        src={`/committee-resources/${committee.name}/${committee.logo}`}
                        alt={`${committee.name} Logo`}
                        title={`${committee.fullname} Logo`}
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
      )}
      <div ref={committeeDetailsRef} className={`scroll-mt-16 ${isMobile ? 'mt-4' : 'mt-8'} min-h-screen`}>
      {selectedCommittee && (
        <div className={`committee-details-container ${isMobile ? 'px-2' : 'px-8'}`}>
          {selectedCommittee && renderCommitteeComponent()}
        </div>
      )}
      </div>
    </div>
  );
}

export default Page;