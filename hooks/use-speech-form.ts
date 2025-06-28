import { useState, useEffect, useCallback } from 'react';
import { Speech } from '@/db/types';
import { toast } from 'sonner';

interface ValidationRules {
  maxTitleLength: number;
  maxContentLength: number;
}

const DEFAULT_VALIDATION: ValidationRules = {
  maxTitleLength: 72,
  maxContentLength: 7000,
};

export const useSpeechForm = (
  selectedSpeech: Speech | null,
  validation: ValidationRules = DEFAULT_VALIDATION
) => {
  const [heading, setHeading] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [speechTags, setSpeechTags] = useState<string[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load selected speech data into form
  useEffect(() => {
    if (selectedSpeech) {
      setHeading(selectedSpeech.title);
      setContent(selectedSpeech.content);
      setSpeechTags(selectedSpeech.tags || []);
    } else {
      setHeading("");
      setContent("");
      setSpeechTags([]);
    }
  }, [selectedSpeech]);

  // Track unsaved changes
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

  const validateForm = useCallback((): string | null => {
    if (!heading.trim() || !content.trim()) {
      return "Title and content cannot be empty";
    }
    
    if (heading.length > validation.maxTitleLength) {
      return `Title cannot exceed ${validation.maxTitleLength} characters`;
    }
    
    if (content.length > validation.maxContentLength) {
      return `Content cannot exceed ${validation.maxContentLength} characters`;
    }
    
    return null;
  }, [heading, content, validation]);

  const resetForm = useCallback(() => {
    setHeading("");
    setContent("");
    setSpeechTags([]);
    setHasUnsavedChanges(false);
  }, []);

  const createSpeechData = useCallback((userID: string): Speech => {
    return {
      title: heading,
      speechID: selectedSpeech ? selectedSpeech.speechID : "-1",
      content: content,
      date: new Date().toISOString(),
      tags: speechTags,
      delegateID: userID,
    };
  }, [heading, content, speechTags, selectedSpeech]);

  const toggleTag = useCallback((tagID: string) => {
    setSpeechTags((prev) =>
      prev.includes(tagID)
        ? prev.filter((id) => id !== tagID)
        : [...prev, tagID]
    );
  }, []);

  return {
    // Form state
    heading,
    content,
    speechTags,
    hasUnsavedChanges,
    
    // Form actions
    setHeading,
    setContent,
    setSpeechTags,
    setHasUnsavedChanges,
    toggleTag,
    resetForm,
    validateForm,
    createSpeechData,
    
    // Computed values
    isUpdate: !!selectedSpeech,
    formData: { heading, content, speechTags },
  };
};
