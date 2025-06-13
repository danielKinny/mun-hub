"use client";
import React, { useEffect, useState } from "react";
import { Reso } from "@/db/types";
import { useSession } from "../context/sessionContext";
import isDelegate from "@/lib/isdelegate";
import isParticipant from "@/lib/isparticipant";
import { Editor } from "@tiptap/react";
import { SimpleEditor } from "../../components/tiptap-templates/simple/simple-editor";
import { ParticipantRoute } from "@/components/protectedroute";
import {toast} from 'sonner';
import { CustomNav } from "@/components/ui/customnav";
// this page assumes that delegates can only post 1 reso, might be changed later


const Page = () => {
  const { user: currentUser } = useSession();
  const editorRef = React.useRef<Editor | null>(null);
  const [fetchedResos, setFetchedResos] = useState<Reso[]>([]);
  const [selectedReso, setSelectedReso] = useState<Reso | null>(null);

   if (!isParticipant(currentUser)) {
      return <div className="text-white bg-black min-h-screen text-center p-8">Only delegates or chairs can access this page.</div>;
    }

  // Example: fetchedContent would come from your database
  useEffect(() => {
    const fetchResos = async () => {
      const res = await fetch(
        isDelegate(currentUser) ?
          `/api/resos/delegate?delegateID=${currentUser?.delegateID}` :
          `/api/resos/chair?committeeID=${currentUser?.committee.committeeID
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
      toast.error("Editor not initialized");
      return;
    }

    const content = editorRef.current.getJSON();
    
    if (fetchedResos.length >= 1 && !selectedReso){
      toast.error("You can only post one resolution as a delegate.");
      return;
    }

    const res = await fetch("/api/resos/delegate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resoID : selectedReso ? selectedReso.resoID : -1,
        delegateID: isDelegate(currentUser) ? currentUser?.delegateID : "0000",
        committeeID: isDelegate(currentUser)
          ? currentUser?.committee.committeeID
          : "0000",
        content,
        isNew: !selectedReso,
      }),
    });

    if (!res.ok) {
      console.error("Failed to post resolution");
      return;
    }
    await res.json();
    toast.success(`Resolution ${selectedReso ? "updated" : "posted"} successfully!`);
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
    <ParticipantRoute>
      <div className="min-h-screen w-full bg-black flex flex-col">
        <CustomNav />
        <main className="flex-1 flex flex-col items-center justify-start px-2 py-6 md:py-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center mb-6 md:mb-10 tracking-tight drop-shadow-lg">
            RESOLUTIONS
          </h1>
          <div className="flex flex-col md:flex-row w-full max-w-8xl gap-6 md:gap-10">
            <aside className="w-full md:max-w-xs h-[350px] md:h-[80vh] overflow-y-auto bg-gray-900/80 text-white rounded-lg shadow-lg p-4 flex flex-col gap-2 mb-4 md:mb-0">
              <h2 className="text-lg md:text-xl text-center font-bold mb-2">All Resolutions</h2>
              {fetchedResos.length === 0 ? (
                <div className="text-gray-400 text-center">No resolutions found.</div>
              ) : (
                fetchedResos.map((reso, idx) => (
                  <button
                    key={reso.resoID}
                    className="font-bold outline outline-gray-800 rounded-lg px-3 py-2 mb-2 hover:bg-gray-700 cursor-pointer transition-colors text-left w-full"
                    onClick={() => { setSelectedReso(reso); }}
                  >
                    {`Resolution #${idx + 1}`}
                  </button>
                ))
              )}
            </aside>
            <section className="flex-1 flex flex-col bg-black/90 text-white outline outline-gray-800 rounded-lg shadow-lg p-4 min-h-[350px] h-[80vh] w-full md:w-[700px] mx-auto">
              <SimpleEditor
                ref={editorRef}
                content={ selectedReso?.content || undefined }
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={postReso}
                  className="rounded-2xl px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold shadow transition-colors"
                >
                  Post Resolution
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </ParticipantRoute>
  );
};

export default Page;
