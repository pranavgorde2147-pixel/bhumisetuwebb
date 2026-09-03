import type { ParcelAcquisition } from '../../models/acquisition';
import StatusBadge from '../common/StatusBadge';
import { formatDate, formatCurrency } from '../../utils/formatters';

interface AcquisitionStatusProps {
  acquisition: ParcelAcquisition;
}

export default function AcquisitionStatus({ acquisition }: AcquisitionStatusProps) {
  const steps = ['Identified', 'Notified', 'Hearing', 'Awarded', 'Acquired'];
  const currentIndex = steps.findIndex((s) => s.toLowerCase() === acquisition.status);

  return (
    <div style={{
      padding: '20px', background: 'var(--color-white)',
      border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>{acquisition.project_name}</h4>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>
            Compensation: {formatCurrency(acquisition.compensation_offered)}
          </div>
        </div>
        <StatusBadge status={acquisition.status} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          {steps.map((step, i) => (
            <div
              key={step}
              style={{
                width: 12, height: 12, borderRadius: 'var(--radius-full)',
                backgroundColor: i <= currentIndex ? 'var(--color-primary)' : 'var(--color-gray-200)',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--color-gray-500)' }}>
          {steps.map((step) => (
            <span key={step} style={{ textAlign: 'center', flex: 1 }}>{step}</span>
          ))}
        </div>
      </div>

      {acquisition.hearing_date && (
        <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-600)' }}>
          Next Hearing: {formatDate(acquisition.hearing_date)}
        </div>
      )}
    </div>
  );
}
