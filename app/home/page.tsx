"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../context/sessionContext";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { CustomNav } from "@/components/ui/customnav";
import ProtectedRoute from "@/components/protectedroute";
interface Announcement {
  title: string;
  externallink: string;
  description: string;
  date: string;
}

export default function Home() {
  const { user: currentUser } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

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
      description:
        "Check out the new resources to help you prepare for your next MUN conference.",
      date: "20-05-2025",
    },
  ];

  {
    /* using announcement interface for homepage cards cos im lowkey lazy ykykyk */
  }

  const homepagecards: Announcement[] = [
    {
      title: "Committee Overview",
      externallink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Learn about the structure and function of committees in Model UN.",
      date: "n/a",
    },
    {
      title: "Speech Repo",
      externallink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Access a repository of sample speeches to help you prepare.",
      date: "n/a",
    },
    {
      title: "MUN Glossary",
      externallink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Understand common MUN terms and jargon with our glossary.",
      date: "n/a",
    },
  ];

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
          MUN Hub - Welcome {currentUser.firstname} {currentUser.flag} !
        </motion.h1>

        <motion.h2
        className="text-xl font-light"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        You are the delegate of {currentUser.delegation} in the committee {currentUser.committee}.
      </motion.h2>

      </header>

      <main className="flex-grow w-full max-w-4xl mx-auto mt-8">
        {/* dis is da beginning of da page content ya feel me */}
        <section className="w-full block mb-8">
            <CustomNav/>
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
                      href="./public/CLC SCHEDULE-2.pdf"
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
              <img 
          className="max-w-90 mr-auto ml-auto block p-4"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/UN_emblem_blue.svg/1024px-UN_emblem_blue.svg.png?20230920050537"
          alt="UN Emblem"
        />
            </section>
          </div>
        </section>

        {/* daniel dearest please put cards here */}
        <section className="w-full block mt-8">
          <h2 className=" text-center text-2xl font-semibold mb-4 text-white">
            Additional Resources
          </h2>
          <div className="flex flex-wrap">
            <div className="flex flex-row">
              {homepagecards.map((card, index) => (
                <motion.div 
                  key={index} 
                  className="w-1/3 p-2"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Link href="/login">
                    <Card className="bg-gray-800 text-white shadow-md rounded-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-900 hover:scale-105 h-40">
                      <CardHeader>
                        <CardTitle className="font-2xl">{card.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{card.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
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
