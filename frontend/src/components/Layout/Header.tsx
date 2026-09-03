import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/find', label: 'Find Land' },
  { path: '/map', label: 'Map' },
  { path: '/services', label: 'Services' },
  { path: '/transactions', label: 'Activity' },
];

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <Link to="/" className="header-brand" aria-label="BHUMISETU Home">
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: 16,
          }}>
            B
          </div>
          <div>
            <span className="header-brand-text">BHUMISETU</span>
            <span className="header-brand-sub">One Parcel. One Unified View.</span>
          </div>
        </Link>

        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`header-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              aria-current={location.pathname === link.path ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link
            to="/notifications"
            className="header-notification-btn"
            aria-label="Notifications"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="header-notification-count" aria-hidden="true">3</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="header-avatar" aria-label="Profile">
                {user?.name?.charAt(0) || 'U'}
              </Link>
              <button
                onClick={logout}
                className="btn btn-ghost btn-sm"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}

          <button
            className="btn btn-ghost btn-icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            style={{ display: 'none' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="header-nav" style={{ display: 'flex', flexDirection: 'column', padding: '8px 24px 16px', borderTop: '1px solid var(--color-gray-100)' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`header-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
              style={{ padding: '10px 0' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
