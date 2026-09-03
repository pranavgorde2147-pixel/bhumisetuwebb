import { useState } from 'react';
import type { FormEvent } from 'react';

interface RepresentationFormProps {
  acquisitionId: string;
  onSubmit?: (data: { type: string; description: string }) => void;
}

export default function RepresentationForm({ acquisitionId, onSubmit }: RepresentationFormProps) {
  const [type, setType] = useState('objection');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.({ type, description });
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      padding: '20px', background: 'var(--color-white)',
      border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)',
    }}>
      <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>File Representation</h4>
      <div className="form-group">
        <label className="form-label form-label-required">Type</label>
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Representation type"
        >
          <option value="objection">Objection</option>
          <option value="counter">Counter</option>
          <option value="evidence">Evidence</option>
          <option value="alternative">Alternative Proposal</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label form-label-required">Details</label>
        <textarea
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your representation in detail..."
          rows={4}
          required
          aria-label="Representation details"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Representation
      </button>
    </form>
  );
}
