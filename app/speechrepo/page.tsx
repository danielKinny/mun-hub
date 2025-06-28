"use client";
import React from "react";
import { useEffect, useCallback, useState } from "react";
import { CustomNav } from "@/components/ui/customnav";
import { Speech } from "@/db/types";
import { ParticipantRoute } from "@/components/protectedroute";
import { toast } from "sonner";
import CountryOverlay from "@/components/ui/countryoverlay";
import UnsavedChangesModal from "@/components/ui/unsavedchangesmodal";
import DeleteConfirmModal from "@/components/ui/deleteconfirmmodal";
import { useMobile } from "@/hooks/use-mobile";
import { useUserRole } from "@/hooks/use-user-role";
import { useSpeechAPI } from "@/hooks/use-speech-api";
import { useSpeechForm } from "@/hooks/use-speech-form";
import { useCountries } from "@/hooks/use-countries";
import { useSpeechSearch } from "@/hooks/use-speech-search";
import { useModalManager } from "@/hooks/use-modal-manager";
import {
  ArchiveBoxXMarkIcon,
  PlusCircleIcon,
  DocumentPlusIcon,
  MagnifyingGlassCircleIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const Page = () => {
  const isMobile = useMobile();
  const [selectedSpeech, setSelectedSpeech] = useState<Speech | null>(null);
  
  const userRole = useUserRole();
  const { countries, getCountryFlag, searchCountries } = useCountries(userRole.getCommitteeID());
  const speechAPI = useSpeechAPI({
    userID: userRole.getUserID(),
    isDelegateUser: userRole.isDelegateUser,
    isChairUser: userRole.isChairUser,
    getApiEndpoint: userRole.getApiEndpoint,
    getApiParams: userRole.getApiParams,
  });
  
  const speechForm = useSpeechForm(selectedSpeech);
  const { searchQuery, setSearchQuery, filteredSpeeches } = useSpeechSearch(
    speechAPI.speechList,
    searchCountries
  );
  const modals = useModalManager();

  useEffect(() => {
    speechAPI.fetchSpeeches();
  }, [speechAPI.fetchSpeeches]);

  const handleSpeechSwitch = useCallback((newSpeech: Speech | null) => {
    if (speechForm.hasUnsavedChanges) {
      modals.openUnsavedChangesModal({
        type: newSpeech ? "select" : "new",
        speech: newSpeech || undefined,
      });
    } else {
      setSelectedSpeech(newSpeech);
    }
  }, [speechForm.hasUnsavedChanges, modals.openUnsavedChangesModal]);

  const confirmDiscardChanges = useCallback(() => {
    const action = modals.confirmUnsavedChanges();
    if (action?.type === "select" && action.speech) {
      setSelectedSpeech(action.speech);
    } else {
      setSelectedSpeech(null);
    }
    speechForm.setHasUnsavedChanges(false);
  }, [modals.confirmUnsavedChanges, speechForm.setHasUnsavedChanges]);

  const handleSaveSpeech = useCallback(async () => {
    if (!userRole.isParticipant) {
      toast.error("Only delegates or chairs can add speeches");
      return;
    }

    const validationError = speechForm.validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }
    
    const speechData = speechForm.createSpeechData(userRole.getUserID());
    const savedSpeech = await speechAPI.saveSpeech(speechData, speechForm.isUpdate);
    
    if (savedSpeech) {
      setSelectedSpeech(savedSpeech);
      speechForm.setHasUnsavedChanges(false);
    }
  }, [userRole, speechForm, speechAPI.saveSpeech]);

  const handleDeleteClick = useCallback(() => {
    if (!selectedSpeech?.speechID) {
      toast.error("No speech selected to delete");
      return;
    }
    modals.openDeleteConfirm();
  }, [selectedSpeech, modals.openDeleteConfirm]);

  const confirmSpeechDelete = useCallback(async () => {
    if (!selectedSpeech?.speechID) {
      toast.error("No speech selected to delete");
      return;
    }

    const success = await speechAPI.deleteSpeech(selectedSpeech.speechID);
    if (success) {
      setSelectedSpeech(null);
      speechForm.resetForm();
      modals.closeDeleteConfirm();
    }
  }, [selectedSpeech, speechAPI.deleteSpeech, speechForm.resetForm, modals.closeDeleteConfirm]);

  if (!userRole.isParticipant) {
    return (
      <ParticipantRoute>
        <CustomNav />
        <div className="text-white text-center p-8">Only delegates or chairs can access this page.</div>
      </ParticipantRoute>
    );
  }
  
  return (
    <ParticipantRoute>
      <CustomNav />
      <div
        className={`${isMobile ? 'flex flex-col' : 'flex'} text-white p-4 min-h-screen relative overflow-hidden animate-fadein`}
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%),
            linear-gradient(135deg, #000000 0%, #111827 50%, #000000 100%)
          `,
        }}
      >
        <ul className={`outline ${isMobile ? 'w-full mb-4' : 'w-1/4'} rounded-2xl p-4 bg-gradient-to-b from-gray-900 to-gray-950 shadow-xl border border-gray-800 ${isMobile ? 'animate-slidein-down' : 'animate-slidein-left'}`}>
          <div className="flex space-x-2 p-2">
            <input
              type="text"
              placeholder="Enter your speech name..."
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="outline w-full rounded-2xl p-2 mb-4 bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <div>
              <MagnifyingGlassCircleIcon className="w-10 h-12 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            {speechAPI.speechList && filteredSpeeches.length > 0 ? (
              filteredSpeeches.map((speech, idx) => (
                <li
                  key={speech.speechID}
                  className={`outline rounded-2xl p-4 mb-2 backdrop-blur-sm border border-gray-700 animate-fadein-up delay-[${idx * 50}ms] group hover-interactive ` +
                    (selectedSpeech?.speechID === speech.speechID
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg shadow-blue-500/30 scale-[1.03] border-blue-400"
                      : "bg-gray-800/50 hover:bg-gradient-to-r hover:from-gray-700/80 hover:to-gray-600/80 hover:border-blue-400")}
                  onClick={() => handleSpeechSwitch(speech)}
                >
                  <h2 className="text-lg font-bold animate-text-pop group-hover:text-blue-300 transition-colors duration-300">{speech.title}</h2>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
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
        <div className={`${isMobile ? 'w-full' : 'w-full'} space-y-2 p-4 animate-slidein-up`}>
          <div className={`${isMobile ? 'w-full flex-col mx-0' : 'w-8/9 mx-8'} pb-2 flex ${isMobile ? 'space-y-3' : 'items-center'}`}>
            <p className={`text-4xl font-bold ${isMobile ? 'mx-0 text-center' : 'mx-4'} bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-lg animate-text-pop`}>
              {userRole.getUserName()} Speech Repo
            </p>
            <div className={`flex ${isMobile ? 'w-full justify-center flex-wrap gap-2' : 'space-x-4 ml-auto'}`}>
              <button
                onClick={() => handleSpeechSwitch(null)}
                className="bg-gray-500 cursor-pointer text-white rounded-2xl p-2 shadow-md flex items-center space-x-1 transition-all duration-200 hover:bg-gray-600 active:scale-95 focus:scale-105 animate-btn-pop"
              >
                <p className="inline-block">New</p>
                <DocumentPlusIcon className="w-6 h-6 inline-block" />
              </button>
              <button
                onClick={modals.openCountryOverlay}
                className="bg-purple-500 cursor-pointer text-white rounded-2xl p-2 shadow-md flex items-center space-x-1 transition-all duration-200 hover:bg-purple-600 active:scale-95 focus:scale-105 animate-btn-pop"
              >
                <p className="inline-block">Tags</p>
                <TagIcon className="h-6 w-6 inline-block" />
              </button>
              <button
                onClick={handleSaveSpeech}
                className="bg-blue-500 cursor-pointer text-white rounded-2xl p-2 shadow-md flex items-center space-x-1 transition-all duration-200 hover:bg-blue-600 active:scale-95 focus:scale-105 animate-btn-pop"
                disabled={!userRole.isParticipant}
              >
                <p className="inline-block">
                  {selectedSpeech ? "Update" : "Add"}
                </p>
                <PlusCircleIcon className="h-6 w-6 inline-block" />
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-red-500 cursor-pointer text-white rounded-2xl p-2 shadow-md flex items-center space-x-1 transition-all duration-200 hover:bg-red-600 active:scale-95 focus:scale-105 animate-btn-pop"
                disabled={!userRole.isParticipant}
              >
                <p className="inline-block">Delete</p>
                <ArchiveBoxXMarkIcon className="h-6 w-6 inline-block" />
              </button>
            </div>
          </div>
          {speechForm.speechTags.length > 0 && (
            <div className={`${isMobile ? '' : 'space-x-2'} mb-2 ${isMobile ? 'mx-0' : 'mx-12'} p-2 animate-fadein`}>
              <p className={`text-lg text-gray-300 ${isMobile ? 'block' : 'inline-block'} mb-2`}>Tags:</p>
              <div className={`${isMobile ? 'flex flex-wrap gap-2' : 'space-x-2 inline-block'}`}>
                {speechForm.speechTags.map((tag, idx) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full text-xl shadow-lg shadow-blue-500/20 inline-flex items-center justify-center"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    {getCountryFlag(tag)}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="relative">
            <textarea
              className={`block ${isMobile ? 'w-full' : 'w-8/9'} outline rounded-2xl ${isMobile ? 'mx-0' : 'mx-8'} p-4 bg-gray-800/50 border border-gray-700 focus:border-blue-500 animate-fadein-up hover-interactive-large`}
              placeholder="Write your title here..."
              onChange={(e) => speechForm.setHeading(e.target.value)}
              style={{ resize: "none" }}
              value={speechForm.heading}
            ></textarea>
            <div className={`text-right text-gray-400 text-sm pr-6 pt-1 ${isMobile ? 'mr-0' : 'mr-8'}`}>
              {speechForm.heading.length} characters / 72 characters
            </div>
          </div>
          
          <div className="relative">
            <textarea
              className={`outline ${isMobile ? 'w-full' : 'w-8/9'} rounded-2xl ${isMobile ? 'mx-0' : 'mx-8'} p-4 ${isMobile ? 'h-64' : 'h-187'} bg-gray-800/50 border border-gray-700 focus:border-blue-500 animate-fadein-up hover-interactive-large`}
              placeholder="Write your speech here..."
              onChange={(e) => speechForm.setContent(e.target.value)}
              value={speechForm.content}
              style={{ resize: "none" }}
            ></textarea>
            <div className={`text-right text-gray-400 text-sm pr-6 pt-1 ${isMobile ? 'mr-0' : 'mr-12'}`}>
              {speechForm.content.length} characters / 7000 characters
            </div>
          </div>
        </div>
      </div>
      {modals.showCountryOverlay && countries && (
        <CountryOverlay
          countries={countries}
          speechTags={speechForm.speechTags}
          toggleCountrySelection={speechForm.toggleTag}
          closeCountryOverlay={modals.closeCountryOverlay}
        />
      )}
      {modals.showUnsavedChangesModal && (
        <UnsavedChangesModal
          onCancel={modals.closeUnsavedChangesModal}
          onDiscard={confirmDiscardChanges}
        />
      )}
      {modals.showDeleteConfirmModal && (
        <DeleteConfirmModal
          speechTitle={selectedSpeech?.title}
          onCancel={modals.closeDeleteConfirm}
          onDelete={confirmSpeechDelete}
        />
      )}
    </ParticipantRoute>
  );
};
export default Page;
