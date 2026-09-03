import { Link } from 'react-router-dom';
import type { Parcel } from '../../models/parcel';
import StatusBadge from '../common/StatusBadge';
import { formatArea } from '../../utils/formatters';
import { LAND_USE_LABELS } from '../../utils/constants';

interface ParcelPopupProps {
  parcel: Parcel;
}

export default function ParcelPopup({ parcel }: ParcelPopupProps) {
  return (
    <div style={{ minWidth: 240, fontFamily: 'var(--font-family)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.875rem' }}>
          {parcel.ulpin || parcel.id}
        </span>
        <StatusBadge status={parcel.status} />
      </div>
      <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-600)', marginBottom: 8 }}>
        {parcel.village}, {parcel.district}, {parcel.state}
      </div>
      <div style={{ display: 'flex', gap: 16, fontSize: '0.8125rem', marginBottom: 12 }}>
        <span>📐 {formatArea(parcel.area_sqm)}</span>
        <span>🏷️ {LAND_USE_LABELS[parcel.land_use] || parcel.land_use}</span>
      </div>
      <Link
        to={`/parcel/${parcel.id}`}
        style={{
          display: 'inline-block', padding: '6px 14px',
          background: 'var(--color-primary)', color: 'white',
          borderRadius: 'var(--radius-md)', fontSize: '0.8125rem',
          fontWeight: 500, textDecoration: 'none',
        }}
      >
        View Details
      </Link>
    </div>
  );
}
