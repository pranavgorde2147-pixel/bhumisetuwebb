import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import { parcelAPI } from '../api/endpoints';
import type { ParcelSearchResult } from '../models/parcel';
import { SERVICE_TYPES } from '../utils/constants';

const quickActions = [
  { label: 'Find Land', icon: '🔍', path: '/find', color: 'var(--color-primary-50)' },
  { label: 'My Land', icon: '🏠', path: '/transactions', color: 'var(--color-secondary-50)' },
  { label: 'Verify Parcel', icon: '✓', path: '/find', color: 'var(--color-accent-50)' },
  { label: 'Services', icon: '📋', path: '/services', color: 'var(--color-success-bg)' },
];

export default function Home() {
  const navigate = useNavigate();
  const [results, setResults] = useState<ParcelSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const res = await parcelAPI.autocomplete(query);
      setResults(res.data.data || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (result: ParcelSearchResult) => {
    navigate(`/parcel/${result.parcel.id}`);
  };

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0D3B12 0%, #1B5E20 40%, #1565C0 100%)',
        color: 'white', padding: '80px 0 96px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative background elements */}
        <div style={{
          position: 'absolute', top: -100, right: -100,
          width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
        }} />
        <div style={{
          position: 'absolute', bottom: -50, left: -50,
          width: 250, height: 250, borderRadius: '50%',
          background: 'rgba(255,255,255,0.02)',
        }} />
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{
              display: 'inline-block', padding: '6px 14px',
              background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)',
              fontSize: '0.8125rem', fontWeight: 500, marginBottom: 20,
              backdropFilter: 'blur(4px)',
            }}>
              🇮🇳 Government of India Initiative
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800,
              lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em',
            }}>
              One Parcel.<br />One Unified View.
            </h1>
            <p style={{
              fontSize: '1.125rem', opacity: 0.85, marginBottom: 36,
              lineHeight: 1.7, maxWidth: 540,
            }}>
              Access verified, transparent, and comprehensive land records across India.
              Every parcel, every document, one trusted platform.
            </p>

            <SearchBar
              onSearch={handleSearch}
              onSelect={handleSelect}
              suggestions={results}
              loading={loading}
              placeholder="Search by Parcel ID, ULPIN, Survey Number, or location..."
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container" style={{ marginTop: -40, position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 16, maxWidth: 720,
        }}>
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.path}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 8, padding: '20px 12px', background: 'var(--color-white)',
                border: '1px solid var(--color-gray-200)',
                borderRadius: 'var(--radius-lg)', textDecoration: 'none',
                color: 'var(--color-gray-800)', boxShadow: 'var(--shadow-md)',
                transition: 'all var(--transition-normal)',
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 'var(--radius-lg)',
                background: action.color, display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem',
              }}>
                {action.icon}
              </div>
              <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>{action.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Land Services */}
      <section className="container" style={{ padding: '64px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ marginBottom: 8 }}>Land Services</h2>
          <p style={{ color: 'var(--color-gray-500)', maxWidth: 500, margin: '0 auto' }}>
            Access essential land-related services digitally
          </p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 20,
        }}>
          {SERVICE_TYPES.map((service) => (
            <Link
              key={service.id}
              to={`/services/request/${service.id}`}
              style={{
                display: 'flex', gap: 16, padding: '20px',
                background: 'var(--color-white)', border: '1px solid var(--color-gray-200)',
                borderRadius: 'var(--radius-lg)', textDecoration: 'none',
                color: 'inherit', transition: 'all var(--transition-normal)',
              }}
              className="parcel-card"
            >
              <div style={{
                width: 44, height: 44, borderRadius: 'var(--radius-lg)',
                background: 'var(--color-primary-50)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem',
                flexShrink: 0,
              }}>
                {service.icon}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: 4 }}>{service.label}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>{service.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Updates */}
      <section style={{ background: 'var(--color-white)', borderTop: '1px solid var(--color-gray-100)' }}>
        <div className="container" style={{ padding: '48px 24px' }}>
          <h2 style={{ marginBottom: 32, textAlign: 'center' }}>Platform Updates</h2>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {[
              { title: '15 States Now Live', desc: 'BHUMISETU now covers land records from 15 states across India with unified cross-state interpretation.', date: '2 days ago' },
              { title: 'Enhanced Verification', desc: 'New 9-point verification system provides deeper parcel validation across multiple data sources.', date: '1 week ago' },
              { title: 'Digital Land Passport', desc: 'Access your complete land profile with the new Digital Land Passport feature.', date: '2 weeks ago' },
            ].map((update, i) => (
              <div key={i} style={{
                padding: '20px', border: '1px solid var(--color-gray-200)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{update.title}</div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', marginBottom: 8 }}>
                  {update.desc}
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>{update.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
