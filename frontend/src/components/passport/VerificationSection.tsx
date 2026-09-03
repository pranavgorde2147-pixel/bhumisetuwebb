import type { VerificationResult } from '../../models/verification';
import EmptyState from '../common/EmptyState';

interface VerificationSectionProps {
  result: VerificationResult | null;
}

const statusIcon: Record<string, string> = {
  pass: '✓',
  fail: '✗',
  warning: '!',
  pending: '○',
  na: '—',
};

export default function VerificationSection({ result }: VerificationSectionProps) {
  if (!result) {
    return <EmptyState icon="✓" title="Not Verified" description="Verification has not been performed on this parcel." />;
  }

  return (
    <div>
      <h4 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>Verification Status</h4>
      <div style={{
        padding: '16px', background: 'var(--color-gray-50)',
        borderRadius: 'var(--radius-lg)', marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 'var(--radius-full)',
          background: result.overall_score >= 80 ? 'var(--color-success-bg)' : result.overall_score >= 50 ? 'var(--color-warning-bg)' : 'var(--color-error-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.25rem', fontWeight: 700,
          color: result.overall_score >= 80 ? 'var(--color-success)' : result.overall_score >= 50 ? 'var(--color-warning)' : 'var(--color-error)',
        }}>
          {result.overall_score}
        </div>
        <div>
          <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{result.overall_status.replace(/_/g, ' ')}</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>
            {result.checks.filter((c) => c.status === 'pass').length} of {result.checks.length} checks passed
          </div>
        </div>
      </div>
      <div className="verification-grid">
        {result.checks.map((check, i) => (
          <div key={i} className="verification-check">
            <div className={`verification-icon ${check.status}`}>
              {statusIcon[check.status]}
            </div>
            <div>
              <div className="verification-name">{check.check_name}</div>
              <div className="verification-desc">{check.check_description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
