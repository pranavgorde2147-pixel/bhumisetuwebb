import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parcelAPI, planningAPI } from '../api/endpoints';
import PlanningSection from '../components/passport/PlanningSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import type { Parcel } from '../models/parcel';
import type { PlanningRecord } from '../models/planning';

export default function Planning() {
  const { id } = useParams<{ id: string }>();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [records, setRecords] = useState<PlanningRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([parcelAPI.getById(id), planningAPI.getByParcel(id)])
      .then(([p, r]) => { setParcel(p.data.data); setRecords(r.data.data || []); })
      .catch(() => setError('Failed to load planning data'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading planning records..." />;
  if (error || !parcel) return <ErrorState message={error || 'Not found'} />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a><span className="breadcrumb-sep">/</span>
        <a href={`/parcel/${id}`}>Parcel</a><span className="breadcrumb-sep">/</span>
        <span>Planning</span>
      </nav>
      <div className="page-header">
        <h1>Planning & Zoning</h1>
        <p className="page-header-desc">Zoning and planning information for parcel {parcel.ulpin || parcel.id}</p>
      </div>
      <PlanningSection records={records} />
    </div>
  );
}
