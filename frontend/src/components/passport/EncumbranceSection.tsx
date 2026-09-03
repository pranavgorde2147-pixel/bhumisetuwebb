import type { Encumbrance } from '../../models/encumbrance';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';
import { formatDate, formatCurrency } from '../../utils/formatters';

interface EncumbranceSectionProps {
  records: Encumbrance[];
}

export default function EncumbranceSection({ records }: EncumbranceSectionProps) {
  if (!records.length) {
    return <EmptyState icon="🔒" title="No Encumbrances" description="No encumbrances recorded for this parcel." />;
  }

  return (
    <div>
      <h4 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>Encumbrances</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {records.map((enc) => (
          <div key={enc.id} style={{
            padding: '16px', border: '1px solid var(--color-gray-200)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{enc.encumbrance_type}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>
                  {enc.encumbrancer}
                </div>
              </div>
              <StatusBadge status={enc.status} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.8125rem' }}>
              {enc.encumbered_amount && (
                <div>
                  <span style={{ color: 'var(--color-gray-500)' }}>Amount: </span>
                  <span style={{ fontWeight: 500 }}>{formatCurrency(enc.encumbered_amount)}</span>
                </div>
              )}
              {enc.beneficiary && (
                <div>
                  <span style={{ color: 'var(--color-gray-500)' }}>Beneficiary: </span>
                  <span style={{ fontWeight: 500 }}>{enc.beneficiary}</span>
                </div>
              )}
            </div>
            <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
              From: {formatDate(enc.encumbrance_date)}
              {enc.expiry_date && ` — To: ${formatDate(enc.expiry_date)}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
