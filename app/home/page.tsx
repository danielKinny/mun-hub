"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "../context/sessionContext";
import Image from "next/image";
import { CustomNav } from "@/components/ui/customnav";
import ProtectedRoute from "@/components/protectedroute";
import { announcements } from "@/db/index";

export default function Home() {
  const { user: currentUser } = useSession();
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-start justify-center bg-black text-white">
        <header className="w-full text-center py-8 bg-black text-white border-b-3 border-gray-900">
          <motion.h1
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            MUN Hub - Welcome {currentUser?.firstname} {currentUser?.flag} !
          </motion.h1>

          <motion.h2
            className="text-xl font-light"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            You are the delegate of {currentUser?.delegation} in the committee{" "}
            {currentUser?.committee}.
          </motion.h2>
        </header>

        <main className="flex-grow w-full max-w-4xl mx-auto mt-8">
          {/* dis is da beginning of da page content ya feel me */}
          <section className="w-full block mb-8">
            <CustomNav />
          </section>
          <section className="w-full block mb-8">
            <div className="flex flex-wrap">
              <section className="w-full md:w-1/2 text-white mb-4 p-2 flex flex-wrap">
                <motion.div
                  className="bg-gray-900 p-4 rounded-lg shadow-md"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
                  <div className="h-96 overflow-y-auto">
                    <ul>
                      {announcements.map((announcement, index) => (
                        <motion.li
                          key={index}
                          className="mb-4"
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
                                href={announcement.externallink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {announcement.title}
                              </a>
                            </h3>
                            <p className="text-gray-300 mb-2">
                              {announcement.description}
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
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/UN_emblem_blue.svg/1024px-UN_emblem_blue.svg.png?20230920050537"
                  alt="UN Emblem"
                  width={200}
                  height={200}
                />
              </section>
            </div>
          </section>
        </main>
        {/* what do i add here mayne */}

        <footer className="w-full text-center py-4 bg-black text-white">
          <p>
            Contact us:
            <a href="danielkinny@gmail.com" className="underline">
              info@munhub.com
            </a>
          </p>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
