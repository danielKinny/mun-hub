"use client";

import { motion } from "framer-motion"
import Link from "next/link"

interface Announcement {
  title: string
  externallink: string
  description: string
  date: string
}

export default function Home() {
  const announcements: Announcement[] = [
    {
      title: "EXAMPLEMUN BACK FOR 2025 !!! ",
      externallink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "This is a sample announcement.",
      date: "10-03-2025",
    },
    {
      title: "MUN Hub is now live!",
      externallink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "This is a sample announcement.",
      date: "10-03-2025",
    },
    {
      title: "Join our Webinar on International Relations",
      externallink: "https://www.example.com/webinar",
      description: "Learn about the latest trends in international relations.",
      date: "15-04-2025",
    },
    {
      title: "New Resources Available for Delegates",
      externallink: "https://www.example.com/resources",
      description: "Check out the new resources to help you prepare for your next MUN conference.",
      date: "20-05-2025",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-start justify-center bg-gray-900 font-serif text-white">
      <header className="w-full text-center py-8 bg-gray-800 text-white">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          MUN Hub
        </motion.h1>
      </header>

      <main className="flex-grow w-full max-w-4xl mx-auto mt-8">
        <div className="flex flex-wrap">
          <section className="w-full md:w-1/2 text-white mb-4 p-2">
            <motion.div
              className="bg-gray-800 p-4 rounded-lg shadow-md"
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
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="bg-gray-700 shadow-lg rounded-lg w-full p-4 transition-transform transform hover:scale-103 hover:shadow-xl">
                        <h3 className="text-xl font-bold text-blue-400 mb-2">
                          <a
                            href={announcement.externallink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {announcement.title}
                          </a>
                        </h3>
                        <p className="text-gray-300 mb-2">{announcement.description}</p>
                        <p className="text-gray-400 text-sm">{announcement.date}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </section>

          <section className="w-full md:w-1/2 text-white mb-4 p-2">
            <motion.div
              className="bg-gray-800 p-4 rounded-lg shadow-md"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Conference Schedule</h2>
              <div className="bg-gray-700 shadow-lg rounded-lg w-full p-4 transition-transform transform hover:scale-103 hover:shadow-xl">
                <h3 className="text-xl font-bold text-blue-400 mb-2">
                  <Link href="/conference-schedule" className="hover:underline">
                    View Schedule
                  </Link>
                </h3>
                <p className="text-gray-300 mb-2">Check out the full schedule for upcoming conferences.</p>
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      <footer className="w-full text-center py-4 bg-gray-800 text-white">
        <p>
          Contact us:{" "}
          <a href="mailto:info@munhub.com" className="underline">
            info@munhub.com
          </a>
        </p>
      </footer>
    </div>
  )
}

