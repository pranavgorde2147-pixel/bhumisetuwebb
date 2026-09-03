import { useState, type FormEvent } from 'react';

interface ServiceRequestFormProps {
  serviceType: string;
  onSubmit?: (data: Record<string, string>) => void;
}

export default function ServiceRequestForm({ serviceType, onSubmit }: ServiceRequestFormProps) {
  const [formData, setFormData] = useState({
    parcel_id: '',
    full_name: '',
    phone: '',
    email: '',
    address: '',
    description: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.({ ...formData, service_type: serviceType });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label form-label-required">Parcel ID / ULPIN</label>
        <input
          type="text"
          className="form-input"
          value={formData.parcel_id}
          onChange={(e) => handleChange('parcel_id', e.target.value)}
          placeholder="Enter parcel ID or ULPIN"
          required
          aria-label="Parcel ID"
        />
      </div>
      <div className="form-group">
        <label className="form-label form-label-required">Full Name</label>
        <input
          type="text"
          className="form-input"
          value={formData.full_name}
          onChange={(e) => handleChange('full_name', e.target.value)}
          placeholder="Enter your full name"
          required
          aria-label="Full name"
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="form-group">
          <label className="form-label form-label-required">Phone</label>
          <input
            type="tel"
            className="form-input"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            required
            aria-label="Phone number"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="email@example.com"
            aria-label="Email"
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Address</label>
        <input
          type="text"
          className="form-input"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Enter your address"
          aria-label="Address"
        />
      </div>
      <div className="form-group">
        <label className="form-label form-label-required">Description / Request Details</label>
        <textarea
          className="form-input"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe your request in detail..."
          rows={4}
          required
          aria-label="Description"
        />
      </div>
      <button type="submit" className="btn btn-primary btn-lg w-full">
        Submit Request
      </button>
    </form>
  );
}
