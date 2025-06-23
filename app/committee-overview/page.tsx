"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

import { HomeIcon } from '@heroicons/react/24/outline';

import { useSession } from '../context/sessionContext';
import {CustomNav} from '../../components/ui/customnav';
import { useMobile } from '../../hooks/use-mobile';
import Home from '../home/page';

const Page = () => {
  const [selectedCommittee, setSelectedCommittee] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  const {user : currentUser} = useSession();
  const committeeDetailsRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      setSelectedCommittee(null);
    }, 300);
  };

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

  return (
    <div className='min-h-screen text-center p-2 text-white bg-black'>
      <CustomNav 
      role={
        currentUser && 'delegateID' in currentUser ?
        "delegate" : "chair"
      } 
      />
      <div ref={topRef} className="scroll-mt-16" />
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
            
            <Link href="/home" className='cursor-pointer transition-all hover:scale-105 hover:text-blue-400'>
              <div className='flex flex-col items-center'>
                <div className='w-[80px] cursor-pointer h-[80px] md:w-[100px] md:h-[100px] flex items-center justify-center mb-2'>
                  <HomeIcon className='w-8 h-8 md:w-10 md:h-10 text-white' />
                </div>
                <h2 className='text-sm md:text-base font-bold'>Back to Home</h2>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center min-h-screen py-10'>
          <div className='relative w-full max-w-4xl mx-auto'>
            <div className='grid grid-cols-3 gap-8'>
              {committeeData.map((committee, index) => {
                if (index === 4) {
                  return (
                    <React.Fragment key="title">
                      <div className='flex flex-col items-center justify-center'>
                        <h1 className='mb-0'>
                          <span className='text-4xl md:text-5xl lg:text-6xl font-extrabold block'>COMMITTEES</span>
                          <span className='text-base md:text-lg block mt-2'>Click on a Logo to explore</span>
                        </h1>
                      </div>
                      
                      <div
                        key={index}
                        className='cursor-pointer transition-all hover:scale-110 hover:text-blue-400'
                        onClick={() => setSelectedCommittee(committee.name)}
                      >
                        <div className='flex flex-col items-center justify-center h-full p-4'>
                          <div className='w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center mb-3'>
                            <Image
                              src={`/committee-resources/${committee.name}/${committee.logo}`}
                              alt={`${committee.name} Logo`}
                              title={`${committee.fullname} Logo`}
                              width={100}
                              height={100}
                              className='object-contain max-w-full max-h-full'
                              onLoad={() => handleImageLoad(committee.name)}
                              style={{ 
                                opacity: imagesLoaded[committee.name] ? 1 : 0,
                                transition: 'opacity 0.3s ease-in-out'
                              }}
                            />
                          </div>
                          <h2 className='text-base md:text-lg lg:text-xl font-bold'>{committee.name}</h2>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                }
                

                return (
                  <div
                    key={index}
                    className='cursor-pointer transition-all hover:scale-110 hover:text-blue-400'
                    onClick={() => setSelectedCommittee(committee.name)}
                  >
                    <div className='flex flex-col items-center justify-center h-full p-4'>
                      <div className='w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center mb-3'>
                        <Image
                          src={`/committee-resources/${committee.name}/${committee.logo}`}
                          alt={`${committee.name} Logo`}
                          title={`${committee.fullname} Logo`}
                          width={100}
                          height={100}
                          className='object-contain max-w-full max-h-full'
                          onLoad={() => handleImageLoad(committee.name)}
                          style={{ 
                            opacity: imagesLoaded[committee.name] ? 1 : 0,
                            transition: 'opacity 0.3s ease-in-out'
                          }}
                        />
                      </div>
                      <h2 className='text-base md:text-lg lg:text-xl font-bold'>{committee.name}</h2>
                    </div>
                  </div>
                );
              })}
              
              <Link href="/home" className='cursor-pointer transition-all hover:scale-110 hover:text-blue-400'>
                <div className='flex flex-col items-center justify-center h-full p-4'>
                  <div className='w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center mb-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2" />
                    </svg>
                  </div>
                  <h2 className='text-base md:text-lg lg:text-xl font-bold'>Back to Home</h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
      {selectedCommittee && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-10">
          <button 
            onClick={scrollToTop}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
            aria-label="Back to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      )}
      
      <div ref={committeeDetailsRef} className={`scroll-mt-16 ${isMobile ? 'mt-4' : 'mt-8'} ${selectedCommittee ? "min-h-screen" : ""}`}>
        {selectedCommittee && (
          <div>
            <div className={`committee-details-container ${isMobile ? 'px-2' : 'px-8'}`}>
              {selectedCommittee && renderCommitteeComponent()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;