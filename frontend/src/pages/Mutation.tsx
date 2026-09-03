import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { parcelAPI, mutationAPI } from '../api/endpoints';
import MutationSection from '../components/passport/MutationSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import type { Parcel } from '../models/parcel';
import type { MutationRecord } from '../models/mutation';

export default function Mutation() {
  const { id } = useParams<{ id: string }>();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [records, setRecords] = useState<MutationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([parcelAPI.getById(id), mutationAPI.getByParcel(id)])
      .then(([p, m]) => { setParcel(p.data.data); setRecords(m.data.data || []); })
      .catch(() => setError('Failed to load mutations'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading mutations..." />;
  if (error || !parcel) return <ErrorState message={error || 'Not found'} />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a><span className="breadcrumb-sep">/</span>
        <a href={`/parcel/${id}`}>Parcel</a><span className="breadcrumb-sep">/</span>
        <span>Mutation</span>
      </nav>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Mutation Records</h1>
          <p className="page-header-desc">Mutation history for parcel {parcel.ulpin || parcel.id}</p>
        </div>
        <Link to="/services/request/mutation_application" className="btn btn-primary">
          Apply for Mutation
        </Link>
      </div>
      <MutationSection records={records} />
    </div>
  );
}
