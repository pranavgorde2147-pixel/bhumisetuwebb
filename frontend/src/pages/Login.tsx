import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../state/AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {
  const { isAuthenticated, isLoading, sendOTP, login } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>You're already logged in</h2>
        <p style={{ color: 'var(--color-gray-500)', marginBottom: 24 }}>Go to your profile to manage your account.</p>
        <Link to="/profile" className="btn btn-primary">View Profile</Link>
      </div>
    );
  }

  const handleSendOTP = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const sid = await sendOTP(phone);
      setSessionId(sid);
      setStep('otp');
    } catch {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(phone, sessionId, otp);
    } catch {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="container" style={{ padding: '80px 24px', maxWidth: 440 }}>
      <div style={{
        padding: '36px', background: 'var(--color-white)',
        border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 800, margin: '0 auto 16px',
          }}>
            B
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 4 }}>Login to BHUMISETU</h2>
          <p style={{ color: 'var(--color-gray-500)', fontSize: '0.875rem' }}>
            OTP-based secure authentication
          </p>
        </div>

        {error && (
          <div style={{
            padding: '10px 14px', background: 'var(--color-error-bg)',
            color: 'var(--color-error)', borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem', marginBottom: 16,
          }}>
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOTP}>
            <div className="form-group">
              <label className="form-label form-label-required">Mobile Number</label>
              <input
                type="tel"
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                required
                aria-label="Mobile number"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full btn-lg" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', marginBottom: 16 }}>
              OTP sent to <strong>{phone}</strong>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => { setStep('phone'); setOtp(''); }}
                style={{ marginLeft: 8, fontSize: '0.75rem' }}
              >
                Change
              </button>
            </div>
            <div className="form-group">
              <label className="form-label form-label-required">Enter OTP</label>
              <input
                type="text"
                className="form-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
                maxLength={6}
                required
                aria-label="OTP"
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary w-full btn-lg" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify & Login'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
