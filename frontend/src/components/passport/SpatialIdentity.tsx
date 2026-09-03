import type { Parcel } from '../../models/parcel';

interface SpatialIdentityProps {
  parcel: Parcel;
}

export default function SpatialIdentity({ parcel }: SpatialIdentityProps) {
  return (
    <div>
      <h4 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>Spatial Identity</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <InfoCard label="Geometry Type" value={parcel.geometry_type || 'Polygon'} />
        <InfoCard label="Area (sq m)" value={parcel.area_sqm?.toLocaleString('en-IN')} />
        <InfoCard label="Area (acres)" value={parcel.area_acres?.toFixed(2)} />
        <InfoCard label="Centroid Lat" value={parcel.centroid_lat?.toFixed(6)} />
        <InfoCard label="Centroid Lng" value={parcel.centroid_lng?.toFixed(6)} />
        <InfoCard label="CRS" value="EPSG:4326 (WGS 84)" />
      </div>
      {parcel.coordinates && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', marginBottom: 4 }}>Boundary Coordinates</div>
          <div style={{
            background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)',
            padding: 12, fontSize: '0.75rem', fontFamily: 'monospace',
            maxHeight: 120, overflowY: 'auto', color: 'var(--color-gray-600)',
          }}>
            {JSON.stringify(parcel.coordinates, null, 2)}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div style={{
      padding: '12px 16px', background: 'var(--color-gray-50)',
      borderRadius: 'var(--radius-md)',
    }}>
      <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: value ? 'var(--color-gray-800)' : 'var(--color-gray-400)' }}>
        {value || '—'}
      </div>
    </div>
  );
}
