import type { ParcelAcquisition } from '../../models/acquisition';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';
import { formatDate, formatCurrency, formatArea } from '../../utils/formatters';

interface AcquisitionSectionProps {
  records: ParcelAcquisition[];
}

export default function AcquisitionSection({ records }: AcquisitionSectionProps) {
  if (!records.length) {
    return <EmptyState icon="🛣️" title="No Acquisition" description="This parcel is not part of any acquisition project." />;
  }

  return (
    <div>
      <h4 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>Land Acquisition</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {records.map((acq) => (
          <div key={acq.id} style={{
            padding: '16px', border: '1px solid var(--color-gray-200)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{acq.project_name}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>
                  Area Required: {formatArea(acq.area_required_sqm)}
                </div>
              </div>
              <StatusBadge status={acq.status} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.8125rem' }}>
              {acq.compensation_offered && (
                <div>
                  <span style={{ color: 'var(--color-gray-500)' }}>Compensation: </span>
                  <span style={{ fontWeight: 500 }}>{formatCurrency(acq.compensation_offered)}</span>
                </div>
              )}
              <div>
                <span style={{ color: 'var(--color-gray-500)' }}>Compensation Status: </span>
                <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{acq.compensation_status}</span>
              </div>
            </div>
            {acq.hearing_date && (
              <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
                Hearing: {formatDate(acq.hearing_date)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
