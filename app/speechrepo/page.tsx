"use client";
import React from "react";
import { useEffect, useMemo, useCallback, useState } from "react";
import { CustomNav } from "@/components/ui/customnav";
import { useSession } from "../context/sessionContext";
import { Speech } from "@/db/types";
import ProtectedRoute from "@/components/protectedroute";
import { toast } from "sonner";
import { createSpeechID } from "@/lib/createID";
import { motion } from "framer-motion";

import {
  ArchiveBoxXMarkIcon,
  PlusCircleIcon,
  DocumentPlusIcon,
  MagnifyingGlassCircleIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const COUNTRIES = [
  { countryID: "0001", flag: "🇺🇸", name: "United States" },
  { countryID: "0002", flag: "🇬🇧", name: "United Kingdom" },
  { countryID: "0003", flag: "🇫🇷", name: "France" },
  { countryID: "0004", flag: "🇩🇪", name: "Germany" },
  { countryID: "0005", flag: "🇮🇳", name: "India" },
  { countryID: "0006", flag: "🇨🇳", name: "China" },
  { countryID: "0007", flag: "🇷🇺", name: "Russia" },
  { countryID: "0008", flag: "🇧🇷", name: "Brazil" },
  { countryID: "0009", flag: "🇿🇦", name: "South Africa" },
  { countryID: "0010", flag: "🇯🇵", name: "Japan" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 260, 
      damping: 20 
    } 
  }
};

