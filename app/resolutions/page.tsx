"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Reso, Delegate, Chair, shortenedDel } from "@/db/types";
import { useSession } from "../context/sessionContext";
import { Editor } from "@tiptap/react";
import { SimpleEditor } from "../../components/tiptap-templates/simple/simple-editor";
import { ParticipantRoute } from "@/components/protectedroute";
import { toast } from "sonner";
import { CustomNav } from "@/components/ui/customnav";
import role from "@/lib/roles";
import supabase from "@/lib/supabase";
// this page assumes that delegates can only post 1 reso, might be changed later

const Page = () => {
  const { user: currentUser, login } = useSession();
  const userRole = role(currentUser);
  const editorRef = React.useRef<Editor | null>(null);
  const [fetchedResos, setFetchedResos] = useState<Reso[]>([]);
  const [selectedReso, setSelectedReso] = useState<Reso | null>(null);
  const [delegates, setDelegates] = useState<shortenedDel[]>([]);
  const isDelegateUser = userRole === "delegate" && currentUser !== null;

  const logBackIn = useCallback(async () => {
    if (!currentUser) {
      toast.error("No user logged in");
      return null;
    }

    if (userRole === "delegate") {
      const {data : newPerms, error : permsError} = await supabase
        .from("Delegate")
        .select("resoPerms")
        .eq("delegateID", (currentUser as Delegate).delegateID)
        .single();
      if (permsError) {
        console.error("Failed to fetch delegate permissions:", permsError);
        toast.error("Failed to fetch delegate permissions");
        return null;
      }

      const delegateUser = currentUser as Delegate;
      const enrichedUser: Delegate = {
        ...delegateUser,
        resoPerms: newPerms.resoPerms || {
          "view:ownreso": false,
          "view:allreso": false,
          "update:ownreso": false,
          "update:reso": [],
        },
      };
      if (JSON.stringify(delegateUser.resoPerms) !== JSON.stringify(enrichedUser.resoPerms)) {
        login(enrichedUser);
      }
      return enrichedUser;
    }
    return currentUser;
  }, [currentUser, userRole, login]);

  useEffect( () => {

    const fetchDels = async() => {
      if (!currentUser) return;

      const res = await fetch(`/api/delegates?committeeID=${(currentUser as Chair).committee.committeeID}`);
      const data = await res.json();
      setDelegates(data);
    }
    if (currentUser && 'chairID' in currentUser) {

      fetchDels();

    }
  }, [currentUser])

  useEffect( () => {
    logBackIn();
  }, [logBackIn]) // added logBackIn to dependencies

  // Only depend on currentUser for fetching resolutions
  useEffect(() => {
    const fetchResos = async () => {
      if (!currentUser) return;

      let endpoint = "/api/resos";
      if (role(currentUser) === "delegate" && currentUser !== null) {
        const delegateUser = currentUser as Delegate;
        if (!delegateUser.resoPerms["view:allreso"]) {
          endpoint += `/delegate?delegateID=${delegateUser.delegateID}`;
        } else {
          endpoint += `/chair?committeeID=${delegateUser.committee.committeeID}`;
        }
      } else if (role(currentUser) === "chair") {
        const chairUser = currentUser as Chair;
        endpoint += `/chair?committeeID=${chairUser.committee.committeeID}`;
      }

      const res = await fetch(endpoint);
      const data = await res.json();
      setFetchedResos(data);
    };

    fetchResos();
  }, [currentUser]);

  const postReso = async () => {
    const updatedUser = await logBackIn();
    if (!updatedUser) return;

    const isDelegateUser = role(updatedUser) === "delegate" && updatedUser !== null;

    if (!editorRef.current) {
      toast.error("Editor not initialized");
      return;
    }

    if (!isDelegateUser && !selectedReso) {
      toast.error("Only delegates can post resolutions.");
      return;
    }

    if (isDelegateUser) {
      const delegateUser = updatedUser as Delegate;
      if (!delegateUser.resoPerms["update:ownreso"] && selectedReso?.delegateID === delegateUser.delegateID) {
        toast.error("You do not have permission to post resolutions.");
        return;
      }
      if (
        selectedReso &&
        (selectedReso?.delegateID !== delegateUser.delegateID
        && !(delegateUser.resoPerms["update:reso"]?.includes(selectedReso.resoID)))
      ) {
        toast.error("You can only update your own resolutions.");
        return;
      }
    }

    const content = editorRef.current.getJSON();

    const delegateUser = updatedUser as Delegate;
    const ownResos = fetchedResos.filter(
      (reso) => reso.delegateID === delegateUser.delegateID
    );
    if (ownResos.length >= 1 && !selectedReso) {
      toast.error("You can only post one resolution as a delegate.");
      return;
    }

    let delegateID = "0000";
    let committeeID = "0000";

    if (isDelegateUser) {
      const delegateUser = updatedUser as Delegate;
      delegateID = delegateUser.delegateID;
      committeeID = delegateUser.committee.committeeID;
    }

    const res = await fetch("/api/resos/delegate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resoID: selectedReso ? selectedReso.resoID : "-1",
        delegateID: isDelegateUser ? delegateID : selectedReso?.delegateID,
        committeeID,
        content,
        isNew: !selectedReso,
      }),
    });

    if (!res.ok) {
      toast.error("Failed to post resolution");
      return;
    }
    const newReso = await res.json();
    toast.success(
      `Resolution ${selectedReso ? "updated" : "posted"} successfully!`
    );

    if (
      !selectedReso &&
      !fetchedResos.some((r) => r.resoID === newReso.resoID)
    ) {
      setFetchedResos((prev) => [...prev, newReso]);
    }
  };

  const toggleResoUpdatePermission = async (delegateID: string) => {
    if (!currentUser || !selectedReso || userRole !== "chair") {
      return;
    }

    try {
      const delegate = delegates.find(d => d.delegateID === delegateID);
      if (!delegate) return;

      const hasPermission = 
        delegate.resoPerms && 
        delegate.resoPerms["update:reso"] && 
        Array.isArray(delegate.resoPerms["update:reso"]) && 
        delegate.resoPerms["update:reso"].includes(selectedReso.resoID);

      let updatedPermissions;
      
      if (hasPermission) {
        updatedPermissions = {
          ...delegate.resoPerms,
          "update:reso": delegate.resoPerms["update:reso"].filter(id => id !== selectedReso.resoID)
        };
      } else {
        updatedPermissions = {
          ...delegate.resoPerms,
          "update:reso": [
            ...(Array.isArray(delegate.resoPerms["update:reso"]) ? delegate.resoPerms["update:reso"] : []),
            selectedReso.resoID
          ]
        };
      }

      const res = await fetch(`/api/delegates`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          delegateID: delegateID,
          resoPerms: updatedPermissions
        })
      });

      if (!res.ok) {
        throw new Error('Failed to update permissions');
      }

      setDelegates(delegates.map(d => 
        d.delegateID === delegateID 
          ? { ...d, resoPerms: updatedPermissions }
          : d
      ));
      
      toast.success(`Permission ${hasPermission ? 'removed from' : 'granted to'} ${delegate.firstname}`);
    } catch (error) {
      console.error('Error updating permissions:', error);
      toast.error('Failed to update permissions');
    }
  };

  if (userRole !== "delegate" && userRole !== "chair") {
    return (
      <div className="text-white bg-black min-h-screen text-center p-8">
        Only delegates or chairs can access this page.
      </div>
    );
  }

  if (isDelegateUser) {
    const delegateUser = currentUser as Delegate;
    if (!delegateUser.resoPerms["view:ownreso"]) {
      return (
        <div className="text-white bg-black min-h-screen text-center">
          <CustomNav role={userRole} />
          <div className="mt-10">
            {currentUser && "delegateID" in currentUser && (
              <>
                <button
                  onClick={() => {
                    logBackIn();
                    toast.success("Page reloaded successfully!");
                  }}
                  className="mb-4 px-6 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors"
                >
                  Reload
                </button>
              </>
            )}
            <p>You do not have permission to post resolutions.</p>
            <p>Please request access from your chair.</p>
          </div>
        </div>
      );
    }
  }

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
      <div className="min-h-screen w-full bg-black flex flex-col overflow-hidden">
        <CustomNav activeLink="resolutions" />
        <main className="flex-1 flex flex-col items-center justify-start px-2 py-4 md:py-6 overflow-y-auto">
          <div className="flex items-center justify-center gap-4 mb-4 md:mb-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center tracking-tight drop-shadow-lg">
              RESOLUTIONS
            </h1>
          </div>
          <div className="flex flex-col md:flex-row w-full max-w-7xl gap-4 md:gap-6 px-2 mb-8">
            <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4">
              <aside className="w-full max-h-[300px] md:max-h-[500px] overflow-y-auto bg-gradient-to-b from-gray-900/95 to-gray-800/90 text-white rounded-2xl shadow-2xl p-4 flex flex-col gap-3 mb-4 md:mb-0 border border-gray-700 backdrop-blur-md">
                <h2 className="text-xl md:text-2xl text-center font-extrabold mb-3 tracking-tight text-blue-400 drop-shadow">
                  All Resolutions
                </h2>
                {fetchedResos.length === 0 ? (
                  <div className="text-gray-400 text-center italic p-4">
                    No resolutions found.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {fetchedResos.map((reso, idx) => {
                      if (!reso) return null;
                      return (
                        <button
                          key={reso.resoID}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer border-2 shadow-md text-left font-semibold text-white
                        ${
                          selectedReso?.resoID === reso.resoID
                            ? "border-blue-500 bg-gray-800/90 scale-[1.02]"
                            : "border-gray-700 bg-gray-900/80 hover:scale-[1.02] hover:border-blue-400/80 hover:bg-gray-800/80"
                        }
                      `}
                          onClick={() => setSelectedReso(reso)}
                        >
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/80 text-white font-bold shadow">
                            {idx + 1}
                          </span>
                          <span className="text-sm md:text-base flex-1">
                            Resolution #{idx + 1}
                          </span>
                          <span className="text-blue-400 text-lg">&gt;</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </aside>
              {selectedReso && userRole === "chair" && delegates.length > 0 && (
                <div className="w-full bg-gray-900/90 text-white rounded-lg shadow-lg p-4 flex-shrink-0">
                  <h3 className="text-lg font-bold mb-2 text-blue-400">Update Permissions</h3>
                  <div className="max-h-[200px] overflow-y-auto overscroll-contain">
                    <ul className="space-y-1">
                      {
                        [...delegates].sort((a, b) => 
                          `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`)
                        ).map((delegate) => (
                          <li
                            key={delegate.delegateID}
                            className="flex items-center justify-between p-2 hover:bg-gray-800/80 rounded-lg transition-colors"
                          >
                            <span className="font-semibold truncate mr-2">
                              {delegate.firstname} {delegate.lastname}
                            </span>
                            <input 
                              type="checkbox" 
                              checked={delegate.resoPerms && 
                                delegate.resoPerms["update:reso"] && 
                                Array.isArray(delegate.resoPerms["update:reso"]) && 
                                delegate.resoPerms["update:reso"].includes(selectedReso.resoID)}
                              onChange={() => toggleResoUpdatePermission(delegate.delegateID)}
                              className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 h-4 w-4"
                              title="Update permission"
                              disabled={userRole !== "chair"}
                            />
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <section className="flex-1 flex flex-col bg-black/90 text-white border border-gray-800 rounded-lg shadow-lg p-2 md:p-4 max-h-[500px] md:max-h-[600px] overflow-auto relative z-0">
              <div className="flex-1 overflow-auto">
                {" "}
                <SimpleEditor
                  ref={editorRef}
                  content={selectedReso?.content || undefined}
                  className="h-full toolbar-fixed"
                />
              </div>
              <div className="flex justify-end mt-3 pb-1 sticky bottom-0 right-0 z-10 bg-gradient-to-t from-black to-transparent pt-4">
                <button
                  onClick={postReso}
                  className="rounded-lg cursor-pointer px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-colors"
                >
                  {selectedReso ? "Update Resolution" : "Post Resolution"}
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
