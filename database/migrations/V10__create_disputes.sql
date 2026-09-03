CREATE TABLE disputes (
    id BIGSERIAL PRIMARY KEY,
    parcel_id BIGINT REFERENCES parcels(id) ON DELETE CASCADE,
    case_number VARCHAR(100),
    forum VARCHAR(255),
    case_type VARCHAR(100),
    filing_date DATE,
    status VARCHAR(50),
    description TEXT,
    source VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
