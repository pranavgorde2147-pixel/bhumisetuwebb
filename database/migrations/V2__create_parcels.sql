CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE parcels (
    id BIGSERIAL PRIMARY KEY,
    parcel_id VARCHAR(50) UNIQUE NOT NULL,
    ulpin VARCHAR(50),
    survey_number VARCHAR(50),
    khasra_number VARCHAR(50),
    khata_number VARCHAR(50),
    village VARCHAR(255),
    tehsil VARCHAR(255),
    district VARCHAR(255),
    state VARCHAR(100),
    area_sq_m DECIMAL(12,2),
    land_use VARCHAR(100),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    risk_score VARCHAR(20),
    center_lat DECIMAL(10,7),
    center_lng DECIMAL(10,7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE parcel_geometry (
    id BIGSERIAL PRIMARY KEY,
    parcel_id BIGINT REFERENCES parcels(id) ON DELETE CASCADE,
    geometry GEOMETRY(POLYGON, 4326),
    geom_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_parcel_geometry_geom ON parcel_geometry USING GIST(geometry);
CREATE INDEX idx_parcels_parcel_id ON parcels(parcel_id);
CREATE INDEX idx_parcels_state_district ON parcels(state, district);
CREATE INDEX idx_parcels_village ON parcels(village);
