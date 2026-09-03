import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ServiceRequestForm from '../components/services/ServiceRequestForm';
import { SERVICE_TYPES } from '../utils/constants';

export default function ServiceRequest() {
  const { serviceType } = useParams<{ serviceType: string }>();
  const [submitted, setSubmitted] = useState(false);

  const service = SERVICE_TYPES.find((s) => s.id === serviceType);

  const handleSubmit = (data: Record<string, string>) => {
    console.log('Service request:', data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container" style={{ padding: '32px 24px 64px' }}>
        <div style={{
          maxWidth: 520, margin: '80px auto', textAlign: 'center',
          padding: '40px', background: 'var(--color-white)',
          border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 'var(--radius-full)',
            background: 'var(--color-success-bg)', color: 'var(--color-success)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.75rem', margin: '0 auto 16px',
          }}>
            ✓
          </div>
          <h2 style={{ marginBottom: 8 }}>Request Submitted</h2>
          <p style={{ color: 'var(--color-gray-500)', marginBottom: 24 }}>
            Your {service?.label || 'service'} request has been submitted successfully.
            You will receive updates on your registered mobile number.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link to="/transactions" className="btn btn-primary">View My Applications</Link>
            <Link to="/services" className="btn btn-outline">Back to Services</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '32px 24px 64px', maxWidth: 680 }}>
      <nav className="breadcrumb">
        <a href="/">Home</a><span className="breadcrumb-sep">/</span>
        <Link to="/services">Services</Link><span className="breadcrumb-sep">/</span>
        <span>{service?.label || 'Service Request'}</span>
      </nav>
      <div className="page-header">
        <h1>{service?.label || 'Service Request'}</h1>
        <p className="page-header-desc">{service?.description}</p>
      </div>
      <div style={{
        padding: '28px', background: 'var(--color-white)',
        border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-xl)',
      }}>
        <ServiceRequestForm serviceType={serviceType || ''} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
