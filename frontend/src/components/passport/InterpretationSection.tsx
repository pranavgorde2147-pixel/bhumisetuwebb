import type { InterpretationResult } from '../../models/interpretation';
import EmptyState from '../common/EmptyState';

interface InterpretationSectionProps {
  result: InterpretationResult | null;
}

const confidenceColors: Record<string, string> = {
  high: 'var(--color-success)',
  medium: 'var(--color-warning)',
  low: 'var(--color-error)',
  none: 'var(--color-gray-400)',
};

export default function InterpretationSection({ result }: InterpretationSectionProps) {
  if (!result) {
    return <EmptyState icon="🌐" title="No Interpretation" description="Cross-state interpretation not available." />;
  }

  return (
    <div>
      <h4 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>
        Cross-State Interpretation
      </h4>
      <div style={{
        padding: '12px 16px', background: 'var(--color-gray-50)',
        borderRadius: 'var(--radius-lg)', marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.875rem',
      }}>
        <span>
          <span style={{ color: 'var(--color-gray-500)' }}>From: </span>
          <span style={{ fontWeight: 600 }}>{result.source_state}</span>
        </span>
        <span style={{ color: 'var(--color-gray-400)' }}>→</span>
        <span>
          <span style={{ color: 'var(--color-gray-500)' }}>To: </span>
          <span style={{ fontWeight: 600 }}>{result.target_state}</span>
        </span>
        <span style={{ marginLeft: 'auto', fontWeight: 600, color: confidenceColors[result.fields[0]?.match_confidence || 'none'] }}>
          {Math.round(result.confidence_score * 100)}% match
        </span>
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Field</th>
              <th>{result.source_state}</th>
              <th>{result.target_state}</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {result.fields.map((field, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{field.field_name}</td>
                <td>{field.source_value || '—'}</td>
                <td>{field.target_value || '—'}</td>
                <td>
                  <span style={{
                    color: confidenceColors[field.match_confidence],
                    fontWeight: 500, fontSize: '0.8125rem', textTransform: 'capitalize',
                  }}>
                    {field.match_confidence}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
