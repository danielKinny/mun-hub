import React from "react";

interface DeleteConfirmModalProps {
  speechTitle?: string;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ speechTitle, onCancel, onDelete }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm animate-fadein">
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-700 animate-slidein-up relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
      <div className="text-red-400 text-5xl mb-6 animate-bounce-slow">🗑️</div>
      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-red-500">
        Confirm Delete
      </h2>
      <p className="text-gray-300 mb-8">
        Are you sure you want to delete <span className="text-white font-semibold">-{speechTitle}-</span>? 
        <br />This action cannot be undone.
      </p>
      <div className="flex justify-between space-x-4">
        <button
          onClick={onCancel}
          className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-5 py-2.5 transition-all duration-200 flex-1 border border-gray-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white rounded-xl px-5 py-2.5 transition-all duration-200 flex-1 shadow-md hover:shadow-lg hover:shadow-red-500/30"
        >
          Delete Forever
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;
