import type { VerificationResult } from '../../models/verification';

interface VerificationResultProps {
  result: VerificationResult;
}

const statusIcon: Record<string, string> = {
  pass: '✓',
  fail: '✗',
  warning: '!',
  pending: '○',
  na: '—',
};

const statusColor: Record<string, string> = {
  pass: 'var(--color-success)',
  fail: 'var(--color-error)',
  warning: 'var(--color-warning)',
  pending: 'var(--color-gray-400)',
  na: 'var(--color-gray-400)',
};

export default function VerificationResultDisplay({ result }: VerificationResultProps) {
  const passed = result.checks.filter((c) => c.status === 'pass').length;
  const total = result.checks.length;

  return (
    <div>
      <div style={{
        padding: '24px', background: 'var(--color-white)',
        border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)',
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 'var(--radius-full)',
            background: result.overall_score >= 80 ? 'var(--color-success-bg)' : result.overall_score >= 50 ? 'var(--color-warning-bg)' : 'var(--color-error-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.75rem', fontWeight: 800,
            color: result.overall_score >= 80 ? 'var(--color-success)' : result.overall_score >= 50 ? 'var(--color-warning)' : 'var(--color-error)',
          }}>
            {result.overall_score}
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 4 }}>
              Parcel Verification Report
            </h3>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>
              {passed} of {total} checks passed • Overall status:{' '}
              <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>
                {result.overall_status.replace(/_/g, ' ')}
              </span>
            </div>
          </div>
        </div>

        <div style={{
          height: 8, background: 'var(--color-gray-100)',
          borderRadius: 'var(--radius-full)', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: `${result.overall_score}%`,
            background: result.overall_score >= 80 ? 'var(--color-success)' : result.overall_score >= 50 ? 'var(--color-warning)' : 'var(--color-error)',
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>

      <div className="verification-grid">
        {result.checks.map((check, i) => (
          <div key={i} className="verification-check" style={{
            borderLeft: `3px solid ${statusColor[check.status]}`,
          }}>
            <div className={`verification-icon ${check.status}`}>
              {statusIcon[check.status]}
            </div>
            <div>
              <div className="verification-name">{check.check_name}</div>
              <div className="verification-desc">{check.check_description}</div>
              {check.details && (
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-600)', marginTop: 4 }}>
                  {check.details}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
