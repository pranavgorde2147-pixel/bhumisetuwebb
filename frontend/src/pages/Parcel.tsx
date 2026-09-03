import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { parcelAPI, ownershipAPI, registrationAPI, mutationAPI, transactionAPI } from '../api/endpoints';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import MapPanel from '../components/map/MapPanel';
import { formatDate, formatArea } from '../utils/formatters';
import { LAND_USE_LABELS } from '../utils/constants';
import type { Parcel } from '../models/parcel';
import type { Owner } from '../models/ownership';
import type { RegistrationRecord } from '../models/registration';
import type { MutationRecord } from '../models/mutation';
import type { Transaction } from '../models/transaction';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'ownership', label: 'Ownership' },
  { id: 'records', label: 'Records' },
  { id: 'transactions', label: 'Transactions' },
];

export default function Parcel() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [mutations, setMutations] = useState<MutationRecord[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');

    Promise.all([
      parcelAPI.getById(id),
      ownershipAPI.getByParcel(id),
      registrationAPI.getByParcel(id),
      mutationAPI.getByParcel(id),
    ])
      .then(([parcelRes, ownersRes, regRes, mutRes]) => {
        setParcel(parcelRes.data.data);
        setOwners(ownersRes.data.data || []);
        setRegistrations(regRes.data.data || []);
        setMutations(mutRes.data.data || []);
      })
      .catch(() => setError('Failed to load parcel details'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading parcel details..." />;
  if (error || !parcel) return <ErrorState message={error || 'Parcel not found'} />;

  const center: [number, number] = parcel.centroid_lng && parcel.centroid_lat
    ? [parcel.centroid_lng, parcel.centroid_lat]
    : [78.9629, 20.5937];

  return (
    <div className="container" style={{ padding: '24px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <span className="breadcrumb-sep">/</span>
        <Link to="/find">Find Land</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{parcel.ulpin || parcel.id}</span>
      </nav>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        flexWrap: 'wrap', gap: 16, marginBottom: 24,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <h1 style={{ fontSize: '1.75rem', margin: 0 }}>{parcel.ulpin || parcel.id}</h1>
            <StatusBadge status={parcel.status} size="md" />
          </div>
          <p style={{ color: 'var(--color-gray-500)', marginBottom: 0 }}>
            {parcel.village}, {parcel.tehsil}, {parcel.district}, {parcel.state}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link to={`/parcel/${id}/passport`} className="btn btn-outline">
            🛂 Land Passport
          </Link>
          <Link to={`/parcel/${id}/verify`} className="btn btn-outline">
            ✓ Verify
          </Link>
          <Link to={`/services`} className="btn btn-primary">
            Request Service
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 16, marginBottom: 32,
      }}>
        {[
          { label: 'Area', value: formatArea(parcel.area_sqm) },
          { label: 'Land Use', value: LAND_USE_LABELS[parcel.land_use] || parcel.land_use },
          { label: 'Owners', value: `${owners.length}` },
          { label: 'Registrations', value: `${registrations.length}` },
          { label: 'Mutations', value: `${mutations.length}` },
        ].map((item) => (
          <div key={item.label} style={{
            padding: '16px', background: 'var(--color-white)',
            border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-gray-900)' }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 24 }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16 }}>Details</h3>
            <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
              <div className="data-row"><span className="data-label">Parcel ID</span><span className="data-value">{parcel.id}</span></div>
              <div className="data-row"><span className="data-label">ULPIN</span><span className="data-value">{parcel.ulpin}</span></div>
              <div className="data-row"><span className="data-label">Survey Number</span><span className="data-value">{parcel.survey_number || '—'}</span></div>
              <div className="data-row"><span className="data-label">Khasra Number</span><span className="data-value">{parcel.khasra_number || '—'}</span></div>
              <div className="data-row"><span className="data-label">Khata Number</span><span className="data-value">{parcel.khata_number || '—'}</span></div>
              <div className="data-row"><span className="data-label">Classification</span><span className="data-value">{parcel.classification || '—'}</span></div>
              <div className="data-row"><span className="data-label">Last Updated</span><span className="data-value">{formatDate(parcel.updated_at)}</span></div>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16 }}>Location</h3>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-gray-200)' }}>
              <MapPanel center={center} zoom={14} parcelId={parcel.id} style={{ height: 300 }} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ownership' && (
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16 }}>Ownership Records</h3>
          {owners.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-gray-500)' }}>No ownership records available.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {owners.map((owner) => (
                <div key={owner.id} style={{
                  padding: 16, background: 'var(--color-white)',
                  border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontWeight: 600 }}>{owner.name}</div>
                    <StatusBadge status={owner.status} />
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>
                    {owner.owner_type} • {owner.share_percentage || 100}% share
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'records' && (
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16 }}>Registration & Mutation Records</h3>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Number</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...registrations.map((r) => ({ id: r.id, type: 'Registration', number: r.registration_number, date: r.registration_date, status: r.status })),
                  ...mutations.map((m) => ({ id: m.id, type: 'Mutation', number: m.mutation_number, date: m.mutation_date, status: m.status }))]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((rec) => (
                    <tr key={rec.id}>
                      <td>{rec.type}</td>
                      <td style={{ fontWeight: 500 }}>{rec.number}</td>
                      <td>{formatDate(rec.date)}</td>
                      <td><StatusBadge status={rec.status} /></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 16 }}>Recent Transactions</h3>
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-gray-500)' }}>
            {transactions.length === 0 ? 'No transactions recorded for this parcel.' : ''}
          </div>
        </div>
      )}
    </div>
  );
}
