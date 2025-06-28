import { useState, useCallback } from 'react';
import { Speech } from '@/db/types';
import { toast } from 'sonner';

interface UseSpechAPIProps {
  userID: string;
  isDelegateUser: boolean;
  isChairUser: boolean;
  getApiEndpoint: () => string;
  getApiParams: () => { idKey: string; idValue: string };
}

export const useSpeechAPI = ({ 
  userID, 
  isDelegateUser, 
  isChairUser, 
  getApiEndpoint, 
  getApiParams 
}: UseSpechAPIProps) => {
  const [speechList, setSpeechList] = useState<Speech[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSpeeches = useCallback(async () => {
    if (!isDelegateUser && !isChairUser) return;
    
    try {
      setLoading(true);
      const endpoint = getApiEndpoint();
      const { idKey, idValue } = getApiParams();
      
      const response = await fetch(`${endpoint}?${idKey}=${idValue}`);
      
      if (response.ok) {
        const data = await response.json();
        setSpeechList(data.speeches || []);
      } else {
        console.error("Failed to fetch speeches");
        setSpeechList([]);
      }
    } catch (error) {
      console.error("Error fetching speeches:", error);
      setSpeechList([]);
    } finally {
      setLoading(false);
    }
  }, [isDelegateUser, isChairUser, getApiEndpoint, getApiParams]);

  const saveSpeech = useCallback(async (speechData: Speech, isUpdate: boolean) => {
    try {
      const endpoint = getApiEndpoint();
      const { idKey, idValue } = getApiParams();
      
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
        toast.success(`Speech ${isUpdate ? "updated" : "added"} successfully`);
        
        if (isUpdate) {
          const updatedSpeech = { ...speechData, speechID: speechData.speechID };
          setSpeechList((prev) =>
            prev.map((speech) =>
              speech.speechID === speechData.speechID ? updatedSpeech : speech
            )
          );
          return updatedSpeech;
        } else {
          const newSpeech = { ...speechData, speechID: result.speechID };
          setSpeechList((prev) => [newSpeech, ...prev]);
          return newSpeech;
        }
      } else {
        toast.error(result.error || "Failed to save speech");
        return null;
      }
    } catch (error) {
      toast.error("Error saving speech");
      console.error("Save error:", error);
      return null;
    }
  }, [getApiEndpoint, getApiParams]);

  const deleteSpeech = useCallback(async (speechID: string) => {
    try {
      const response = await fetch("/api/speeches/delegate", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ speechID }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast.success("Speech deleted successfully");
        setSpeechList((prev) =>
          prev.filter((speech) => speech.speechID !== speechID)
        );
        return true;
      } else {
        toast.error(result.error || "Failed to delete speech");
        return false;
      }
    } catch (error) {
      toast.error("Error deleting speech");
      console.error("Delete error:", error);
      return false;
    }
  }, []);

  return {
    speechList,
    loading,
    fetchSpeeches,
    saveSpeech,
    deleteSpeech,
    setSpeechList,
  };
};
