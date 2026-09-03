import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parcelAPI, documentAPI } from '../api/endpoints';
import DocumentsSection from '../components/passport/DocumentsSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import type { Parcel } from '../models/parcel';
import type { Document } from '../models/document';

export default function Documents() {
  const { id } = useParams<{ id: string }>();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([parcelAPI.getById(id), documentAPI.getByParcel(id)])
      .then(([p, d]) => { setParcel(p.data.data); setDocuments(d.data.data || []); })
      .catch(() => setError('Failed to load documents'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading documents..." />;
  if (error || !parcel) return <ErrorState message={error || 'Not found'} />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a><span className="breadcrumb-sep">/</span>
        <a href={`/parcel/${id}`}>Parcel</a><span className="breadcrumb-sep">/</span>
        <span>Documents</span>
      </nav>
      <div className="page-header">
        <h1>Document Center</h1>
        <p className="page-header-desc">Documents for parcel {parcel.ulpin || parcel.id}</p>
      </div>
      <DocumentsSection documents={documents} />
    </div>
  );
}
