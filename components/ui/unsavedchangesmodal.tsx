import React from "react";

interface UnsavedChangesModalProps {
  onCancel: () => void;
  onDiscard: () => void;
}

const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({ onCancel, onDiscard }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm animate-fadein">
    <div id="unsavedChangesModalContent" className="bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-700 animate-slidein-up relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
      <div className="absolute top-0 right-0 p-3">
        <div className="w-2 h-2 rounded-full bg-red-500 mr-1 inline-block"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1 inline-block"></div>
        <div className="w-2 h-2 rounded-full bg-green-500 inline-block"></div>
      </div>
      <div className="text-yellow-400 text-5xl mb-6 animate-pulse">⚠️</div>
      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
        Unsaved Changes Detected
      </h2>
      <p className="text-gray-300 mb-8">
        You have unsaved changes in your current speech. 
        Do you want to discard these changes and switch to another speech?
      </p>
      <div className="flex justify-between space-x-4">
        <button
          onClick={onCancel}
          className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-5 py-2.5 transition-all duration-200 flex-1 border border-gray-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
        >
          Keep Editing
        </button>
        <button
          onClick={onDiscard}
          className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white rounded-xl px-5 py-2.5 transition-all duration-200 flex-1 shadow-md hover:shadow-lg hover:shadow-red-500/30"
        >
          Discard Changes
        </button>
      </div>
    </div>
  </div>
);

export default UnsavedChangesModal;
