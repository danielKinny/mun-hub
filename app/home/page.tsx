"use client";
import React, { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "../context/sessionContext";
import Image from "next/image";
import { CustomNav } from "@/components/ui/customnav";
import ProtectedRoute from "@/components/protectedroute";
import { Announcement } from "@/db/types";
import {
  UserIcon,
  MegaphoneIcon,
  CalendarIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
export default function Home() {
  const { user: currentUser, logout } = useSession();
  const [announcements, setAnnouncements] = React.useState<Announcement[]>([]);

  const fetchAnnouncements = useCallback(async () => {
    const res = await fetch("/api/announcements");
    if (res.ok) {
      const data = await res.json();
      setAnnouncements(data);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-start justify-center bg-black text-white relative px-2 sm:px-4 md:px-8">
        <button
          className="fixed top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 text-sm sm:text-lg cursor-pointer bg-red-500 text-white rounded-2xl hover:bg-red-700 z-50 min-w-[2.5rem] sm:min-w-[3rem] min-h-[2.5rem] sm:min-h-[3rem]"
          onClick={logout}
        >
          <UserIcon className="w-4 h-4 sm:w-6 sm:h-6 inline-block" /> Logout
        </button>
        <header className="w-full text-center py-6 sm:py-8 bg-black text-white border-b-2 border-gray-900">
          <motion.h1
            className="text-3xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            MUN Hub - Welcome{" "}
            {currentUser?.firstname + " " + currentUser?.country.flag}!
          </motion.h1>

          <motion.h2
            className="text-lg sm:text-xl font-light mt-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            You are the delegate of {currentUser?.country.name} in{" "}
            {currentUser?.committee.name}
          </motion.h2>
        </header>

        <main className="flex-grow w-full max-w-5xl mx-auto">
          {/* Responsive nav section */}
          <section className="w-full block mb-6 sm:mb-8">
            <CustomNav />
          </section>
          <section className="w-full block mb-6 sm:mb-8">
            <div className="flex flex-col md:flex-row flex-wrap gap-4">
              <section className="w-full md:w-1/2 text-white mb-4 p-0 sm:p-2 flex flex-wrap">
                <motion.div
                  className="bg-gray-900 p-3 sm:p-4 rounded-lg shadow-md w-full"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 ">
                    <MegaphoneIcon className="w-7 h-7 sm:w-8 sm:h-8 inline-block" /> Announcements
                  </h2>
                  <div className="max-h-64 sm:max-h-80 overflow-y-auto">
                    <ul>
                      {announcements.map((announcement, index) => (
                        <motion.li
                          key={index}
                          className="mb-3 sm:mb-4 overflow-hidden"
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.3 + index * 0.1,
                          }}
                        >
                          <div className="bg-gray-800 shadow-lg rounded-lg w-full p-3 sm:p-4 transition-transform transform hover:scale-103 hover:shadow-xl">
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                              <a
                                href={announcement.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {announcement.title}
                              </a>
                            </h3>
                            <p className="text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base">
                              {announcement.content}
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm">
                              {announcement.date}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </section>

              <section className="w-full md:w-1/2 text-white mb-4 p-0 sm:p-2 flex flex-col items-center">
                <motion.div
                  className="bg-gray-900 p-3 sm:p-4 rounded-lg shadow-md w-full"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                    <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 inline-block" />
                    Conference Schedule
                  </h2>
                  <div className="bg-gray-800 shadow-lg rounded-lg w-full p-3 sm:p-4 transition-transform transform hover:scale-103 hover:shadow-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                      <Link
                        href="/delegate-resources/placeholder.pdf"
                        className="hover:underline"
                      >
                        View Schedule
                      </Link>
                    </h3>
                    <p className="text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base">
                      Check out the full schedule for upcoming conferences.
                    </p>
                  </div>
                </motion.div>
                <Image
                  className="mx-auto block p-2 sm:p-4 w-full h-auto max-w-[180px] xs:max-w-[220px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
                  src="/images/UNEMBLEM.png"
                  alt="UN Emblem"
                  width={500}
                  height={500}
                  priority
                />
              </section>
            </div>
          </section>
        </main>
        {/* what do i add here mayne */}

        <footer className="w-full text-center py-3 sm:py-4 bg-black text-white text-xs sm:text-base">
          <p>
            <EnvelopeIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 inline-block" />
            Contact us:
            <a href="https://youtu.be/dQw4w9WgXcQ" className="underline ml-1">
              danielkinny0214@gmail.com
            </a>
          </p>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
