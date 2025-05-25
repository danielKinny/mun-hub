"use client";
import React, { useEffect } from "react";
import { CustomNav } from "@/components/ui/customnav";
import { useSession } from "../context/sessionContext";
import { Speech } from "@/db/types";
import ProtectedRoute from "@/components/protectedroute";
import { toast } from "sonner";

const Page = () => {
  const { user: currentUser } = useSession();

  const [speechCount, setSpeechCount] = React.useState<number>(currentUser?.speechCount || 0);
  const [speechTags, setSpeechTags] = React.useState<string[]>([]);
  const [speechList, setSpeechList] = React.useState<Speech[]>([]);
  const [heading, setHeading] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  const fetchSpeeches = async () => {
        const response = await fetch(`/api/speeches?delegateID=${currentUser?.delegateID}`);
        let data = await response.json();
        setSpeechList(data.speeches);
      };

  const addSpeech = async () => {

    let speechData : Speech = {
      title: heading,
      content: content,
      speechID: `${currentUser?.delegateID}-${(speechCount + 1)}`,
    }
    const response = await fetch("/api/speeches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(speechData),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success("Speech added successfully");
      data.found ? setSpeechList((prev) => prev.map((speech) => speech.speechID === data.speech.speechID ? data.speech : speech))
      : setSpeechList((prev) => [...prev, data.speech]);
      setHeading("");
      setContent("");
      setSpeechCount((prev) => prev + 1);
    }
  }

  const deleteSpeech = async (speechID: string) => {
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
      setSpeechList((prev) => prev.filter((speech) => speech.speechID !== speechID));
    }
  };

  useEffect(() => {
    try {
      fetchSpeeches();
    } catch (error) {
      console.error("Error fetching speeches:", error);
      toast.error("Error fetching speeches");

      }
    }
  , []);

  return (
    <ProtectedRoute>
      <CustomNav />
      <h1 className="text-white text-center text-4xl font-bold"> {currentUser?.firstname}'s Speech Repository </h1>
      <div className="flex text-white h-screen p-4 bg-gradient-to-b from-black to-gray-950">
        <ul className="outline w-1/4 h-full rounded-2xl p-4">
          {
            (speechList && speechList.map((speech) => (
              <li
                key={speech.speechID}
                className="outline rounded-2xl p-4 mb-2 cursor-pointer hover:bg-gray-700"
                onClick={() => {
                  setHeading(speech.title);
                  setContent(speech.content);
                }}
              >
                <h2 className="text-lg font-bold">{speech.title}</h2>
                <p>{speech.content.length > 18 ? speech.content.slice(0,16) + "..." : speech.content}</p>
              </li>
            )))
          }
        </ul>
        <div className="w-full h-screen space-y-2 p-4">
          <div className="space-x-4 w-full mx-8">
            <button
            onClick = {() => { setHeading(""); setContent(""); }}
            className="bg-gray-500 cursor-pointer text-white rounded-2xl p-2 hover:bg-gray-600"
          >New Speech</button>
            <button
            onClick = {() => { addSpeech();}}
            className="bg-blue-500 cursor-pointer text-white rounded-2xl p-2 hover:bg-blue-600"
          >Add/Update Speech </button>

          <button 
          onClick = {() => { deleteSpeech(`${currentUser?.delegateID}-${speechCount+1}`);}}
          className=" bg-red-500 cursor-pointer text-white rounded-2xl p-2 hover:bg-red-600">
            Delete Speech
          </button>
          </div>
          <textarea
          className="block w-8/9 outline rounded-2xl mx-8 p-4"
          placeholder="Write your title here..."
          onChange={(e) => { setHeading(e.target.value); }
          }
          style={{ resize: "none"}}
          value={heading}
        ></textarea>
        <textarea
          className="outline w-8/9 rounded-2xl mx-8 p-4"
          placeholder="Write your speech here..."
          onChange={(e) => { setContent(e.target.value); }}
          value={content}
          style={{ resize: "none", height: "86vh"}}
        ></textarea>
        </div>
        
      </div>
    </ProtectedRoute>
  );
};
export default Page;
