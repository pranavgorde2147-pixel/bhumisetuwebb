import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parcelAPI, encumbranceAPI } from '../api/endpoints';
import EncumbranceSection from '../components/passport/EncumbranceSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import type { Parcel } from '../models/parcel';
import type { Encumbrance } from '../models/encumbrance';

export default function Encumbrance() {
  const { id } = useParams<{ id: string }>();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [records, setRecords] = useState<Encumbrance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([parcelAPI.getById(id), encumbranceAPI.getByParcel(id)])
      .then(([p, e]) => { setParcel(p.data.data); setRecords(e.data.data || []); })
      .catch(() => setError('Failed to load encumbrances'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading encumbrances..." />;
  if (error || !parcel) return <ErrorState message={error || 'Not found'} />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a><span className="breadcrumb-sep">/</span>
        <a href={`/parcel/${id}`}>Parcel</a><span className="breadcrumb-sep">/</span>
        <span>Encumbrance</span>
      </nav>
      <div className="page-header">
        <h1>Encumbrance Details</h1>
        <p className="page-header-desc">Encumbrances on parcel {parcel.ulpin || parcel.id}</p>
      </div>
      <EncumbranceSection records={records} />
    </div>
  );
}
