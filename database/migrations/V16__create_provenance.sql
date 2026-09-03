CREATE TABLE provenance (
    id BIGSERIAL PRIMARY KEY,
    parcel_id BIGINT REFERENCES parcels(id) ON DELETE CASCADE,
    source_system VARCHAR(255),
    source_department VARCHAR(255),
    source_record_id VARCHAR(100),
    last_updated TIMESTAMP,
    retrieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    version VARCHAR(50)
);
