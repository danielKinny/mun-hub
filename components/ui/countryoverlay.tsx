import React from "react";

interface Country {
  countryID: string;
  flag: string;
  name: string;
}

interface CountryOverlayProps {
  countries: Country[];
  speechTags: string[];
  toggleCountrySelection: (countryID: string) => void;
  closeCountryOverlay: () => void;
}

const CountryOverlay: React.FC<CountryOverlayProps> = ({
  countries,
  speechTags,
  toggleCountrySelection,
  closeCountryOverlay,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadein">
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 rounded-2xl p-8 max-h-[85vh] w-[90vw] max-w-md overflow-y-auto relative shadow-2xl border border-gray-200 animate-slidein-up">
      <button
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-xl font-bold text-gray-500 hover:text-red-500 rounded-full transition-colors animate-btn-pop"
        onClick={closeCountryOverlay}
      >
        ×
      </button>
      <h2 className="text-2xl font-bold mb-6 pr-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-purple-800 animate-text-pop">
        Select Countries
      </h2>
      <div className="flex flex-col gap-2">
        {countries.map((country, idx) => (
          <div
            key={country.countryID}
            className="px-4 py-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 text-gray-800 border border-gray-200 hover:border-blue-300 flex items-center gap-3 cursor-pointer transition-all duration-200 hover:shadow-md animate-fadein-up"
            style={{ animationDelay: `${idx * 40}ms` }}
            onClick={() => toggleCountrySelection(country.countryID)}
          >
            <input
              type="checkbox"
              checked={speechTags.includes(country.countryID)}
              onChange={() => toggleCountrySelection(country.countryID)}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 animate-btn-pop"
            />
            <span className="text-2xl animate-bounce-slow">{country.flag}</span>
            <span className="font-medium animate-text-pop">{country.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CountryOverlay;
