CREATE TABLE registration_records (
    id BIGSERIAL PRIMARY KEY,
    parcel_id BIGINT REFERENCES parcels(id) ON DELETE CASCADE,
    transaction_id VARCHAR(100),
    registration_date DATE,
    sro_office VARCHAR(255),
    deed_type VARCHAR(100),
    consideration_amount DECIMAL(15,2),
    status VARCHAR(50),
    source VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
