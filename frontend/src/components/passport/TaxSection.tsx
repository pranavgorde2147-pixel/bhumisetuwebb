import type { PropertyTax } from '../../models/tax';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';
import { formatCurrency } from '../../utils/formatters';

interface TaxSectionProps {
  records: PropertyTax[];
}

export default function TaxSection({ records }: TaxSectionProps) {
  if (!records.length) {
    return <EmptyState icon="💰" title="No Tax Records" description="No property tax data available." />;
  }

  return (
    <div>
      <h4 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>Property Tax</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {records.map((tax) => (
          <div key={tax.id} style={{
            padding: '16px', border: '1px solid var(--color-gray-200)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 600 }}>FY {tax.assessment_year}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>{tax.source_state}</div>
              </div>
              <StatusBadge status={tax.status} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, fontSize: '0.8125rem' }}>
              <div>
                <div style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem' }}>Assessed Value</div>
                <div style={{ fontWeight: 600 }}>{formatCurrency(tax.assessed_value)}</div>
              </div>
              <div>
                <div style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem' }}>Annual Tax</div>
                <div style={{ fontWeight: 600 }}>{formatCurrency(tax.annual_tax)}</div>
              </div>
              <div>
                <div style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem' }}>Paid</div>
                <div style={{ fontWeight: 600, color: 'var(--color-success)' }}>{formatCurrency(tax.paid_amount)}</div>
              </div>
              <div>
                <div style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem' }}>Pending</div>
                <div style={{ fontWeight: 600, color: tax.pending_amount > 0 ? 'var(--color-error)' : 'var(--color-success)' }}>
                  {formatCurrency(tax.pending_amount)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
