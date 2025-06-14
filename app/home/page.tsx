"use client";
import React, { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "../context/sessionContext";
import Image from "next/image";
import { CustomNav, AdminNav } from "@/components/ui/customnav";
import {ProtectedRoute} from "@/components/protectedroute";
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
  const role =  currentUser && ('delegateID' in currentUser ? 'delegate' : 'chairID' in currentUser ? 'chair' : 'admin');

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
      <div className="min-h-screen flex flex-col items-start justify-center bg-black text-white">
        <div className="absolute top-0 right-0 m-4 flex flex-col items-end gap-2">
          <button
            className="p-2 text-lg cursor-pointer bg-red-500 text-white rounded-2xl hover:bg-red-700"
            onClick={logout}
          >
            <UserIcon className="w-6 h-6 inline-block" /> Logout
          </button>
        </div>
        <header className="w-full text-center py-8 bg-black text-white border-b-3 border-gray-900">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            MUN Hub - Welcome{" "}
            {currentUser?.firstname}
            { role==="delegate" && currentUser && 'country' in currentUser && " " + currentUser.country.flag}
          </motion.h1>

            <motion.h2
              className="text-xl font-light"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentUser && 'delegateID' in currentUser
                ? `You are delegating for ${currentUser?.country.name} in ${currentUser?.committee?.name}`
                : currentUser && 'chairID' in currentUser
                ? `You are the chair of ${currentUser?.committee?.name}`
                : "Admin Access"
              }
            </motion.h2>
          
        </header>

        <main className="flex-grow w-full max-w-4xl mx-auto">
          {/* dis is da beginning of da page content ya feel me */}
          <section className="w-full block mb-8">
            <CustomNav isAdmin={role === "admin"} />
          </section>
          <section className="w-full block mb-8">
            <div className="flex flex-wrap">
              <section className="w-full md:w-1/2 text-white mb-4 p-2 flex flex-wrap">
                <motion.div
                  className="bg-gray-900 p-4 rounded-lg shadow-md w-[50vh]"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-semibold mb-4 ">
                    {" "}
                    <MegaphoneIcon className="w-8 h-8 inline-block" />{" "}
                    Announcements{" "}
                  </h2>
                  <div className="h-128 overflow-y-auto">
                    <ul>
                      {announcements.map((announcement, index) => (
                        <motion.li
                          key={index}
                          className="mb-4 overflow-y-hidden overflow-x-hidden"
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.3 + index * 0.1,
                          }}
                        >
                          <div className="bg-gray-800 shadow-lg rounded-lg w-full p-4 transition-transform transform hover:scale-103 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-2">
                              <a
                                href={announcement.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {announcement.title}
                              </a>
                            </h3>
                            <p className="text-gray-300 mb-2">
                              {announcement.content}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {announcement.date}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </section>

              <section className="w-full md:w-1/2 text-white mb-4 p-2">
                <motion.div
                  className="bg-gray-900 p-4 rounded-lg shadow-md"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">
                    <CalendarIcon className="w-6 mr-2 h-6 inline-block" />
                    Conference Schedule
                  </h2>
                  <div className="bg-gray-800 shadow-lg rounded-lg w-full p-4 transition-transform transform hover:scale-103 hover:shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-2">
                      <Link
                        href="/delegate-resources/placeholder.pdf"
                        className="hover:underline"
                      >
                        View Schedule
                      </Link>
                    </h3>
                    <p className="text-gray-300 mb-2">
                      Check out the full schedule for upcoming conferences.
                    </p>
                  </div>
                </motion.div>
                <Image
                  className=" mx-auto block p-4"
                  src="/images/UNEMBLEM.png"
                  alt="UN Emblem"
                  width={500}
                  height={500}
                />
              </section>
            </div>
          </section>
        </main>
        {/* what do i add here mayne */}

        <footer className="w-full text-center py-4 bg-black text-white">
          <p>
            <EnvelopeIcon className="w-6 h-6 mr-2 inline-block" />
            Contact us:
            <a href="https://youtu.be/dQw4w9WgXcQ">
              {" "}
              danielkinny0214@gmail.com
            </a>
          </p>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
