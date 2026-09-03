import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parcelAPI, acquisitionAPI } from '../api/endpoints';
import AcquisitionStatus from '../components/acquisition/AcquisitionStatus';
import AcquisitionMap from '../components/acquisition/AcquisitionMap';
import RepresentationForm from '../components/acquisition/RepresentationForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import type { Parcel } from '../models/parcel';
import type { ParcelAcquisition } from '../models/acquisition';

export default function Acquisition() {
  const { id } = useParams<{ id: string }>();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [acquisitions, setAcquisitions] = useState<ParcelAcquisition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([parcelAPI.getById(id), acquisitionAPI.getByParcel(id)])
      .then(([p, a]) => { setParcel(p.data.data); setAcquisitions(a.data.data || []); })
      .catch(() => setError('Failed to load acquisition data'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading acquisition data..." />;
  if (error || !parcel) return <ErrorState message={error || 'Not found'} />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a><span className="breadcrumb-sep">/</span>
        <a href={`/parcel/${id}`}>Parcel</a><span className="breadcrumb-sep">/</span>
        <span>Acquisition</span>
      </nav>
      <div className="page-header">
        <h1>Land Acquisition</h1>
        <p className="page-header-desc">Acquisition status for parcel {parcel.ulpin || parcel.id}</p>
      </div>

      {acquisitions.length === 0 ? (
        <EmptyState
          icon="🛣️"
          title="No Acquisition Projects"
          description="This parcel is not currently part of any land acquisition project."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              {acquisitions.map((acq) => (
                <AcquisitionStatus key={acq.id} acquisition={acq} />
              ))}
            </div>
            <AcquisitionMap parcel={parcel} />
          </div>
          <RepresentationForm acquisitionId={acquisitions[0]?.id} />
        </div>
      )}
    </div>
  );
}
