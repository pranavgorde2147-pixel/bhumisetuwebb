import { Link } from 'react-router-dom';
import type { Parcel } from '../../models/parcel';
import StatusBadge from './StatusBadge';
import { formatArea } from '../../utils/formatters';
import { LAND_USE_LABELS } from '../../utils/constants';

interface ParcelCardProps {
  parcel: Parcel;
}

export default function ParcelCard({ parcel }: ParcelCardProps) {
  return (
    <Link
      to={`/parcel/${parcel.id}`}
      className="parcel-card"
      aria-label={`Parcel ${parcel.ulpin || parcel.id} in ${parcel.village}`}
    >
      <div className="parcel-card-header">
        <span className="parcel-card-id">{parcel.ulpin || parcel.id}</span>
        <StatusBadge status={parcel.status} />
      </div>
      <div className="parcel-card-location">
        {parcel.village}, {parcel.tehsil}, {parcel.district}, {parcel.state}
      </div>
      <div className="parcel-card-meta">
        <span className="parcel-card-meta-item">
          📐 {formatArea(parcel.area_sqm)}
        </span>
        <span className="parcel-card-meta-item">
          🏷️ {LAND_USE_LABELS[parcel.land_use] || parcel.land_use}
        </span>
        {parcel.survey_number && (
          <span className="parcel-card-meta-item">
            Survey: {parcel.survey_number}
          </span>
        )}
      </div>
    </Link>
  );
}
