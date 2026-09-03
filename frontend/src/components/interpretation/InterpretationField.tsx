import type { FieldInterpretation } from '../../models/interpretation';

interface InterpretationFieldProps {
  field: FieldInterpretation;
}

const confidenceColor: Record<string, string> = {
  high: 'var(--color-success)',
  medium: 'var(--color-warning)',
  low: 'var(--color-error)',
  none: 'var(--color-gray-400)',
};

export default function InterpretationField({ field }: InterpretationFieldProps) {
  return (
    <div style={{
      padding: '12px 16px', border: '1px solid var(--color-gray-200)',
      borderRadius: 'var(--radius-lg)', marginBottom: 8,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{field.field_name}</span>
        <span style={{
          padding: '2px 8px', borderRadius: 'var(--radius-full)',
          fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
          color: confidenceColor[field.match_confidence],
          backgroundColor: `${confidenceColor[field.match_confidence]}15`,
        }}>
          {field.match_confidence}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, fontSize: '0.8125rem', alignItems: 'center' }}>
        <div>
          <div style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem', marginBottom: 2 }}>{field.source_label}</div>
          <div style={{ fontWeight: 500 }}>{field.source_value || '—'}</div>
        </div>
        <div style={{ color: 'var(--color-gray-400)', fontSize: '1.25rem' }}>→</div>
        <div>
          <div style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem', marginBottom: 2 }}>{field.target_label}</div>
          <div style={{ fontWeight: 500 }}>{field.target_value || '—'}</div>
        </div>
      </div>
      {field.notes && (
        <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--color-gray-500)', fontStyle: 'italic' }}>
          {field.notes}
        </div>
      )}
    </div>
  );
}
