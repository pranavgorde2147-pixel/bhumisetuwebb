import { useState, useCallback } from 'react';
import { parcelAPI } from '../api/endpoints';
import SearchBar from '../components/common/SearchBar';
import ParcelCard from '../components/common/ParcelCard';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { ParcelSearchResult, Parcel } from '../models/parcel';
import { INDIAN_STATES } from '../utils/constants';

export default function FindLand() {
  const [results, setResults] = useState<ParcelSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [filters, setFilters] = useState({
    state: '', district: '', tehsil: '', village: '', land_use: '',
  });

  const handleSearch = useCallback(async (query: string) => {
    setLoading(true);
    setSearched(true);
    try {
      const res = await parcelAPI.search({ query, ...filters, page_size: 20 });
      setResults(res.data.data?.items || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleFilterSearch = () => {
    const queryParts = [filters.district, filters.tehsil, filters.village].filter(Boolean).join(', ');
    if (queryParts || filters.state) {
      handleSearch(queryParts || filters.state);
    }
  };

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <div className="page-header">
        <nav className="breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span>Find Land</span>
        </nav>
        <h1>Find Land</h1>
        <p className="page-header-desc">
          Search for parcels by ID, ULPIN, survey number, or location across India.
        </p>
      </div>

      <div style={{ marginBottom: 32 }}>
        <SearchBar
          onSearch={handleSearch}
          suggestions={results.slice(0, 5)}
          loading={loading}
        />
      </div>

      {/* Filters */}
      <div style={{
        padding: '20px', background: 'var(--color-white)',
        border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)',
        marginBottom: 32,
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>Advanced Filters</h3>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
        }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">State</label>
            <select
              className="form-select"
              value={filters.state}
              onChange={(e) => setFilters((p) => ({ ...p, state: e.target.value }))}
              aria-label="Filter by state"
            >
              <option value="">All States</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">District</label>
            <input
              type="text"
              className="form-input"
              value={filters.district}
              onChange={(e) => setFilters((p) => ({ ...p, district: e.target.value }))}
              placeholder="District"
              aria-label="Filter by district"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Tehsil</label>
            <input
              type="text"
              className="form-input"
              value={filters.tehsil}
              onChange={(e) => setFilters((p) => ({ ...p, tehsil: e.target.value }))}
              placeholder="Tehsil"
              aria-label="Filter by tehsil"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Village</label>
            <input
              type="text"
              className="form-input"
              value={filters.village}
              onChange={(e) => setFilters((p) => ({ ...p, village: e.target.value }))}
              placeholder="Village"
              aria-label="Filter by village"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Land Use</label>
            <select
              className="form-select"
              value={filters.land_use}
              onChange={(e) => setFilters((p) => ({ ...p, land_use: e.target.value }))}
              aria-label="Filter by land use"
            >
              <option value="">All Types</option>
              <option value="agricultural">Agricultural</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0, display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-primary w-full" onClick={handleFilterSearch}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading && <LoadingSpinner text="Searching parcels..." />}

      {!loading && searched && results.length === 0 && (
        <EmptyState
          icon="🔍"
          title="No Results Found"
          description="Try adjusting your search query or filters."
        />
      )}

      {!loading && results.length > 0 && (
        <div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 16,
          }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>
              {results.length} parcel{results.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 16,
          }}>
            {results.map((result) => (
              <ParcelCard key={result.parcel.id} parcel={result.parcel} />
            ))}
          </div>
        </div>
      )}

      {!searched && !loading && (
        <EmptyState
          icon="🗺️"
          title="Search for Land Records"
          description="Enter a Parcel ID, ULPIN, survey number, or location to find land records across India."
        />
      )}
    </div>
  );
}
