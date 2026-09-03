import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parcelAPI, registrationAPI } from '../api/endpoints';
import RegistrationSection from '../components/passport/RegistrationSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import type { Parcel } from '../models/parcel';
import type { RegistrationRecord } from '../models/registration';

export default function Registration() {
  const { id } = useParams<{ id: string }>();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([parcelAPI.getById(id), registrationAPI.getByParcel(id)])
      .then(([p, r]) => { setParcel(p.data.data); setRecords(r.data.data || []); })
      .catch(() => setError('Failed to load registrations'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading registrations..." />;
  if (error || !parcel) return <ErrorState message={error || 'Not found'} />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a><span className="breadcrumb-sep">/</span>
        <a href={`/parcel/${id}`}>Parcel</a><span className="breadcrumb-sep">/</span>
        <span>Registration</span>
      </nav>
      <div className="page-header">
        <h1>Registration Records</h1>
        <p className="page-header-desc">Registration history for parcel {parcel.ulpin || parcel.id}</p>
      </div>
      <RegistrationSection records={records} />
    </div>
  );
}
