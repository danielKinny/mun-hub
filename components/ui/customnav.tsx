"use client";
import React from "react";

import {
  HomeModernIcon,
  DocumentIcon,
  GlobeAltIcon,
  NewspaperIcon,
  BookOpenIcon,
  BoltIcon,
  PencilSquareIcon,
  WrenchIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

type CustomNavProps = {
  activeLink?: string;
  className?: string;
  role?: 'delegate' | 'chair' | 'admin';
};

const CustomNavComponent = ({ activeLink, className, role = 'delegate' }: CustomNavProps = {}) => {
  return (
    <>
      <nav className={`w-full p-2 text-white border-b border-gray-700 bg-transparent ${className || ''}`}>
        <ul className="w-full flex flex-row justify-center items-center space-x-6 whitespace-nowrap font-semibold">
          <li className={`inline-block ${activeLink === 'home' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg`}>
            <a
              href="/home"
              className="flex items-center text-xl cursor-pointer"
            >
              <HomeModernIcon className="w-5 h-5 mr-1" />
              Home
            </a>
          </li>
          
          <li className={`inline-block relative group ${activeLink === 'committee-overview' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg`}>
            <a
              href="/committee-overview"
              className="flex items-center text-xl focus:outline-none cursor-pointer"
            >
              <GlobeAltIcon className="w-5 h-5 mr-1" />
              Committee Overview
            </a>
          </li>

          {role === 'chair' && (
            <li className={`inline-block ${activeLink === 'chair-tool' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg`}>
              <a
                href="/chair"
                className="flex items-center text-xl cursor-pointer"
              >
                <IdentificationIcon className="w-5 h-5 mr-1" />
                Chair Tool
              </a>
            </li>
          )}

          {role === 'admin' ? (
            <li className={`inline-block ${activeLink === 'admin' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg`}>
              <a
                href="/admin"
                className="flex items-center text-xl cursor-pointer"
              >
                <WrenchIcon className="w-5 h-5 mr-1" />
                Admin Tool
              </a>
            </li>
          ) : (
            <>
              <li className={`inline-block ${activeLink === 'speechrepo' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg`}>
                <a
                  href="/speechrepo"
                  className="flex items-center text-xl cursor-pointer"
                >
                  <DocumentIcon className="w-5 h-5 mr-1" />
                  Speech Repo
                </a>
              </li>
              
              <li className={`inline-block ${activeLink === 'glossary' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg`}>
                <a
                  href="/glossary"
                  className="flex items-center text-xl cursor-pointer"
                >
                  <BookOpenIcon className="w-5 h-5 mr-1" />
                  MUN Glossary
                </a>
              </li>
              
              <li className={`inline-block ${activeLink === 'global-affairs' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg`}>
                <a
                  href="/global-affairs"
                  className="flex items-center text-xl cursor-pointer"
                >
                  <NewspaperIcon className="w-5 h-5 mr-1" />
                  Global Affairs
                </a>
              </li>
              
              <li className={`inline-block ${activeLink === 'resolutions' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg`}>
                <a
                  href="/resolutions"
                  className="flex items-center text-xl cursor-pointer"
                >
                  <PencilSquareIcon className="w-5 h-5 mr-1" />
                  Resolutions
                </a>
              </li>
            </>
          )}
          
          <li className={`${activeLink === 'live-updates' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg`}>
            <a
              href="/live-updates"
              className="flex items-center text-xl cursor-pointer"
            >
              <BoltIcon className="w-5 h-5 mr-1" />
              Live Updates
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export const CustomNav = React.memo(CustomNavComponent);

export const AdminNav = React.memo((props: Omit<CustomNavProps, 'role'>) => 
  <CustomNavComponent {...props} role='admin' />
);
