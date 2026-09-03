CREATE TABLE service_requests (
    id BIGSERIAL PRIMARY KEY,
    citizen_id BIGINT REFERENCES citizens(id),
    parcel_id BIGINT REFERENCES parcels(id),
    service_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'SUBMITTED',
    description TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
