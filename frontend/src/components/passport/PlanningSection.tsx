import type { PlanningRecord } from '../../models/planning';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';

interface PlanningSectionProps {
  records: PlanningRecord[];
}

export default function PlanningSection({ records }: PlanningSectionProps) {
  if (!records.length) {
    return <EmptyState icon="🏗️" title="No Planning Records" description="No zoning or planning data available." />;
  }

  return (
    <div>
      <h4 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>Planning & Zoning</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {records.map((plan) => (
          <div key={plan.id} style={{
            padding: '16px', border: '1px solid var(--color-gray-200)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{plan.zone_name} ({plan.zone_code})</div>
                {plan.zone_description && (
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>{plan.zone_description}</div>
                )}
              </div>
              <StatusBadge status={plan.status} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8, fontSize: '0.8125rem' }}>
              {plan.fsi && <div><span style={{ color: 'var(--color-gray-500)' }}>FSI: </span><span style={{ fontWeight: 500 }}>{plan.fsi}</span></div>}
              {plan.far && <div><span style={{ color: 'var(--color-gray-500)' }}>FAR: </span><span style={{ fontWeight: 500 }}>{plan.far}</span></div>}
              {plan.building_height_limit && <div><span style={{ color: 'var(--color-gray-500)' }}>Height Limit: </span><span style={{ fontWeight: 500 }}>{plan.building_height_limit}m</span></div>}
            </div>
            {plan.land_use_allowed.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', marginBottom: 4 }}>ALLOWED USES</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {plan.land_use_allowed.map((use, i) => (
                    <span key={i} style={{
                      padding: '2px 8px', background: 'var(--color-primary-50)',
                      color: 'var(--color-primary)', borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem', fontWeight: 500,
                    }}>
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
