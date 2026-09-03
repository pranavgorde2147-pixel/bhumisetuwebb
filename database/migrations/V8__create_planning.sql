CREATE TABLE planning_records (
    id BIGSERIAL PRIMARY KEY,
    parcel_id BIGINT REFERENCES parcels(id) ON DELETE CASCADE,
    current_land_use VARCHAR(100),
    zoning_category VARCHAR(100),
    master_plan_classification VARCHAR(100),
    building_permission_status VARCHAR(100),
    restrictions TEXT,
    source VARCHAR(255),
    last_updated TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
