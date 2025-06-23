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
    const handleResize = () => {
      document.body.style.minHeight = `${window.innerHeight}px`;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      const verticalSpacing = 180;
      const startingOffset = 250;
      
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
        <div className='flex flex-col items-center pt-6 pb-20'>
          <h1 className='mb-8 md:mb-12'>
            <span className='text-3xl md:text-4xl font-extrabold block mb-2'>COMMITTEES</span>
            <span className='text-base md:text-lg block'>Click on a Logo to explore</span>
          </h1>
          
          <div className='w-full max-w-md mx-auto grid grid-cols-1 gap-12 pb-12'>
            {committeeData.map((committee, index) => (
              <div
                key={index}
                className='cursor-pointer transition-all hover:scale-105 hover:text-blue-400'
                onClick={() => setSelectedCommittee(committee.name)}
              >
                <div className='flex flex-col items-center'>
                  <div className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex items-center justify-center mb-2'>
                    <Image
                      src={`/committee-resources/${committee.name}/${committee.logo}`}
                      alt={`${committee.name} Logo`}
                      title={`${committee.fullname} Logo`}
                      width={80}
                      height={80}
                      className='object-contain max-w-full max-h-full'
                      onLoad={() => handleImageLoad(committee.name)}
                      style={{
                        opacity: imagesLoaded[committee.name] ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out'
                      }}
                    />
                  </div>
                  <h2 className='text-sm md:text-base font-bold'>{committee.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center min-h-screen py-10'>
          <div className='relative w-full max-w-[700px] aspect-square'>
            <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full px-4'>
              <h1>
                <span className='text-4xl md:text-5xl lg:text-7xl font-extrabold'>COMMITTEES</span><br/>
                <span className='text-lg md:text-xl lg:text-2xl'>Click on a Logo to explore</span>
              </h1>
            </div>
            {committeeData.map((committee, index) => {
              const safeRadius = Math.min(window.innerWidth * 0.3, 300);
              
              const { x, y } = calculatePosition(
                index, 
                committeeData.length, 
                safeRadius
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
                    <div className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex items-center justify-center'>
                      <Image
                        src={`/committee-resources/${committee.name}/${committee.logo}`}
                        alt={`${committee.name} Logo`}
                        title={`${committee.fullname} Logo`}
                        width={80}
                        height={80}
                        className='object-contain max-w-full max-h-full'
                        onLoad={() => handleImageLoad(committee.name)}
                        style={{ 
                          opacity: imagesLoaded[committee.name] ? 1 : 0,
                          transition: 'opacity 0.3s ease-in-out'
                        }}
                      />
                    </div>
                    <h2 className='text-sm md:text-base lg:text-lg font-bold'>{committee.name}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div ref={committeeDetailsRef} className={`scroll-mt-16 ${isMobile ? 'mt-4' : 'mt-8'} ${selectedCommittee ? "min-h-screen" : ""}`}>
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