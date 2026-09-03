import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MapPanel from '../components/map/MapPanel';
import LayerControl from '../components/map/LayerControl';
import SearchBar from '../components/common/SearchBar';
import { parcelAPI } from '../api/endpoints';
import StatusBadge from '../components/common/StatusBadge';
import { formatArea } from '../utils/formatters';
import { LAND_USE_LABELS } from '../utils/constants';
import type { ParcelSearchResult, Parcel } from '../models/parcel';

export default function Map() {
  const navigate = useNavigate();
  const [results, setResults] = useState<ParcelSearchResult[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([78.9629, 20.5937]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const res = await parcelAPI.autocomplete(query);
      setResults(res.data.data || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelect = async (result: ParcelSearchResult) => {
    if (result.parcel.centroid_lng && result.parcel.centroid_lat) {
      setMapCenter([result.parcel.centroid_lng, result.parcel.centroid_lat]);
    }
    try {
      const res = await parcelAPI.getById(result.parcel.id);
      setSelectedParcel(res.data.data);
    } catch {
      setSelectedParcel(result.parcel);
    }
    setResults([]);
  };

  return (
    <div style={{ position: 'relative', height: 'calc(100vh - var(--header-height))' }}>
      <MapPanel center={mapCenter} zoom={selectedParcel ? 14 : 5} />

      {/* Floating Search */}
      <div className="map-overlay map-search-overlay">
        <SearchBar
          onSearch={handleSearch}
          onSelect={handleSelect}
          suggestions={results}
          loading={loading}
          placeholder="Search on map..."
        />
      </div>

      {/* Layer Control */}
      <LayerControl />

      {/* Side Panel */}
      {selectedParcel && (
        <div className="map-side-panel">
          <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 4 }}>
                  {selectedParcel.ulpin || selectedParcel.id}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>
                  {selectedParcel.village}, {selectedParcel.district}
                </p>
              </div>
              <button
                className="btn btn-ghost btn-icon"
                onClick={() => setSelectedParcel(null)}
                aria-label="Close panel"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <StatusBadge status={selectedParcel.status} />

            <div style={{ marginTop: 20 }}>
              <div className="data-row">
                <span className="data-label">Area</span>
                <span className="data-value">{formatArea(selectedParcel.area_sqm)}</span>
              </div>
              <div className="data-row">
                <span className="data-label">Land Use</span>
                <span className="data-value">{LAND_USE_LABELS[selectedParcel.land_use] || selectedParcel.land_use}</span>
              </div>
              <div className="data-row">
                <span className="data-label">State</span>
                <span className="data-value">{selectedParcel.state}</span>
              </div>
              <div className="data-row">
                <span className="data-label">Tehsil</span>
                <span className="data-value">{selectedParcel.tehsil}</span>
              </div>
              {selectedParcel.survey_number && (
                <div className="data-row">
                  <span className="data-label">Survey No.</span>
                  <span className="data-value">{selectedParcel.survey_number}</span>
                </div>
              )}
            </div>

            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                className="btn btn-primary w-full"
                onClick={() => navigate(`/parcel/${selectedParcel.id}`)}
              >
                View Full Details
              </button>
              <button
                className="btn btn-outline w-full"
                onClick={() => navigate(`/parcel/${selectedParcel.id}/passport`)}
              >
                Land Passport
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
