CREATE TABLE property_tax (
    id BIGSERIAL PRIMARY KEY,
    parcel_id BIGINT REFERENCES parcels(id) ON DELETE CASCADE,
    assessment_year VARCHAR(20),
    annual_tax DECIMAL(12,2),
    outstanding_amount DECIMAL(12,2) DEFAULT 0,
    payment_status VARCHAR(50),
    last_payment_date DATE,
    source VARCHAR(255),
    last_updated TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
