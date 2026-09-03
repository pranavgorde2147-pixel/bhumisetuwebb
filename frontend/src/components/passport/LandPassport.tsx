import type { Parcel } from '../../models/parcel';
import StatusBadge from '../common/StatusBadge';
import { formatDate, formatArea, formatCurrency } from '../../utils/formatters';
import { LAND_USE_LABELS } from '../../utils/constants';

interface LandPassportProps {
  parcel: Parcel;
}

export default function LandPassport({ parcel }: LandPassportProps) {
  return (
    <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
      <div style={{
        background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
        color: 'white', padding: '24px 32px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Land Passport
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>{parcel.ulpin || parcel.id}</h2>
          </div>
          <StatusBadge status={parcel.status} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, fontSize: '0.875rem' }}>
          <div>
            <div style={{ opacity: 0.7, fontSize: '0.75rem', marginBottom: 2 }}>Location</div>
            <div style={{ fontWeight: 500 }}>{parcel.village}, {parcel.district}</div>
          </div>
          <div>
            <div style={{ opacity: 0.7, fontSize: '0.75rem', marginBottom: 2 }}>State</div>
            <div style={{ fontWeight: 500 }}>{parcel.state}</div>
          </div>
          <div>
            <div style={{ opacity: 0.7, fontSize: '0.75rem', marginBottom: 2 }}>Area</div>
            <div style={{ fontWeight: 500 }}>{formatArea(parcel.area_sqm)}</div>
          </div>
          <div>
            <div style={{ opacity: 0.7, fontSize: '0.75rem', marginBottom: 2 }}>Land Use</div>
            <div style={{ fontWeight: 500 }}>{LAND_USE_LABELS[parcel.land_use] || parcel.land_use}</div>
          </div>
        </div>
      </div>
      <div style={{ padding: '24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
          <DataRowPassport label="ULPIN" value={parcel.ulpin} />
          <DataRowPassport label="Parcel ID" value={parcel.id} />
          <DataRowPassport label="Survey Number" value={parcel.survey_number} />
          <DataRowPassport label="Khasra Number" value={parcel.khasra_number} />
          <DataRowPassport label="Khata Number" value={parcel.khata_number} />
          <DataRowPassport label="Tehsil" value={parcel.tehsil} />
          <DataRowPassport label="Classification" value={parcel.classification} />
          <DataRowPassport label="Land Use Code" value={parcel.land_use_code} />
          <DataRowPassport label="Verification Score" value={parcel.verification_score ? `${parcel.verification_score}%` : undefined} />
          <DataRowPassport label="Last Updated" value={formatDate(parcel.updated_at)} />
        </div>
      </div>
    </div>
  );
}

function DataRowPassport({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px solid var(--color-gray-50)' }}>
      <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: '0.875rem', fontWeight: 500, color: value ? 'var(--color-gray-800)' : 'var(--color-gray-400)' }}>
        {value || '—'}
      </div>
    </div>
  );
}
