import MapPanel from '../map/MapPanel';
import type { Parcel } from '../../models/parcel';

interface AcquisitionMapProps {
  parcel: Parcel;
}

export default function AcquisitionMap({ parcel }: AcquisitionMapProps) {
  const center: [number, number] = parcel.centroid_lng && parcel.centroid_lat
    ? [parcel.centroid_lng, parcel.centroid_lat]
    : [78.9629, 20.5937];

  return (
    <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-gray-200)' }}>
      <MapPanel center={center} zoom={14} parcelId={parcel.id} />
    </div>
  );
}
