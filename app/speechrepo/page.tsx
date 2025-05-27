"use client";
import React, { useEffect } from "react";
import { CustomNav } from "@/components/ui/customnav";
import { useSession } from "../context/sessionContext";
import { Speech } from "@/db/types";
import ProtectedRoute from "@/components/protectedroute";
import { toast } from "sonner";
import { createSpeechID } from "@/lib/createID";

import {
  ArchiveBoxXMarkIcon,
  PlusCircleIcon,
  DocumentPlusIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";

const Page = () => {
  const { user: currentUser } = useSession();

  const [speechCount, setSpeechCount] = React.useState<number>(
    currentUser?.speechCount || 0
  );
  const [speechTags, setSpeechTags] = React.useState<string[]>([]);
  const [speechList, setSpeechList] = React.useState<Speech[]>([]);
  const [heading, setHeading] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [selectedSpeech, setSelectedSpeech] = React.useState<Speech | null>(
    null
  );
  const [searchQuery, setSearchQuery] = React.useState<string>("");

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
    return speechList.filter((speech) =>
      speech.title.toLowerCase().includes(query.toLowerCase())
    );
  }


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
    };
    const response = await fetch("/api/speeches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ speechData, delegateID: currentUser.delegateID }),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success(
        `Speech ${selectedSpeech ? "added" : "updated"} successfully`
      );
      selectedSpeech
        ? setSpeechList((prev) =>
            prev.map((speech) =>
              speech.speechID === selectedSpeech.speechID ? speechData : speech
            )
          )
        : setSpeechList((prev) => [...prev, speechData]);
      setHeading("");
      setContent("");
      console.log(speechData.speechID);
      selectedSpeech
        ? setSpeechCount(speechCount)
        : setSpeechCount(speechCount + 1);
      console.log("new speech count: ", speechCount);
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
      toast.success("Speech deleted successfully");
      setSpeechList((prev) =>
        prev.filter((speech) => speech.speechID !== speechID)
      );
    }
  };

  useEffect(() => {
    try {
      fetchSpeeches();
    } catch (error) {
      console.error("Error fetching speeches:", error);
      toast.error("Error fetching speeches");
    }

    if (speechList.length > 0) {
      setSelectedSpeech(speechList[0]);
    } else {
      setSelectedSpeech(null);
    }
    setHeading(selectedSpeech?.title || "");
    setContent(selectedSpeech?.content || "");
  }, []);

  return (
    <ProtectedRoute>
      <CustomNav />
      <div className="flex text-white p-4 bg-gradient-to-b from-black to-gray-950">
        <ul className="outline w-1/4 rounded-2xl p-4">
        <div className="flex space-x-2 p-2">
          <input type="text" placeholder="Enter your speech name..." onChange = {(e) => setSearchQuery(e.target.value)} value={searchQuery} className="outline w-full rounded-2xl p-2 mb-4"/>
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
                }}
                className="bg-gray-500 cursor-pointer text-white rounded-2xl p-2 hover:bg-gray-600"
              >
                <p className="inline-block">New Speech</p>{" "}
                <DocumentPlusIcon className="w-6 h-6 inline-block" />
              </button>
              <button
                onClick={() => {
                  addSpeech();
                }}
                className="bg-blue-500 cursor-pointer text-white rounded-2xl p-2 hover:bg-blue-600"
              >
                <p className="inline-block">
                  {" "}
                  {selectedSpeech ? "Update" : "Add"} Speech{" "}
                </p>{" "}
                <PlusCircleIcon className="h-6 w-6 inline-block" />
              </button>

              <button
                onClick={() => {
                  deleteSpeech(selectedSpeech?.speechID || "");
                }}
                className=" bg-red-500 cursor-pointer text-white rounded-2xl p-2 hover:bg-red-600"
              >
                <p className="inline-block"> Delete Speech </p>{" "}
                <ArchiveBoxXMarkIcon className="h-6 w-6 inline-block" />
              </button>
            </div>
          </div>
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
    </ProtectedRoute>
  );
};
export default Page;
