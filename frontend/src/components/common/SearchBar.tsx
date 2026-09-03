import { useState, useRef, useEffect, useCallback } from 'react';
import type { ParcelSearchResult } from '../../models/parcel';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSelect?: (result: ParcelSearchResult) => void;
  suggestions?: ParcelSearchResult[];
  placeholder?: string;
  loading?: boolean;
}

export default function SearchBar({ onSearch, onSelect, suggestions = [], placeholder = 'Search by Parcel ID, ULPIN, Survey Number, or location...', loading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number>();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      if (value.trim()) {
        onSearch(value.trim());
        setShowSuggestions(true);
      }
    }, 300);
  }, [onSearch]);

  const handleSelect = (result: ParcelSearchResult) => {
    setQuery(result.parcel.ulpin || result.parcel.id);
    setShowSuggestions(false);
    onSelect?.(result);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-bar" ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <span className="search-bar-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="search"
          className="search-bar-input"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search parcels"
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
        />
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="search-bar-suggestions" role="listbox">
          {suggestions.map((result) => (
            <div
              key={result.parcel.id}
              className="search-bar-suggestion"
              role="option"
              onClick={() => handleSelect(result)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSelect(result);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gray-400)" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <div className="font-medium" style={{ fontSize: '0.875rem' }}>
                  {result.parcel.ulpin || result.parcel.id}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>
                  {result.parcel.village}, {result.parcel.district}, {result.parcel.state}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          padding: '16px', textAlign: 'center', fontSize: '0.875rem',
          color: 'var(--color-gray-500)', background: 'var(--color-white)',
          border: '1px solid var(--color-gray-200)', borderTop: 'none',
          borderRadius: '0 0 12px 12px',
        }}>
          Searching...
        </div>
      )}
    </div>
  );
}
