"use client";
import React, { useEffect } from "react";
import { CustomNav } from "@/components/ui/customnav";
import { useSession } from "../context/sessionContext";
import { Speech } from "@/db/types";
import ProtectedRoute from "@/components/protectedroute";
import { toast } from "sonner";

const Page = () => {
  const { user: currentUser } = useSession();
  const [speech, setSpeech] = React.useState<Speech>({
    speechID: "",
    title: "",
    content: "",
    tags: [],
  });

  const [speechList, setSpeechList] = React.useState<Speech[]>([]);
  const [heading, setHeading] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  const fetchSpeeches = async () => {
        const response = await fetch(`/api/speeches?delegateID=${currentUser?.id}`);
        let data = await response.json();
        setSpeechList(data.speeches);
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
      <h1 className="text-white text-center text-4xl font-bold"> {currentUser?.firstname}'s Speech Repository {currentUser?.flag}</h1>
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
          <textarea
          className="block w-8/9 outline rounded-2xl p-4 mx-8"
          placeholder="Write your title here..."
          onChange={(e) => { setHeading(e.target.value); }
          }
          style={{ resize: "none"}}
          value={heading}
        ></textarea>
        <textarea
          className="outline w-8/9 rounded-2xl p-4 mx-8 m"
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
