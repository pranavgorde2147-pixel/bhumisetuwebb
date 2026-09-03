CREATE TABLE record_of_rights (
    id BIGSERIAL PRIMARY KEY,
    parcel_id BIGINT REFERENCES parcels(id) ON DELETE CASCADE,
    record_number VARCHAR(100),
    khasra_khata VARCHAR(100),
    land_type VARCHAR(100),
    issue_date DATE,
    status VARCHAR(50),
    source VARCHAR(255),
    last_updated TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
