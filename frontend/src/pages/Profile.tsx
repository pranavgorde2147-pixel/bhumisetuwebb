import { useAuth } from '../state/AuthContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="container" style={{ padding: '32px 24px 64px', maxWidth: 640 }}>
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <span className="breadcrumb-sep">/</span>
        <span>Profile</span>
      </nav>
      <div className="page-header">
        <h1>My Profile</h1>
      </div>

      {!isAuthenticated ? (
        <div style={{
          padding: '40px', background: 'var(--color-white)',
          border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)',
          textAlign: 'center',
        }}>
          <p style={{ color: 'var(--color-gray-500)', marginBottom: 16 }}>Please login to view your profile.</p>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      ) : (
        <div style={{
          padding: '32px', background: 'var(--color-white)',
          border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 'var(--radius-full)',
              background: 'var(--color-primary-100)', color: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.75rem', fontWeight: 700,
            }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: 4 }}>{user?.name}</h2>
              <p style={{ color: 'var(--color-gray-500)', marginBottom: 0 }}>{user?.phone}</p>
            </div>
          </div>

          <div className="data-row">
            <span className="data-label">Phone</span>
            <span className="data-value">{user?.phone}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Email</span>
            <span className="data-value">{user?.email || '—'}</span>
          </div>
          <div className="data-row">
            <span className="data-label">User ID</span>
            <span className="data-value">{user?.id}</span>
          </div>

          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <Link to="/transactions" className="btn btn-outline">My Applications</Link>
            <button onClick={logout} className="btn btn-ghost" style={{ color: 'var(--color-error)' }}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
