"use client";
import React, { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/protectedroute";
import { useSession } from "../context/sessionContext";
import isDelegate from "@/lib/isdelegate";
import { Editor } from "@tiptap/react";
import { SimpleEditor } from "../../components/tiptap-templates/simple/simple-editor";

const Page = () => {
  const { user: currentUser } = useSession();
  const editorRef = React.useRef<Editor | null>(null);
  const [fetchedResos, setFetchedResos] = useState<any[]>([]);
  const [selectedReso, setSelectedReso] = useState<any | null>(0);

  // Example: fetchedContent would come from your database
  useEffect(() => {
    const fetchResos = async () => {
      const res = await fetch(
        `/api/resos/delegate?delegateID=${
          isDelegate(currentUser) ? currentUser?.delegateID : "0000"
        }`
      );
      if (!res.ok) {
        console.error("Failed to fetch resolutions");
        return;
      }
      const data = await res.json();
      setFetchedResos(data);
    };

    fetchResos();
  }, [currentUser]);

  const postReso = async () => {
    if (!editorRef.current) {
      console.error("Editor not initialized");
      return;
    }

    const content = editorRef.current.getJSON();
    const res = await fetch("/api/resos/delegate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        delegateID: isDelegate(currentUser) ? currentUser?.delegateID : "0000",
        committeeID: isDelegate(currentUser)
          ? currentUser?.committee.committeeID
          : "0000",
        content,
        isNew: selectedReso? true : false,
      }),
    });

    if (!res.ok) {
      console.error("Failed to post resolution");
      return;
    }

    const data = await res.json();
    console.log("Resolution posted:", data);
  };

  // this is specifically for logging and debugging, commenting it out until needed again, might be removed during refactor

  // const handlePrintContent = () => {
  //   //using this for logging
  //   const text = "<h1>Write your resolution here !</h1><p>placeholder cos idk what to say</p><ol><li><p>hahaha</p></li><li><p>hehehe</p></li><li><p>hohoho</p></li></ol><blockquote><p>this </p><p>is </p><p>going to be a list</p></blockquote><p><strong>does</strong> <em>this</em> <s>work</s></p> page.tsx:15:14"
  //   if (editorRef.current) {
  //     console.log(JSON.stringify(editorRef.current.getJSON()))
  //   } else {
  //     console.log('Editor not ready')
  //   }
  // }

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center w-full min-h-screen overflow-auto">
        <h1 className="cursor-pointer text-7xl font-extrabold text-white text-center transition-all mb-8">
          RESOLUTIONS
        </h1>
        <div className="flex w-full gap-8 ">
          <div className="min-w-1/6 max-w-xs h-[80vh] overflow-y-auto outline-2 outline-gray-900 text-white rounded shadow p-4 mr-4 flex flex-col gap-2">
            <h2 className="text-xl text-center font-bold mb-2">All Resolutions</h2>
            {fetchedResos.length === 0 ? (
              <div className="text-gray-400">No resolutions found.</div>
            ) : (
              fetchedResos.map((reso, idx) => (
                <button
                  key={idx}
                  className="font-extrabold outline outline-gray-800 rounded-lg px-3 py-2 mb-2 hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => { setSelectedReso(idx); }}
                >
                  {reso.title || `Resolution #${idx + 1}`}
                </button>
              ))
            )}
          </div>
          <div>
            <div className=" h-[80vh] w-325 bg-black text-white outline outline-gray-800 rounded shadow p-4">
              <SimpleEditor
                ref={editorRef}
                content={fetchedResos[selectedReso]?.content || ""}
              />
            </div>
            <div className="flex gap-6">
              <button
                onClick={postReso}
                className="mt-4 rounded-2xl px-4 py-2 cursor-pointer bg-green-600 text-white"
              >
                Post Resolution
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
