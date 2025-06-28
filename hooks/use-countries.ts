import { useState, useCallback, useEffect } from 'react';

type Country = { countryID: string; flag: string; name: string };

export const useCountries = (committeeID: string | null) => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCountries = useCallback(async () => {
    if (!committeeID) {
      setCountries([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/countries?committeeID=${committeeID}`);
      if (response.ok) {
        const data = await response.json();
        setCountries([...data]);
      } else {
        setCountries([]);
      }
    } catch {
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }, [committeeID]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const getCountryFlag = useCallback((countryID: string) => {
    return countries?.find((country) => country.countryID === countryID)?.flag;
  }, [countries]);

  const searchCountries = useCallback((query: string) => {
    if (!countries || !query) return new Set<string>();
    
    const lowerCaseQuery = query.toLowerCase().trim();
    return new Set(
      countries
        .filter((country) =>
          country.name.toLowerCase().includes(lowerCaseQuery)
        )
        .map((country) => country.countryID)
    );
  }, [countries]);

  return {
    countries,
    loading,
    fetchCountries,
    getCountryFlag,
    searchCountries,
  };
};
