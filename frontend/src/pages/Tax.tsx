import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parcelAPI, taxAPI } from '../api/endpoints';
import TaxSection from '../components/passport/TaxSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import type { Parcel } from '../models/parcel';
import type { PropertyTax } from '../models/tax';

export default function Tax() {
  const { id } = useParams<{ id: string }>();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [records, setRecords] = useState<PropertyTax[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([parcelAPI.getById(id), taxAPI.getByParcel(id)])
      .then(([p, t]) => { setParcel(p.data.data); setRecords(t.data.data || []); })
      .catch(() => setError('Failed to load tax data'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading tax records..." />;
  if (error || !parcel) return <ErrorState message={error || 'Not found'} />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a><span className="breadcrumb-sep">/</span>
        <a href={`/parcel/${id}`}>Parcel</a><span className="breadcrumb-sep">/</span>
        <span>Property Tax</span>
      </nav>
      <div className="page-header">
        <h1>Property Tax</h1>
        <p className="page-header-desc">Tax records for parcel {parcel.ulpin || parcel.id}</p>
      </div>
      <TaxSection records={records} />
    </div>
  );
}
