import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parcelAPI, ownershipAPI } from '../api/endpoints';
import OwnershipSection from '../components/passport/OwnershipSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import type { Parcel } from '../models/parcel';
import type { Owner } from '../models/ownership';

export default function Ownership() {
  const { id } = useParams<{ id: string }>();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([parcelAPI.getById(id), ownershipAPI.getByParcel(id)])
      .then(([p, o]) => { setParcel(p.data.data); setOwners(o.data.data || []); })
      .catch(() => setError('Failed to load ownership data'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading ownership..." />;
  if (error || !parcel) return <ErrorState message={error || 'Not found'} />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a><span className="breadcrumb-sep">/</span>
        <a href={`/parcel/${id}`}>Parcel</a><span className="breadcrumb-sep">/</span>
        <span>Ownership</span>
      </nav>
      <div className="page-header">
        <h1>Ownership Records</h1>
        <p className="page-header-desc">Ownership details for parcel {parcel.ulpin || parcel.id}</p>
      </div>
      <OwnershipSection owners={owners} />
    </div>
  );
}
