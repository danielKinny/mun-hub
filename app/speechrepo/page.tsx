"use client";
import React, { useEffect } from "react";
import { CustomNav } from "@/components/ui/customnav";
import { useSession } from "../context/sessionContext";
import { Speech, Country } from "@/db/types";
import ProtectedRoute from "@/components/protectedroute";
import { toast } from "sonner";
import { createSpeechID } from "@/lib/createID";

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

const Page = () => {
  const { user: currentUser } = useSession();

  const [speechCount, setSpeechCount] = React.useState<number>(currentUser?.speechCount || 0);
  const [speechTags, setSpeechTags] = React.useState<string[]>([]);
  const [speechList, setSpeechList] = React.useState<Speech[]>([]);
  const [heading, setHeading] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [selectedSpeech, setSelectedSpeech] = React.useState<Speech | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [showCountryOverlay, setShowCountryOverlay] = React.useState(false);

  const fetchSpeeches = async () => {
    const response = await fetch(
      `/api/speeches?delegateID=${currentUser?.delegateID}`
    );
    let data = await response.json();
    setSpeechList(data.speeches);
  };


  const searchEngine = (query: string) => {
    if (!query) {
      return speechList;
    }

    //clean the query for comparison
    
    const lowerCaseQuery = query.toLowerCase().trim();
    
    // hashset to store all country IDs that match the query
    // this seems unnecessary but may this might be used in the
    //future to filter speeches through a query which has multiple countries.
    
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
  };

  const toggleCountrySelection = (countryID: string) => {
    setSpeechTags((prev) =>
      prev.includes(countryID)
        ? prev.filter((id) => id !== countryID)
        : [...prev, countryID]
    );
  };

  const closeCountryOverlay = () => {
    setShowCountryOverlay(false);
  };

  const addSpeech = async () => {
    if (!currentUser?.delegateID) {
      toast.error("No delegateID found for current user");
      return;
    }
    let speechData: Speech = {
      title: heading,
      content: content,
      speechID: selectedSpeech
        ? selectedSpeech.speechID
        : createSpeechID(speechCount + 1),
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
    const data = await response.json();
    if (response.ok) {
      toast.success(
        `Speech ${selectedSpeech ? "updated" : "added"} successfully`
      );
      selectedSpeech
        ? setSpeechList((prev) =>
            prev.map((speech) =>
              speech.speechID === selectedSpeech.speechID ? speechData : speech
            )
          )
        : setSpeechList((prev) => [speechData, ...prev]);
      

      setHeading("");
      setContent("");
      setSpeechTags([]);
      selectedSpeech
        ? setSpeechCount(speechCount)
        : setSpeechCount(speechCount + 1);
      setSelectedSpeech(null);
    }
  };

  const deleteSpeech = async (speechID: string) => {
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
    const data = await response.json();
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
  };

  useEffect(() => {
    fetchSpeeches();
  }, []);

  useEffect(() => {
    if (speechList.length > 0 && !selectedSpeech) {
      const firstSpeech = speechList[0];
      setSelectedSpeech(firstSpeech);
      setHeading(firstSpeech.title);
      setContent(firstSpeech.content);
      setSpeechTags(firstSpeech.tags || []);
    }
  }, [speechList]);

  return (
    <ProtectedRoute>
      <CustomNav />
      <div className="flex text-white p-4 bg-gradient-to-b from-black to-gray-950">
        <ul className="outline w-1/4 rounded-2xl p-4">
          <div className="flex space-x-2 p-2">
            <input
              type="text"
              placeholder="Enter your speech name..."
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="outline w-full rounded-2xl p-2 mb-4"
            />
            <MagnifyingGlassCircleIcon className="w-10 h-10 text-white" />
          </div>
          {speechList &&
            searchEngine(searchQuery).map((speech) => (
              <li
                key={speech.speechID}
                className={`outline rounded-2xl p-4 mb-2 cursor-pointer ${
                  selectedSpeech?.speechID === speech.speechID
                    ? "bg-blue-700"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  setSelectedSpeech(speech);
                  setHeading(speech.title);
                  setContent(speech.content);
                  setSpeechTags(speech.tags || []);
                }}
              >
                <h2 className="text-lg font-bold">{speech.title}</h2>
                <p>
                  {speech.content.length > 18
                    ? speech.content.slice(0, 16) + "..."
                    : speech.content}
                </p>
              </li>
            ))}
        </ul>
        <div className="w-full h-screen space-y-2 p-4">
          <div className="w-8/9 mx-8 pb-2 flex">
            <p className="text-white text-4xl font-bold mx-4">
              {currentUser?.firstname}'s Speech Repo
            </p>
            <div className="flex space-x-4 ml-auto">
              <button
                onClick={() => {
                  setSelectedSpeech(null);
                  setHeading("");
                  setContent("");
                  setSpeechTags([]);
                }}
                className="bg-gray-500 cursor-pointer text-white rounded-2xl p-2 hover:bg-gray-600"
              >
                <p className="inline-block">New </p>{" "}
                <DocumentPlusIcon className="w-6 h-6 inline-block" />
              </button>
              <button
                onClick={() => setShowCountryOverlay(true)}
                className="bg-purple-500 cursor-pointer text-white rounded-2xl p-2 hover:bg-purple-600"
              >
                <p className="inline-block"> Tags </p>{" "}
                <TagIcon className="h-6 w-6 inline-block" />
              </button>
              <button
                onClick={() => {
                  addSpeech();
                }}
                className="bg-blue-500 cursor-pointer text-white rounded-2xl p-2 hover:bg-blue-600"
              >
                <p className="inline-block">
                  {" "}
                  {selectedSpeech ? "Update " : "Add "}
                </p>{" "}
                <PlusCircleIcon className="h-6 w-6 inline-block" />
              </button>

              <button
                onClick={() => {
                  deleteSpeech(selectedSpeech?.speechID || "");
                }}
                className=" bg-red-500 cursor-pointer text-white rounded-2xl p-2 hover:bg-red-600"
              >
                <p className="inline-block"> Delete </p>{" "}
                <ArchiveBoxXMarkIcon className="h-6 w-6 inline-block" />
              </button>
            </div>
          </div>
          {speechTags.length > 0 && (
            <div className="space-x-2 mb-2 mx-12 p-2">
              <p className="text-xl text-gray-300 inline-block  mb-2">Tags:</p>
              <div className="space-x-2 inline-block">
                {speechTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-xl"
                  >
                    {COUNTRIES.find((country) => country.countryID === tag)?.flag}{" "}
                  </span>
                ))}
              </div>
            </div>
          )}
          <textarea
            className="block w-8/9 outline rounded-2xl mx-8 p-4"
            placeholder="Write your title here..."
            onChange={(e) => {
              setHeading(e.target.value);
            }}
            style={{ resize: "none" }}
            value={heading}
          ></textarea>
          <textarea
            className="outline w-8/9 rounded-2xl mx-8 p-4 h-187"
            placeholder="Write your speech here..."
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
            style={{ resize: "none" }}
          ></textarea>
        </div>
      </div>
      {showCountryOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white text-gray-800 rounded-2xl p-8 max-h-[85vh] w-[90vw] max-w-md overflow-y-auto relative shadow-2xl border border-gray-200 animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-xl font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              onClick={closeCountryOverlay}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 pr-8">
              All Countries
            </h2>
            <div className="flex flex-col gap-2">
              {COUNTRIES.map((country, index) => (
                <div
                  key={country.countryID}
                  className="px-4 py-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 text-gray-800 border border-gray-200 hover:border-blue-300 flex items-center gap-3 cursor-pointer transition-all duration-200 hover:shadow-md animate-in slide-in-from-left duration-300"
                  style={{ animationDelay: `${index * 10}ms` }}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};
export default Page;
