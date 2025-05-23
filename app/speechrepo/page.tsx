"use client";
import React, { useEffect } from "react";
import { CustomNav } from "@/components/ui/customnav";
import { speeches, delegates, countries } from "@/db/index";
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

  return (
    <ProtectedRoute>
      <CustomNav />
      <h1 className="text-white text-center text-4xl font-bold"> {currentUser?.firstname}'s Speech Repository {currentUser?.flag}</h1>
      <div className="flex text-white h-screen p-4 bg-gradient-to-b from-black to-gray-950">
        <div className="outline w-1/4 h-full rounded-2xl p-4">
          this will be were speeches are listed
        </div>
        <div className="w-full space-y-2">
          <textarea
          className="block w-full outline rounded-2xl p-4 ml-4"
          placeholder="Write your title here..."
          onChange={(e) => { setHeading(e.target.value); }
          }
          value={heading}
        ></textarea>
        <textarea
          className="outline w-full h-full rounded-2xl p-4 ml-4"
          placeholder="Write your speech here..."
          onChange={(e) => { setContent(e.target.value); }
          }
          value={content}
        ></textarea>
        </div>
        
      </div>
    </ProtectedRoute>
  );
};

export default Page;
