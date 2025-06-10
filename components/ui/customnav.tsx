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
} from "@heroicons/react/24/outline";
const committees: Committee[] = [
  {
    committeeID: "0001",
    name: "UNSC",
    href: "/committee-overview/UNSC",
  },
  {
    committeeID: "0002",
    name: "UNHRC",
    href: "/committee-overview/UNHRC",
  },
];

const CustomNavComponent = () => {
  return (
    <>
      <nav className="w-full p-2 text-white border-b border-gray-700 bg-transparent">
        <ul className="w-full flex flex-row justify-center items-center space-x-6 whitespace-nowrap font-semibold">
          <li className="inline-block hover:bg-white hover:text-black p-2 rounded-lg">
            <a
              href="/home"
              className="flex items-center text-xl cursor-pointer"
            >
              <HomeModernIcon className="w-5 h-5 mr-1" />
              Home
            </a>
          </li>
          <li className="inline-block hover:bg-white hover:text-black p-2 rounded-lg">
            <a
              href="/speechrepo"
              className="flex items-center text-xl cursor-pointer"
            >
              <DocumentIcon className="w-5 h-5 mr-1" />
              Speech Repo
            </a>
          </li>
          <li className="inline-block relative group hover:bg-white hover:text-black p-2 rounded-lg">
            <button
              className="flex items-center text-xl focus:outline-none cursor-pointer"
              tabIndex={0}
            >
              <GlobeAltIcon className="w-5 h-5 mr-1" />
              Committee Overview
            </button>
            <ul className=" text-white absolute min-w-[255px] left-0 mt-2 bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity font-light z-10">
              {committees.map((committee) => (
                <li key={committee.committeeID}>
                  <a
                    href={committee.href}
                    className="block px-4 py-2 hover:bg-gray-700 text-xl cursor-pointer rounded-b-lg"
                  >
                    {committee.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="inline-block hover:bg-white hover:text-black p-2 rounded-lg">
            <a
              href="/glossary"
              className="flex items-center text-xl cursor-pointer"
            >
              <BookOpenIcon className="w-5 h-5 mr-1" />
              MUN Glossary
            </a>
          </li>
          <li className="inline-block hover:bg-white hover:text-black p-2 rounded-lg">
            <a
              href="/global-affairs"
              className="flex items-center text-xl cursor-pointer"
            >
              <NewspaperIcon className="w-5 h-5 mr-1" />
              Global Affairs
            </a>
          </li>
          <li>
            <a
              href="/live-updates"
              className="flex items-center text-xl cursor-pointer hover:bg-white hover:text-black p-2 rounded-lg"
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
