import type { RecordOfRights } from '../../models/ror';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/formatters';

interface RoRSectionProps {
  records: RecordOfRights[];
}

export default function RoRSection({ records }: RoRSectionProps) {
  if (!records.length) {
    return <EmptyState icon="📋" title="No Record of Rights" description="No RoR data available for this parcel." />;
  }

  return (
    <div>
      <h4 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>Record of Rights</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {records.map((ror) => (
          <div key={ror.id} style={{
            padding: '16px', border: '1px solid var(--color-gray-200)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{ror.ror_number || 'RoR Record'}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>
                  {ror.rights_type} — {ror.source_state}
                </div>
              </div>
              <StatusBadge status={ror.status} />
            </div>
            {ror.rights_description && (
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', marginBottom: 8 }}>
                {ror.rights_description}
              </p>
            )}
            {ror.holders.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gray-500)', marginBottom: 4 }}>RIGHTS HOLDERS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {ror.holders.map((h, i) => (
                    <div key={i} style={{ fontSize: '0.8125rem', display: 'flex', gap: 16 }}>
                      <span style={{ fontWeight: 500 }}>{h.name}</span>
                      <span style={{ color: 'var(--color-gray-500)' }}>{h.share}</span>
                      <span style={{ color: 'var(--color-gray-500)' }}>{h.rights}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
              Registered: {formatDate(ror.registration_date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
