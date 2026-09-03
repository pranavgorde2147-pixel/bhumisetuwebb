CREATE TABLE verification_results (
    id BIGSERIAL PRIMARY KEY,
    parcel_id BIGINT REFERENCES parcels(id) ON DELETE CASCADE,
    overall_status VARCHAR(50),
    check_results JSONB,
    verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
