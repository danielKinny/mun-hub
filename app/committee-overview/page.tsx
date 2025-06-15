"use client";
import React, {useState} from 'react'

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

    return (
      <div className='min-h-screen text-center p-2 bg-black text-white text-4xl'>
        <div className='flex flex-col items-center justify-center gap-4 min-h-screen'>
          <h1 className='text-5xl font-bold mb-8'>Committee Overview</h1>
          <ul className='flex flex-wrap items-center justify-center gap-8'>
            {committeeData.map((committee, index) => (
              <li 
                key={index} 
                className='text-2xl font-bold cursor-pointer transition-transform hover:scale-105'
                onClick={() => setSelectedCommittee(committee.name)}
              >
                <div className='flex flex-col items-center justify-center'>
                  <img 
                    src={`/images/${committee.logo}`} 
                    alt={`${committee.name} Logo`} 
                    width={100}
                    height={100}
                  />
                  <h2 className='text-4xl font-extrabold'>{committee.name}</h2>
                </div>
              </li>
            ))}
          </ul>
        </div>
        { selectedCommittee && (
          renderCommitteeComponent()
        )}
      </div>
    );
}

export default Page;