import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parcelAPI, verificationAPI } from '../api/endpoints';
import VerificationResultDisplay from '../components/verification/VerificationResult';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import type { Parcel } from '../models/parcel';
import type { VerificationResult } from '../models/verification';

export default function Verification() {
  const { id } = useParams<{ id: string }>();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([parcelAPI.getById(id), verificationAPI.getByParcel(id)])
      .then(([p, v]) => { setParcel(p.data.data); setResult(v.data.data); })
      .catch(() => setError('Failed to load verification'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Running verification checks..." />;
  if (error || !parcel) return <ErrorState message={error || 'Not found'} />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a><span className="breadcrumb-sep">/</span>
        <a href={`/parcel/${id}`}>Parcel</a><span className="breadcrumb-sep">/</span>
        <span>Verification</span>
      </nav>
      <div className="page-header">
        <h1>Parcel Verification</h1>
        <p className="page-header-desc">
          9-point verification report for parcel {parcel.ulpin || parcel.id}
        </p>
      </div>
      {result ? (
        <VerificationResultDisplay result={result} />
      ) : (
        <ErrorState message="Verification data not available" />
      )}
    </div>
  );
}
