// Increased text size for all navigation text elements

"use client";
import React from "react";
import { Committee } from "@/db/types";

import {
  HomeModernIcon,
  GlobeAltIcon,
  WrenchIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const AdminNavComponent = () => {
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
          <li className="inline-block relative group hover:bg-white hover:text-black p-2 rounded-lg">
                      <a
                        href="/committee-overview"
                        className="flex items-center text-xl focus:outline-none cursor-pointer"
                      >
                        <GlobeAltIcon className="w-5 h-5 mr-1" />
                        Committee Overview
                      </a>
                    </li>
          <li className="inline-block hover:bg-white hover:text-black p-2 rounded-lg">
            <a
              href="/admin"
              className="flex items-center text-xl cursor-pointer"
            >
              <WrenchIcon className="w-5 h-5 mr-1" />
              Admin Tool
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

export const AdminNav = React.memo(AdminNavComponent);
