"use client";
import React, { useState } from "react";
import Link from "next/link";

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
  UserCircleIcon,
} from "@heroicons/react/24/outline";

type CustomNavProps = {
  activeLink?: string;
  className?: string;
  role?: 'delegate' | 'chair' | 'admin';
};

const CustomNavComponent = ({ activeLink, className, role = 'delegate' }: CustomNavProps = {}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <>
      <nav className={`w-full p-2 text-white border-b border-gray-700 bg-transparent ${className || ''}`}>
        <div className="flex items-center justify-between md:hidden">
          <span className="text-xl font-bold flex items-center">
            <HomeModernIcon className="w-6 h-6 mr-2" />MUN Hub
          </span>
          <button
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-white click-effect"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        <ul
          className={`w-full md:flex flex-col md:flex-row justify-center items-center md:space-x-6 space-y-2 md:space-y-0 whitespace-nowrap font-semibold mt-2 md:mt-0
            ${menuOpen ? 'flex' : 'hidden'} md:flex bg-gray-900 md:bg-transparent p-4 pt-12 md:p-0 rounded-lg md:rounded-none z-50 absolute md:static left-0 right-0 top-14 md:top-auto`}
        >
          {menuOpen && (
            <div className="absolute top-4 right-4 md:hidden">
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white click-effect"
                aria-label="Close navigation menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <li className={`inline-block click-effect ${activeLink === 'home' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg w-full md:w-auto`}> 
            <Link href="/home" className="flex items-center text-lg md:text-xl cursor-pointer" onClick={handleNavClick}>
              <HomeModernIcon className="w-5 h-5 mr-1" /> Home
            </Link>
          </li>
          <li className={`inline-block click-effect relative group ${activeLink === 'committee-overview' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg w-full md:w-auto`}>
            <Link href="/committee-overview" className="flex items-center text-lg md:text-xl focus:outline-none cursor-pointer" onClick={handleNavClick}>
              <GlobeAltIcon className="w-5 h-5 mr-1" /> Committee Overview
            </Link>
          </li>
          {role === 'chair' && (
            <li className={`inline-block click-effect ${activeLink === 'chair-tool' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg w-full md:w-auto`}>
              <Link href="/chair" className="flex items-center text-lg md:text-xl cursor-pointer" onClick={handleNavClick}>
                <IdentificationIcon className="w-5 h-5 mr-1" /> Chair Tool
              </Link>
            </li>
          )}
          {role === 'admin' ? (
            <li className={`inline-block click-effect ${activeLink === 'admin' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg w-full md:w-auto`}>
              <Link href="/admin" className="flex items-center text-lg md:text-xl cursor-pointer" onClick={handleNavClick}>
                <WrenchIcon className="w-5 h-5 mr-1" /> Admin Tool
              </Link>
            </li>
          ) : (
            <>
              <li className={`inline-block click-effect ${activeLink === 'speechrepo' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg w-full md:w-auto`}>
                <Link href="/speechrepo" className="flex items-center text-lg md:text-xl cursor-pointer" onClick={handleNavClick}>
                  <DocumentIcon className="w-5 h-5 mr-1" /> Speech Repo
                </Link>
              </li>
              <li className={`inline-block click-effect ${activeLink === 'glossary' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg w-full md:w-auto`}>
                <Link href="/glossary" className="flex items-center text-lg md:text-xl cursor-pointer" onClick={handleNavClick}>
                  <BookOpenIcon className="w-5 h-5 mr-1" /> MUN Glossary
                </Link>
              </li>
              <li className={`inline-block click-effect ${activeLink === 'global-affairs' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg w-full md:w-auto`}>
                <Link href="/global-affairs" className="flex items-center text-lg md:text-xl cursor-pointer" onClick={handleNavClick}>
                  <NewspaperIcon className="w-5 h-5 mr-1" /> Global Affairs
                </Link>
              </li>
              <li className={`inline-block click-effect ${activeLink === 'resolutions' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg w-full md:w-auto`}>
                <Link href="/resolutions" className="flex items-center text-lg md:text-xl cursor-pointer" onClick={handleNavClick}>
                  <PencilSquareIcon className="w-5 h-5 mr-1" /> Resolutions
                </Link>
              </li>
            </>
          )}
          <li className={`click-effect ${activeLink === 'live-updates' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg w-full md:w-auto`}>
            <Link href="/live-updates" className="flex items-center text-lg md:text-xl cursor-pointer" onClick={handleNavClick}>
              <BoltIcon className="w-5 h-5 mr-1" /> Live Updates
            </Link>
          </li>
          <li className={`click-effect md:hidden bg-red-500 hover:bg-red-600 ${activeLink === 'logout' ? 'bg-white text-black' : ''} p-2 rounded-lg w-full md:w-auto`}>
            <Link href="/login" className="flex items-center text-lg md:text-xl cursor-pointer" onClick={handleNavClick}>
              <UserCircleIcon className="w-5 h-5 mr-1" /> Logout
            </Link>
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
