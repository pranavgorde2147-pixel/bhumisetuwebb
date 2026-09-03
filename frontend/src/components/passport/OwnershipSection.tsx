import type { Owner } from '../../models/ownership';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';

interface OwnershipSectionProps {
  owners: Owner[];
}

export default function OwnershipSection({ owners }: OwnershipSectionProps) {
  if (!owners.length) {
    return <EmptyState icon="👤" title="No Ownership Records" description="No ownership data available for this parcel." />;
  }

  return (
    <div>
      <h4 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>Ownership</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {owners.map((owner) => (
          <div key={owner.id} style={{
            padding: '16px', border: '1px solid var(--color-gray-200)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{owner.name}</div>
                {owner.father_name && (
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>
                    S/o {owner.father_name}
                  </div>
                )}
              </div>
              <StatusBadge status={owner.status} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8, fontSize: '0.8125rem' }}>
              <div>
                <span style={{ color: 'var(--color-gray-500)' }}>Type: </span>
                <span style={{ fontWeight: 500 }}>{owner.owner_type}</span>
              </div>
              {owner.share_percentage && (
                <div>
                  <span style={{ color: 'var(--color-gray-500)' }}>Share: </span>
                  <span style={{ fontWeight: 500 }}>{owner.share_percentage}%</span>
                </div>
              )}
              {owner.id_type && (
                <div>
                  <span style={{ color: 'var(--color-gray-500)' }}>{owner.id_type}: </span>
                  <span style={{ fontWeight: 500 }}>{owner.id_number}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
