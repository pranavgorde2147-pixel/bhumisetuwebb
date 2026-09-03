import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parcelAPI, rorAPI } from '../api/endpoints';
import RoRSection from '../components/passport/RoRSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import type { Parcel } from '../models/parcel';
import type { RecordOfRights } from '../models/ror';

export default function RoR() {
  const { id } = useParams<{ id: string }>();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [records, setRecords] = useState<RecordOfRights[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([parcelAPI.getById(id), rorAPI.getByParcel(id)])
      .then(([p, r]) => { setParcel(p.data.data); setRecords(r.data.data || []); })
      .catch(() => setError('Failed to load RoR data'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading Record of Rights..." />;
  if (error || !parcel) return <ErrorState message={error || 'Not found'} />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a><span className="breadcrumb-sep">/</span>
        <a href={`/parcel/${id}`}>Parcel</a><span className="breadcrumb-sep">/</span>
        <span>Record of Rights</span>
      </nav>
      <div className="page-header">
        <h1>Record of Rights</h1>
        <p className="page-header-desc">RoR records for parcel {parcel.ulpin || parcel.id}</p>
      </div>
      <RoRSection records={records} />
    </div>
  );
}
