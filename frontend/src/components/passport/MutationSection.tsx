import type { MutationRecord } from '../../models/mutation';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/formatters';

interface MutationSectionProps {
  records: MutationRecord[];
}

export default function MutationSection({ records }: MutationSectionProps) {
  if (!records.length) {
    return <EmptyState icon="🔄" title="No Mutation Records" description="No mutation data available." />;
  }

  return (
    <div>
      <h4 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>Mutation Records</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {records.map((mut) => (
          <div key={mut.id} style={{
            padding: '16px', border: '1px solid var(--color-gray-200)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{mut.mutation_number}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>
                  {mut.mutation_type.charAt(0).toUpperCase() + mut.mutation_type.slice(1)} — {mut.source_state}
                </div>
              </div>
              <StatusBadge status={mut.status} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.8125rem' }}>
              {mut.from_party && (
                <div>
                  <span style={{ color: 'var(--color-gray-500)' }}>From: </span>
                  <span style={{ fontWeight: 500 }}>{mut.from_party}</span>
                </div>
              )}
              {mut.to_party && (
                <div>
                  <span style={{ color: 'var(--color-gray-500)' }}>To: </span>
                  <span style={{ fontWeight: 500 }}>{mut.to_party}</span>
                </div>
              )}
            </div>
            {mut.description && (
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-gray-600)', marginTop: 8 }}>
                {mut.description}
              </p>
            )}
            <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
              Date: {formatDate(mut.mutation_date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
