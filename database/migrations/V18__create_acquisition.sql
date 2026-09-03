CREATE TABLE acquisition_projects (
    id BIGSERIAL PRIMARY KEY,
    project_id VARCHAR(100) UNIQUE NOT NULL,
    project_name VARCHAR(255),
    authority VARCHAR(255),
    notification_date DATE,
    current_stage VARCHAR(100),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE parcel_acquisitions (
    id BIGSERIAL PRIMARY KEY,
    parcel_id BIGINT REFERENCES parcels(id) ON DELETE CASCADE,
    project_id BIGINT REFERENCES acquisition_projects(id),
    total_area_sq_m DECIMAL(12,2),
    affected_area_sq_m DECIMAL(12,2),
    remaining_area_sq_m DECIMAL(12,2),
    acquisition_status VARCHAR(50),
    award_status VARCHAR(50),
    compensation_status VARCHAR(50),
    possession_status VARCHAR(50),
    rr_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE acquisition_milestones (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT REFERENCES acquisition_projects(id),
    milestone_name VARCHAR(255),
    milestone_date DATE,
    status VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE acquisition_documents (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT REFERENCES acquisition_projects(id),
    parcel_acquisition_id BIGINT REFERENCES parcel_acquisitions(id),
    title VARCHAR(255),
    document_type VARCHAR(100),
    file_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE acquisition_geometries (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT REFERENCES acquisition_projects(id),
    geometry GEOMETRY(POLYGON, 4326),
    geom_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_acquisition_geom ON acquisition_geometries USING GIST(geometry);
