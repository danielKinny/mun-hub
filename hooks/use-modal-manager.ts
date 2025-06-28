import { useState, useCallback } from 'react';
import { Speech } from '@/db/types';

interface PendingSpeechAction {
  type: "new" | "select";
  speech?: Speech;
}

export const useModalManager = () => {
  const [showCountryOverlay, setShowCountryOverlay] = useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [pendingSpeechAction, setPendingSpeechAction] = useState<PendingSpeechAction | null>(null);

  const openCountryOverlay = useCallback(() => {
    setShowCountryOverlay(true);
  }, []);

  const closeCountryOverlay = useCallback(() => {
    setShowCountryOverlay(false);
  }, []);

  const openDeleteConfirm = useCallback(() => {
    setShowDeleteConfirmModal(true);
  }, []);

  const closeDeleteConfirm = useCallback(() => {
    setShowDeleteConfirmModal(false);
  }, []);

  const openUnsavedChangesModal = useCallback((action: PendingSpeechAction) => {
    setPendingSpeechAction(action);
    setShowUnsavedChangesModal(true);
  }, []);

  const closeUnsavedChangesModal = useCallback(() => {
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

  const confirmUnsavedChanges = useCallback(() => {
    setShowUnsavedChangesModal(false);
    const action = pendingSpeechAction;
    setPendingSpeechAction(null);
    return action;
  }, [pendingSpeechAction]);

  return {

    showCountryOverlay,
    showUnsavedChangesModal,
    showDeleteConfirmModal,
    pendingSpeechAction,
    
    openCountryOverlay,
    closeCountryOverlay,
    openDeleteConfirm,
    closeDeleteConfirm,
    openUnsavedChangesModal,
    closeUnsavedChangesModal,
    confirmUnsavedChanges,
  };
};
