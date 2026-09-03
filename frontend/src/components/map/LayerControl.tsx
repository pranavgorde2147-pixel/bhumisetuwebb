import { useState } from 'react';

interface LayerControlProps {
  onLayerToggle?: (layer: string, visible: boolean) => void;
}

const layers = [
  { id: 'parcels', label: 'Parcel Boundaries', defaultOn: true },
  { id: 'ownership', label: 'Ownership Status', defaultOn: false },
  { id: 'land_use', label: 'Land Use Zones', defaultOn: false },
  { id: 'disputes', label: 'Active Disputes', defaultOn: false },
  { id: 'acquisition', label: 'Acquisition Projects', defaultOn: false },
];

export default function LayerControl({ onLayerToggle }: LayerControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>(
    Object.fromEntries(layers.map((l) => [l.id, l.defaultOn]))
  );

  const toggleLayer = (layerId: string) => {
    setActiveLayers((prev) => {
      const next = { ...prev, [layerId]: !prev[layerId] };
      onLayerToggle?.(layerId, next[layerId]);
      return next;
    });
  };

  return (
    <div className="map-overlay map-layer-overlay">
      <button
        className="btn btn-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle layer control"
        aria-expanded={isOpen}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--color-white)', border: '1px solid var(--color-gray-200)',
          borderRadius: 'var(--radius-lg)', padding: '8px 14px',
          boxShadow: 'var(--shadow-md)', fontSize: '0.875rem', fontWeight: 500,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
        Layers
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: 8,
          width: 240, background: 'var(--color-white)',
          border: '1px solid var(--color-gray-200)',
          borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '12px 16px', borderBottom: '1px solid var(--color-gray-100)',
            fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gray-500)',
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            Map Layers
          </div>
          {layers.map((layer) => (
            <label
              key={layer.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 16px', cursor: 'pointer',
                fontSize: '0.875rem', color: 'var(--color-gray-700)',
                borderBottom: '1px solid var(--color-gray-50)',
              }}
            >
              <input
                type="checkbox"
                checked={activeLayers[layer.id]}
                onChange={() => toggleLayer(layer.id)}
                style={{ accentColor: 'var(--color-primary)' }}
              />
              {layer.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
