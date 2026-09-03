CREATE TABLE owners (
    id BIGSERIAL PRIMARY KEY,
    parcel_id BIGINT REFERENCES parcels(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    owner_type VARCHAR(50),
    share_percentage DECIMAL(5,2),
    record_source VARCHAR(255),
    last_verified TIMESTAMP,
    effective_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
