// Increased text size for all navigation text elements

"use client";
import React from "react";
import { Committee } from "@/db/types";

import {
  HomeModernIcon,
  DocumentIcon,
  GlobeAltIcon,
  NewspaperIcon,
  BookOpenIcon,
  BoltIcon,
  PencilSquareIcon
} from "@heroicons/react/24/outline";

// Define the props type for CustomNav component
type CustomNavProps = {
  activeLink?: string;
  className?: string;
};

const CustomNavComponent = ({ activeLink, className }: CustomNavProps = {}) => {
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
          <li className={`inline-block ${activeLink === 'speechrepo' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg`}>
            <a
              href="/speechrepo"
              className="flex items-center text-xl cursor-pointer"
            >
              <DocumentIcon className="w-5 h-5 mr-1" />
              Speech Repo
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
          <li className={`${activeLink === 'live-updates' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'} p-2 rounded-lg`}>
            <a
              href="/live-updates"
              className="flex items-center text-xl cursor-pointer"
            >
              <BoltIcon className="w-5 h-5 mr-1" />
              Live Updates
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
        </ul>
      </nav>
    </>
  );
};

export const CustomNav = React.memo(CustomNavComponent);
