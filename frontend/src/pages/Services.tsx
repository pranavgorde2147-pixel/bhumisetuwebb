import ServiceCard from '../components/services/ServiceCard';
import { SERVICE_TYPES } from '../utils/constants';

export default function Services() {
  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <span className="breadcrumb-sep">/</span>
        <span>Services</span>
      </nav>
      <div className="page-header">
        <h1>Land Services</h1>
        <p className="page-header-desc">
          Access essential land-related services digitally. Select a service to get started.
        </p>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 20,
      }}>
        {SERVICE_TYPES.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
}
