"use client";
import React, { useEffect, useState } from "react";
import { Reso } from "@/db/types";
import { useSession } from "../context/sessionContext";
import { Editor } from "@tiptap/react";
import { SimpleEditor } from "../../components/tiptap-templates/simple/simple-editor";
import { ParticipantRoute } from "@/components/protectedroute";
import { toast } from "sonner";
import { CustomNav } from "@/components/ui/customnav";
import role from "@/lib/roles";
// this page assumes that delegates can only post 1 reso, might be changed later

const Page = () => {
  const { user: currentUser } = useSession();
  const userRole = role(currentUser);
  const editorRef = React.useRef<Editor | null>(null);
  const [fetchedResos, setFetchedResos] = useState<Reso[]>([]);
  const [selectedReso, setSelectedReso] = useState<Reso | null>(null);

  if (userRole !== "delegate" && userRole !== "chair") {
    return (
      <div className="text-white bg-black min-h-screen text-center p-8">
        Only delegates or chairs can access this page.
      </div>
    );
  }

  const isDelegateUser = userRole === "delegate" && currentUser !== null;

  if (isDelegateUser && !((currentUser as any).resoPerms["view:ownreso"])) {
    return (
      <div className="text-white bg-black min-h-screen text-center p-8">
      <CustomNav/>
      <div className="mt-10">
      <p>
        You do not have permission to post resolutions.
      </p>
      <p>
        Please request access from your chair.
      </p>
      </div>
      </div>
    );
  }

  useEffect(() => {
    const fetchResos = async () => {
    let endpoint = "/api/resos";
    if (isDelegateUser) {
      if(!(currentUser as any).resoPerms["view:allreso"]) {
      endpoint += `/delegate?delegateID=${(currentUser as any).delegateID}`; 
      }
      else {
        endpoint += `/chair?committeeID=${(currentUser as any).committee.committeeID}`;
      }
    } else {
      endpoint += `/chair?committeeID=${(currentUser as any).committee.committeeID}`;
    }

    const res = await  fetch(endpoint)
    const data = await res.json();

    setFetchedResos(data);

  }

  fetchResos();

  }, []);

  const postReso = async () => {

    if (!editorRef.current) {
      toast.error("Editor not initialized");
      return;
    }

    if (!isDelegateUser && !selectedReso){
      toast.error("Only delegates can post resolutions.");
      return;
    }

    if (!((currentUser as any).resoPerms["update:ownreso"]) && isDelegateUser){
      toast.error("You do not have permission to post resolutions.");
      return;
    }

    if (selectedReso && selectedReso?.delegateID !== (currentUser as any).delegateID && isDelegateUser) {
      toast.error("You can only update your own resolutions.");
      return;
    }

    const content = editorRef.current.getJSON();

    if (fetchedResos.length >= 1 && !selectedReso) {
      toast.error("You can only post one resolution as a delegate.");
      return;
    }

    let delegateID = "0000";
    let committeeID = "0000";
    if (isDelegateUser) {
      delegateID = (currentUser as any).delegateID;
      committeeID = (currentUser as any).committee.committeeID;
    }

    const res = await fetch("/api/resos/delegate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resoID: selectedReso ? selectedReso.resoID : "-1",
        delegateID : (isDelegateUser ? delegateID : selectedReso?.delegateID),
        committeeID,
        content,
        isNew: !selectedReso,
      }),
    });

    if (!res.ok) {
      console.error("Failed to post resolution");
      return;
    }
    const newReso = await res.json();
    toast.success(
      `Resolution ${selectedReso ? "updated" : "posted"} successfully!`
    );

    if (!selectedReso && !fetchedResos.some(r => r.resoID === newReso.resoID)) {
      setFetchedResos(prev => [...prev, newReso]);
    }
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
        <CustomNav activeLink="resolutions" />
        <main className="flex-1 flex flex-col items-center justify-start px-2 py-6 md:py-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center mb-6 md:mb-10 tracking-tight drop-shadow-lg">
            RESOLUTIONS
          </h1>
          <div className="flex flex-col md:flex-row w-full max-w-8xl gap-6 md:gap-10">
            <aside className="w-full md:max-w-xs h-[350px] md:h-[80vh] overflow-y-auto bg-gradient-to-b from-gray-900/90 to-gray-800/80 text-white rounded-2xl shadow-2xl p-4 flex flex-col gap-3 mb-4 md:mb-0 border border-gray-700 backdrop-blur-md">
              <h2 className="text-xl md:text-2xl text-center font-extrabold mb-3 tracking-tight text-blue-400 drop-shadow">
                All Resolutions
              </h2>
              {fetchedResos.length === 0 ? (
                <div className="text-gray-400 text-center italic">
                  No resolutions found.
                </div>
              ) : (
                fetchedResos.map((reso, idx) => {
                  if (!reso) return null;
                  return (
                    <button
                      key={reso.resoID}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer border-2 shadow-md text-left font-semibold text-white mb-2
                        ${selectedReso?.resoID === reso.resoID
                          ? "border-blue-500 bg-gray-800/90 scale-[1.03]"
                          : "border-gray-700 bg-gray-900/80 hover:scale-[1.03] hover:border-blue-400/80 hover:bg-gray-800/80"}
                      `}
                      onClick={() => setSelectedReso(reso)}
                    >
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/80 text-white font-bold shadow">
                        {idx + 1}
                      </span>
                      <span className="text-lg flex-1">Resolution #{idx + 1}</span>
                      <span className="text-blue-400 text-xl">&gt;</span>
                    </button>
                  );
                })
              )}
            </aside>
            <section className="flex-1 flex flex-col bg-black/90 text-white outline outline-gray-800 rounded-lg shadow-lg p-4 min-h-[350px] h-[80vh] w-full md:w-[700px] mx-auto">
              <SimpleEditor
                ref={editorRef}
                content={selectedReso?.content || undefined}
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={postReso}
                  className="rounded-2xl  cursor-pointer px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition-colors"
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
