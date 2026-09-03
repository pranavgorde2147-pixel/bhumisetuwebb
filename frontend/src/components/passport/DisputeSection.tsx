import type { Dispute } from '../../models/dispute';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/formatters';

interface DisputeSectionProps {
  records: Dispute[];
}

export default function DisputeSection({ records }: DisputeSectionProps) {
  if (!records.length) {
    return (
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <div style={{ fontSize: '2rem', marginBottom: 8 }}>⚖️</div>
        <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 4 }}>No Active Disputes</h4>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>No court cases or disputes recorded.</p>
      </div>
    );
  }

  return (
    <div>
      <h4 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>Disputes & Court Cases</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {records.map((disp) => (
          <div key={disp.id} style={{
            padding: '16px', border: '1px solid var(--color-gray-200)',
            borderRadius: 'var(--radius-lg)',
            borderLeft: `3px solid ${disp.status === 'ongoing' ? 'var(--color-warning)' : disp.status === 'resolved' ? 'var(--color-success)' : 'var(--color-gray-300)'}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{disp.dispute_type} Dispute</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>
                  {disp.court_name} {disp.court_level && `(${disp.court_level})`}
                </div>
              </div>
              <StatusBadge status={disp.status} />
            </div>
            {disp.description && (
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-gray-600)', marginBottom: 8 }}>
                {disp.description}
              </p>
            )}
            <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
              Filed: {formatDate(disp.filed_date)}
              {disp.next_hearing_date && ` | Next Hearing: ${formatDate(disp.next_hearing_date)}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
