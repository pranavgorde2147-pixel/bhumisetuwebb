import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Parcel } from '../models/parcel';
import type { ParcelSearchResult } from '../models/parcel';

interface ParcelContextType {
  currentParcel: Parcel | null;
  setCurrentParcel: (parcel: Parcel | null) => void;
  searchResults: ParcelSearchResult[];
  setSearchResults: (results: ParcelSearchResult[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedParcelId: string | null;
  setSelectedParcelId: (id: string | null) => void;
}

const ParcelContext = createContext<ParcelContextType | null>(null);

export function ParcelProvider({ children }: { children: ReactNode }) {
  const [currentParcel, setCurrentParcel] = useState<Parcel | null>(null);
  const [searchResults, setSearchResults] = useState<ParcelSearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);

  return (
    <ParcelContext.Provider
      value={{
        currentParcel,
        setCurrentParcel,
        searchResults,
        setSearchResults,
        searchQuery,
        setSearchQuery,
        selectedParcelId,
        setSelectedParcelId,
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
}

export function useParcel() {
  const context = useContext(ParcelContext);
  if (!context) throw new Error('useParcel must be used within ParcelProvider');
  return context;
}
