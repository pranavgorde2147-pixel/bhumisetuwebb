import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parcelAPI, interpretationAPI } from '../api/endpoints';
import InterpretationSection from '../components/passport/InterpretationSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import { INDIAN_STATES } from '../utils/constants';
import type { Parcel } from '../models/parcel';
import type { InterpretationResult } from '../models/interpretation';

export default function Interpretation() {
  const { id } = useParams<{ id: string }>();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [result, setResult] = useState<InterpretationResult | null>(null);
  const [targetState, setTargetState] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    parcelAPI.getById(id)
      .then((p) => setParcel(p.data.data))
      .catch(() => setError('Failed to load parcel'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleInterpret = async () => {
    if (!id || !targetState) return;
    setLoading(true);
    try {
      const res = await interpretationAPI.getByParcel(id, targetState);
      setResult(res.data.data);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !parcel) return <LoadingSpinner text="Loading..." />;
  if (error || !parcel) return <ErrorState message={error || 'Not found'} />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a><span className="breadcrumb-sep">/</span>
        <a href={`/parcel/${id}`}>Parcel</a><span className="breadcrumb-sep">/</span>
        <span>Interpretation</span>
      </nav>
      <div className="page-header">
        <h1>Cross-State Interpretation</h1>
        <p className="page-header-desc">
          Interpret land records from {parcel.state} in the context of another state.
        </p>
      </div>

      <div style={{
        padding: '20px', background: 'var(--color-white)',
        border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)',
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
          <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
            <label className="form-label">Source State</label>
            <input type="text" className="form-input" value={parcel.state} disabled />
          </div>
          <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
            <label className="form-label form-label-required">Target State</label>
            <select
              className="form-select"
              value={targetState}
              onChange={(e) => setTargetState(e.target.value)}
              aria-label="Target state"
            >
              <option value="">Select target state</option>
              {INDIAN_STATES.filter((s) => s !== parcel.state).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleInterpret}
            disabled={!targetState || loading}
          >
            Interpret
          </button>
        </div>
      </div>

      {loading && <LoadingSpinner text="Interpreting records..." />}
      {!loading && result && <InterpretationSection result={result} />}
    </div>
  );
}
