import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parcelAPI, disputeAPI } from '../api/endpoints';
import DisputeSection from '../components/passport/DisputeSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import type { Parcel } from '../models/parcel';
import type { Dispute } from '../models/dispute';

export default function Disputes() {
  const { id } = useParams<{ id: string }>();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [records, setRecords] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([parcelAPI.getById(id), disputeAPI.getByParcel(id)])
      .then(([p, d]) => { setParcel(p.data.data); setRecords(d.data.data || []); })
      .catch(() => setError('Failed to load disputes'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading disputes..." />;
  if (error || !parcel) return <ErrorState message={error || 'Not found'} />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a><span className="breadcrumb-sep">/</span>
        <a href={`/parcel/${id}`}>Parcel</a><span className="breadcrumb-sep">/</span>
        <span>Disputes</span>
      </nav>
      <div className="page-header">
        <h1>Disputes & Court Cases</h1>
        <p className="page-header-desc">Disputes related to parcel {parcel.ulpin || parcel.id}</p>
      </div>
      <DisputeSection records={records} />
    </div>
  );
}
