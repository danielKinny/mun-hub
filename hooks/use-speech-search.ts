import { useMemo, useState, useCallback } from 'react';
import { Speech } from '@/db/types';

export const useSpeechSearch = (
  speechList: Speech[],
  searchCountries: (query: string) => Set<string>
) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchEngine = useCallback(
    (query: string) => {
      if (!query) {
        return speechList;
      }

      const lowerCaseQuery = query.toLowerCase().trim();
      const matchingCountryIDs = searchCountries(query);

      return speechList.filter((speech) => {
        if (speech.title.toLowerCase().includes(lowerCaseQuery)) {
          return true;
        }

        return speech.tags?.some((tag) => matchingCountryIDs.has(tag)) || false;
      });
    },
    [speechList, searchCountries]
  );

  const filteredSpeeches = useMemo(
    () => searchEngine(searchQuery),
    [searchEngine, searchQuery]
  );

  return {
    searchQuery,
    setSearchQuery,
    filteredSpeeches,
    searchEngine,
  };
};
