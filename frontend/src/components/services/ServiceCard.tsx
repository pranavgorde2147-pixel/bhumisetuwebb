import { Link } from 'react-router-dom';

interface ServiceCardProps {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export default function ServiceCard({ id, label, icon, description }: ServiceCardProps) {
  return (
    <Link to={`/services/request/${id}`} className="service-card">
      <div
        className="service-card-icon"
        style={{
          backgroundColor: 'var(--color-primary-50)',
          color: 'var(--color-primary)',
        }}
      >
        {icon}
      </div>
      <div className="service-card-title">{label}</div>
      <div className="service-card-desc">{description}</div>
    </Link>
  );
}