const Page = () => {
  const { user: currentUser } = useSession();
  
  const [speechTags, setSpeechTags] = useState<string[]>([]);
  const [speechList, setSpeechList] = useState<Speech[]>([]);
  const [heading, setHeading] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedSpeech, setSelectedSpeech] = useState<Speech | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showCountryOverlay, setShowCountryOverlay] = useState(false);

  const fetchSpeeches = useCallback(async () => {
    if (!currentUser?.delegateID) return;
    
    const response = await fetch(
      `/api/speeches?delegateID=${currentUser.delegateID}`
    );
    const data = await response.json();
    setSpeechList(data.speeches);
  }, [currentUser?.delegateID]);
  
  const searchEngine = useCallback((query: string) => {
    if (!query) {
      return speechList;
    }

    //clean the query for comparison
    const lowerCaseQuery = query.toLowerCase().trim();
    
    // hashset to store all country IDs that match the query
    const matchingCountryIDs = new Set(
      COUNTRIES
        .filter(country => country.name.toLowerCase().includes(lowerCaseQuery))
        .map(country => country.countryID)
    );

    return speechList.filter((speech) => {
      if (speech.title.toLowerCase().includes(lowerCaseQuery)) {
        return true;
      }
      if (matchingCountryIDs.size === 0) {
        return false;
      }
      
      return speech.tags?.some(tag => matchingCountryIDs.has(tag)) || false;
    });
  }, [speechList]);

  const toggleCountrySelection = useCallback((countryID: string) => {
    setSpeechTags((prev) =>
      prev.includes(countryID)
        ? prev.filter((id) => id !== countryID)
        : [...prev, countryID]
    );
  }, []);

  const closeCountryOverlay = useCallback(() => {
    setShowCountryOverlay(false);
  }, []);

  const addSpeech = useCallback(async () => {
    if (!currentUser?.delegateID) {
      toast.error("No delegateID found for current user");
      return;
    }
    const speechData: Speech = {
      title: heading,
      content: content,
      speechID: selectedSpeech
        ? selectedSpeech.speechID
        : createSpeechID((currentUser?.speechCount || 0) + 1),
      date: new Date().toISOString(), 
      tags: speechTags,
    };
    const response = await fetch("/api/speeches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ speechData, delegateID: currentUser.delegateID, tags: speechTags }),
    });
    await response.json();
    if (response.ok) {
      toast.success(
        `Speech ${selectedSpeech ? "updated" : "added"} successfully`
      );
      if(selectedSpeech){
         setSpeechList((prev) =>
            prev.map((speech) =>
              speech.speechID === selectedSpeech.speechID ? speechData : speech
            )
          )
     } else {
       setSpeechList((prev) => [speechData, ...prev]);
     }

      setHeading("");
      setContent("");
      setSpeechTags([]);
      
      
      setSelectedSpeech(null);
    }
  }, [currentUser?.delegateID, heading, content, selectedSpeech, currentUser?.speechCount, speechTags]);

  const deleteSpeech = useCallback(async (speechID: string) => {
    if (!speechID) {
      toast.error("No speech selected to delete");
      return;
    }
    const response = await fetch("/api/speeches", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ speechID }),
    });
    await response.json();
    if (response.ok) {
      setContent("");
      setHeading("");
      setSpeechTags([]);
      setSelectedSpeech(null);
      toast.success("Speech deleted successfully");
      setSpeechList((prev) =>
        prev.filter((speech) => speech.speechID !== speechID)
      );
    }
  }, []);

  useEffect(() => {
    fetchSpeeches();
  }, [fetchSpeeches]);
  
  const filteredSpeeches = useMemo(() => searchEngine(searchQuery), [searchEngine, searchQuery]);

  return (
    <ProtectedRoute>
      <CustomNav />
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="flex text-white p-4 bg-gradient-to-b from-black to-gray-950 min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
        }}
      >
        <motion.ul 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="outline w-1/4 rounded-2xl p-4 bg-gradient-to-b from-gray-900 to-gray-950 shadow-xl border border-gray-800"
        >
          <div className="flex space-x-2 p-2">
            <input
              type="text"
              placeholder="Enter your speech name..."
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="outline w-full rounded-2xl p-2 mb-4 bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <MagnifyingGlassCircleIcon className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            {speechList && filteredSpeeches.length > 0 ? (
              filteredSpeeches.map((speech) => (
                <motion.li
                  variants={itemVariants}
                  key={speech.speechID}
                  className={`outline rounded-2xl p-4 mb-2 cursor-pointer backdrop-blur-sm ${
                    selectedSpeech?.speechID === speech.speechID
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg shadow-blue-500/30"
                      : "hover:bg-gray-700/70 bg-gray-800/50"
                  } transition-all duration-200 border border-gray-700 hover:border-blue-500`}
                  onClick={() => {
                    setSelectedSpeech(speech);
                    setHeading(speech.title);
                    setContent(speech.content);
                    setSpeechTags(speech.tags || []);
                  }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h2 className="text-lg font-bold">{speech.title}</h2>
                  <p className="text-gray-300">
                    {speech.content.length > 18
                      ? speech.content.slice(0, 16) + "..."
                      : speech.content}
                  </p>
                </motion.li>
              ))
            ) : (
              <motion.div
                variants={itemVariants}
                className="outline rounded-2xl p-6 text-center bg-gray-800/30 border border-gray-700"
              >
                <p className="text-gray-400 mb-2">No speeches found</p>
                <motion.div 
                  className="text-4xl mb-3"
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 5,
                  }}
                >
                  📝
                </motion.div>
                <p className="text-blue-400">
                  Create a new speech to get started
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.ul>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full h-screen space-y-2 p-4"
        >
          <motion.div 
            className="w-8/9 mx-8 pb-2 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              className="text-4xl font-bold mx-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-lg"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {currentUser?.firstname} Speech Repo
            </motion.p>
            <div className="flex space-x-4 ml-auto">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgb(107, 114, 128)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSpeech(null);
                  setHeading("");
                  setContent("");
                  setSpeechTags([]);
                }}
                className="bg-gray-500 cursor-pointer text-white rounded-2xl p-2 shadow-md flex items-center space-x-1 transition-all duration-200"
              >
                <p className="inline-block">New</p>
                <DocumentPlusIcon className="w-6 h-6 inline-block" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgb(147, 51, 234)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCountryOverlay(true)}
                className="bg-purple-500 cursor-pointer text-white rounded-2xl p-2 shadow-md flex items-center space-x-1 transition-all duration-200"
              >
                <p className="inline-block">Tags</p>
                <TagIcon className="h-6 w-6 inline-block" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgb(59, 130, 246)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  addSpeech();
                }}
                className="bg-blue-500 cursor-pointer text-white rounded-2xl p-2 shadow-md flex items-center space-x-1 transition-all duration-200"
              >
                <p className="inline-block">
                  {selectedSpeech ? "Update" : "Add"}
                </p>
                <PlusCircleIcon className="h-6 w-6 inline-block" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgb(220, 38, 38)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  deleteSpeech(selectedSpeech?.speechID || "");
                }}
                className="bg-red-500 cursor-pointer text-white rounded-2xl p-2 shadow-md flex items-center space-x-1 transition-all duration-200"
              >
                <p className="inline-block">Delete</p>
                <ArchiveBoxXMarkIcon className="h-6 w-6 inline-block" />
              </motion.button>
            </div>
          </motion.div>
          {speechTags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-x-2 mb-2 mx-12 p-2"
            >
              <p className="text-lg text-gray-300 inline-block mb-2">Tags:</p>
              <div className="space-x-2 inline-block">
                {speechTags.map((tag, index) => (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    key={tag}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full text-xl shadow-lg shadow-blue-500/20 inline-flex items-center justify-center"
                  >
                    {COUNTRIES.find((country) => country.countryID === tag)?.flag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
          <motion.textarea
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)" }}
            className="block w-8/9 outline rounded-2xl mx-8 p-4 bg-gray-800/50 border border-gray-700 focus:border-blue-500 transition-all duration-300"
            placeholder="Write your title here..."
            onChange={(e) => {
              setHeading(e.target.value);
            }}
            style={{ resize: "none" }}
            value={heading}
          ></motion.textarea>
          <motion.textarea
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)" }}
            className="outline w-8/9 rounded-2xl mx-8 p-4 h-187 bg-gray-800/50 border border-gray-700 focus:border-blue-500 transition-all duration-300"
            placeholder="Write your speech here..."
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
            style={{ resize: "none" }}
          ></motion.textarea>
        </motion.div>
      </motion.div>
      {showCountryOverlay && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 rounded-2xl p-8 max-h-[85vh] w-[90vw] max-w-md overflow-y-auto relative shadow-2xl border border-gray-200"
          >
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-xl font-bold text-gray-500 hover:text-red-500 rounded-full transition-colors"
              onClick={closeCountryOverlay}
            >
              ×
            </motion.button>
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold mb-6 pr-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-purple-800"
            >
              Select Countries
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-2"
            >
              {COUNTRIES.map((country, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  key={country.countryID}
                  className="px-4 py-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 text-gray-800 border border-gray-200 hover:border-blue-300 flex items-center gap-3 cursor-pointer transition-all duration-200 hover:shadow-md"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleCountrySelection(country.countryID)}
                >
                  <input
                    type="checkbox"
                    checked={speechTags.includes(country.countryID)}
                    onChange={() => toggleCountrySelection(country.countryID)}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-2xl">{country.flag}</span>
                  <span className="font-medium">{country.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </ProtectedRoute>
  );
};
export default Page;
