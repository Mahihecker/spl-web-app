// src/context/SearchContext.js
'use client';

import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchableData, setSearchableData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const value = {
    searchTerm,
    setSearchTerm,
    searchableData,
    setSearchableData,
    isSearching,
    setIsSearching,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};