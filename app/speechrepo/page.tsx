"use client";
import React from "react";
import { useEffect, useMemo, useCallback, useState } from "react";
import { CustomNav } from "@/components/ui/customnav";
import { useSession } from "../context/sessionContext";
import { Speech } from "@/db/types";
import { ParticipantRoute } from "@/components/protectedroute";
import { toast } from "sonner";
import CountryOverlay from "@/components/ui/countryoverlay";
import UnsavedChangesModal from "@/components/ui/unsavedchangesmodal";
import DeleteConfirmModal from "@/components/ui/deleteconfirmmodal";
import {
  ArchiveBoxXMarkIcon,
  PlusCircleIcon,
  DocumentPlusIcon,
  MagnifyingGlassCircleIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import role from "@/lib/roles";

type Country = { countryID: string; flag: string; name: string };

const Page = () => {
  const { user: currentUser, login } = useSession();
  const userRole = role(currentUser);

  // Only delegates and chairs can access this page
  if (userRole !== "delegate" && userRole !== "chair") {
    return <div className="text-white text-center p-8">Only delegates or chairs can access this page.</div>;
  }

  // Type guards for role-specific access
  const isDelegateUser = userRole === "delegate" && currentUser !== null;
  const isChairUser = userRole === "chair" && currentUser !== null;

  const [countries, setCountries] = useState<Country[] | null>(null);
  const [speechTags, setSpeechTags] = useState<string[]>([]);
  const [speechList, setSpeechList] = useState<Speech[]>([]);
  const [heading, setHeading] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedSpeech, setSelectedSpeech] = useState<Speech | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showCountryOverlay, setShowCountryOverlay] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [pendingSpeechAction, setPendingSpeechAction] = useState<{
    type: "new" | "select";
    speech?: Speech;
  } | null>(null);

  const fetchSpeeches = useCallback(async () => {
    let response;
    if (isDelegateUser) {
      response = await fetch(`/api/speeches/delegate?delegateID=${(currentUser as any).delegateID}`);
    } else if (isChairUser) {
      response = await fetch(`/api/speeches/chair?chairID=${(currentUser as any).chairID}`);
    } else {
      return;
    }
    const data = await response.json();
    setSpeechList(data.speeches || []);
  }, [currentUser, userRole, isDelegateUser, isChairUser]);

  const fetchCountries = useCallback(async () => {
    let committeeID;
    if (isDelegateUser && (currentUser as any).committee) {
      committeeID = (currentUser as any).committee.committeeID;
    } else if (isChairUser && (currentUser as any).committee) {
      committeeID = (currentUser as any).committee.committeeID;
    } else {
      setCountries([]);
      return;
    }
    try {
      const response = await fetch(`/api/countries?committeeID=${committeeID}`);
      if (response.ok) {
        const data = await response.json();
        setCountries([...data]);
      } else {
        setCountries([]);
      }
    } catch {
      setCountries([]);
    }
  }, [currentUser, userRole, isDelegateUser, isChairUser]);

  const searchEngine = useCallback(
    (query: string) => {
      if (!query) {
        return speechList;
      }

      //clean the query for comparison
      const lowerCaseQuery = query.toLowerCase().trim();

      // hashset to store all country IDs that match the query
      const matchingCountryIDs = new Set(
        countries?.filter((country) =>
          country.name.toLowerCase().includes(lowerCaseQuery)
        ).map((country) => country.countryID)
      );

      return speechList.filter((speech) => {
        if (speech.title.toLowerCase().includes(lowerCaseQuery)) {
          return true;
        }
        if (matchingCountryIDs.size === 0) {
          return false;
        }

        return speech.tags?.some((tag) => matchingCountryIDs.has(tag)) || false;
      });
    },
    [speechList, countries]
  );

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

  const handleSpeechSwitch = useCallback((newSpeech: Speech | null) => {
    if (hasUnsavedChanges) {
      setPendingSpeechAction({
        type: newSpeech ? "select" : "new",
        speech: newSpeech || undefined,
      });
      setShowUnsavedChangesModal(true);
    } else {
      if (newSpeech) {
        setSelectedSpeech(newSpeech);
        setHeading(newSpeech.title);
        setContent(newSpeech.content);
        setSpeechTags(newSpeech.tags || []);
      } else {
        setSelectedSpeech(null);
        setHeading("");
        setContent("");
        setSpeechTags([]);
      }
    }
  }, [hasUnsavedChanges]);

  const confirmDiscardChanges = useCallback(() => {
    if (pendingSpeechAction?.type === "select" && pendingSpeechAction.speech) {
      const speech = pendingSpeechAction.speech;
      setSelectedSpeech(speech);
      setHeading(speech.title);
      setContent(speech.content);
      setSpeechTags(speech.tags || []);
    } else {
      setSelectedSpeech(null);
      setHeading("");
      setContent("");
      setSpeechTags([]);
    }
    
    setHasUnsavedChanges(false);
    setShowUnsavedChangesModal(false);
    setPendingSpeechAction(null);
  }, [pendingSpeechAction]);

  const cancelSpeechSwitch = useCallback(() => {
    const modal = document.getElementById('unsavedChangesModal');
    const modalContent = document.getElementById('unsavedChangesModalContent');
    
    if (modal && modalContent) {
      modalContent.classList.remove('animate-slidein-up');
      modalContent.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-300');
      modal.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      
      setTimeout(() => {
        setShowUnsavedChangesModal(false);
        setPendingSpeechAction(null);
      }, 300);
    } else {
      setShowUnsavedChangesModal(false);
      setPendingSpeechAction(null);
    }
  }, []);

  const addSpeech = useCallback(async () => {
    if (!isDelegateUser && !isChairUser) {
      toast.error("Only delegates or chairs can add speeches");
      return;
    }
    const user = currentUser as any;
    const speechData: Speech = {
      title: heading,
      speechID: selectedSpeech ? selectedSpeech?.speechID : "-1",
      content: content,
      date: new Date().toISOString(),
      tags: speechTags,
      delegateID: isDelegateUser ? user.delegateID : undefined,
      // chairID removed from Speech object
    };
    const endpoint = isDelegateUser ? "/api/speeches/delegate" : "/api/speeches/chair";
    const idKey = isDelegateUser ? "delegateID" : "chairID";
    const idValue = isDelegateUser ? user.delegateID : user.chairID;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        speechData,
        [idKey]: idValue,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      toast.success(
        `Speech ${selectedSpeech ? "updated" : "added"} successfully`
      );
      if (selectedSpeech) {
        setSpeechList((prev) =>
          prev.map((speech) =>
            speech.speechID === selectedSpeech.speechID ? { ...speechData, speechID: selectedSpeech.speechID } : speech
          )
        );
      } else {
        const newSpeech = { ...speechData, speechID: result.speechID };
        setSpeechList((prev) => [newSpeech, ...prev]);
      }
      setHeading("");
      setContent("");
      setSpeechTags([]);
      setHasUnsavedChanges(false);
    }
  }, [currentUser, heading, content, selectedSpeech, speechTags, login, userRole, isDelegateUser, isChairUser]);

  const handleDeleteClick = useCallback(() => {
    if (!selectedSpeech?.speechID) {
      toast.error("No speech selected to delete");
      return;
    }
    setShowDeleteConfirmModal(true);
  }, [selectedSpeech]);

  const cancelSpeechDelete = useCallback(() => {
    setShowDeleteConfirmModal(false);
  }, []);

  const confirmSpeechDelete = useCallback(async () => {
    if (!selectedSpeech?.speechID) {
      toast.error("No speech selected to delete");
      return;
    }

    const speechID = selectedSpeech.speechID;
    //reusing the delete route no matter the role because logic is unaffected
    const response = await fetch("/api/speeches/delegate", {
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
      setHasUnsavedChanges(false);
      setShowDeleteConfirmModal(false);
      toast.success("Speech deleted successfully");
      setSpeechList((prev) =>
        prev.filter((speech) => speech.speechID !== speechID)
      );
    }
  }, [selectedSpeech]);

  useEffect(() => {
    fetchSpeeches();
  }, [fetchSpeeches]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  useEffect(() => {
    if (!selectedSpeech) {
      setHasUnsavedChanges(heading !== "" || content !== "" || speechTags.length > 0);
    } else {
      const titleChanged = heading !== selectedSpeech.title;
      const contentChanged = content !== selectedSpeech.content;
      const tagsChanged = JSON.stringify(speechTags) !== JSON.stringify(selectedSpeech.tags || []);
      
      setHasUnsavedChanges(titleChanged || contentChanged || tagsChanged);
    }
  }, [heading, content, speechTags, selectedSpeech]);

  const filteredSpeeches = useMemo(
    () => searchEngine(searchQuery),
    [searchEngine, searchQuery]
  );

  return (
    <ParticipantRoute>
      <CustomNav />
      <div
        className="flex text-white p-4 bg-gradient-to-b from-black to-gray-950 min-h-screen relative overflow-hidden animate-fadein"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
        }}
      >
        <ul className="outline w-1/4 rounded-2xl p-4 bg-gradient-to-b from-gray-900 to-gray-950 shadow-xl border border-gray-800 animate-slidein-left">
          <div className="flex space-x-2 p-2">
            <input
              type="text"
              placeholder="Enter your speech name..."
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="outline w-full rounded-2xl p-2 mb-4 bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <div>
              <MagnifyingGlassCircleIcon className="w-10 h-10 text-white animate-bounce-slow" />
            </div>
          </div>
          <div className="space-y-2">
            {speechList && filteredSpeeches.length > 0 ? (
              filteredSpeeches.map((speech, idx) => (
                <li
                  key={speech.speechID}
                  className={`outline rounded-2xl p-4 mb-2 cursor-pointer backdrop-blur-sm transition-all duration-300 border border-gray-700 hover:border-blue-500 animate-fadein-up delay-[${idx * 50}ms] ` +
                    (selectedSpeech?.speechID === speech.speechID
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg shadow-blue-500/30 scale-[1.03]"
                      : "hover:bg-gray-700/70 bg-gray-800/50 hover:scale-105")}
                  onClick={() => handleSpeechSwitch(speech)}
                  style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
                >
                  <h2 className="text-lg font-bold animate-text-pop">{speech.title}</h2>
                  <p className="text-gray-300">
                    {speech.content.length > 18
                      ? speech.content.slice(0, 16) + "..."
                      : speech.content}
                  </p>
                </li>
              ))
            ) : (
              <div className="outline rounded-2xl p-6 text-center bg-gray-800/30 border border-gray-700 animate-fadein-up">
                <p className="text-gray-400 mb-2">No speeches found</p>
                <div className="text-4xl mb-3 animate-wiggle">📝</div>
                <p className="text-blue-400">
                  Create a new speech to get started
                </p>
              </div>
            )}
          </div>
        </ul>
        <div className="w-full h-screen space-y-2 p-4 animate-slidein-up">
          <div className="w-8/9 mx-8 pb-2 flex items-center">
            <p className="text-4xl font-bold mx-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-lg animate-text-pop">
              {(isDelegateUser || isChairUser) ? (currentUser as any).firstname : ""} Speech Repo
            </p>
            <div className="flex space-x-4 ml-auto">
              <button
                onClick={() => handleSpeechSwitch(null)}
                className="bg-gray-500 cursor-pointer text-white rounded-2xl p-2 shadow-md flex items-center space-x-1 transition-all duration-200 hover:bg-gray-600 active:scale-95 focus:scale-105 animate-btn-pop"
              >
                <p className="inline-block">New</p>
                <DocumentPlusIcon className="w-6 h-6 inline-block" />
              </button>
              <button
                onClick={() => setShowCountryOverlay(true)}
                className="bg-purple-500 cursor-pointer text-white rounded-2xl p-2 shadow-md flex items-center space-x-1 transition-all duration-200 hover:bg-purple-600 active:scale-95 focus:scale-105 animate-btn-pop"
              >
                <p className="inline-block">Tags</p>
                <TagIcon className="h-6 w-6 inline-block" />
              </button>
              <button
                onClick={() => {
                  addSpeech();
                }}
                className="bg-blue-500 cursor-pointer text-white rounded-2xl p-2 shadow-md flex items-center space-x-1 transition-all duration-200 hover:bg-blue-600 active:scale-95 focus:scale-105 animate-btn-pop"
                disabled={userRole !== "delegate" && userRole !== "chair"}
              >
                <p className="inline-block">
                  {selectedSpeech ? "Update" : "Add"}
                </p>
                <PlusCircleIcon className="h-6 w-6 inline-block" />
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-red-500 cursor-pointer text-white rounded-2xl p-2 shadow-md flex items-center space-x-1 transition-all duration-200 hover:bg-red-600 active:scale-95 focus:scale-105 animate-btn-pop"
                disabled={userRole !== "delegate" && userRole !== "chair"}
              >
                <p className="inline-block">Delete</p>
                <ArchiveBoxXMarkIcon className="h-6 w-6 inline-block" />
              </button>
            </div>
          </div>
          {speechTags.length > 0 && (
            <div className="space-x-2 mb-2 mx-12 p-2 animate-fadein">
              <p className="text-lg text-gray-300 inline-block mb-2">Tags:</p>
              <div className="space-x-2 inline-block">
                {speechTags.map((tag, idx) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full text-xl shadow-lg shadow-blue-500/20 inline-flex items-center justify-center"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    {
                      countries?.find((country) => country.countryID === tag)
                        ?.flag
                    }
                  </span>
                ))}
              </div>
            </div>
          )}
          <textarea
            className="block w-8/9 outline rounded-2xl mx-8 p-4 bg-gray-800/50 border border-gray-700 focus:border-blue-500 transition-all duration-300 animate-fadein-up"
            placeholder="Write your title here..."
            onChange={(e) => {
              setHeading(e.target.value);
            }}
            style={{ resize: "none" }}
            value={heading}
          ></textarea>
          <textarea
            className="outline w-8/9 rounded-2xl mx-8 p-4 h-187 bg-gray-800/50 border border-gray-700 focus:border-blue-500 transition-all duration-300 animate-fadein-up"
            placeholder="Write your speech here..."
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
            style={{ resize: "none" }}
          ></textarea>
        </div>
      </div>
      {showCountryOverlay && countries && (
        <CountryOverlay
          countries={countries}
          speechTags={speechTags}
          toggleCountrySelection={toggleCountrySelection}
          closeCountryOverlay={closeCountryOverlay}
        />
      )}
      {showUnsavedChangesModal && (
        <UnsavedChangesModal
          onCancel={cancelSpeechSwitch}
          onDiscard={confirmDiscardChanges}
        />
      )}
      {showDeleteConfirmModal && (
        <DeleteConfirmModal
          speechTitle={selectedSpeech?.title}
          onCancel={cancelSpeechDelete}
          onDelete={confirmSpeechDelete}
        />
      )}
    </ParticipantRoute>
  );
};
export default Page;
