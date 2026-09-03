CREATE TABLE state_profiles (
    id BIGSERIAL PRIMARY KEY,
    state_name VARCHAR(100) UNIQUE NOT NULL,
    land_record_system VARCHAR(255),
    terminology_style VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE semantic_field_mappings (
    id BIGSERIAL PRIMARY KEY,
    source_state VARCHAR(100),
    target_state VARCHAR(100),
    source_field VARCHAR(255),
    common_concept VARCHAR(255),
    target_field VARCHAR(255),
    confidence_score DECIMAL(3,2),
    mapping_source VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE document_interpretations (
    id BIGSERIAL PRIMARY KEY,
    parcel_id BIGINT REFERENCES parcels(id) ON DELETE CASCADE,
    source_state VARCHAR(100),
    target_state VARCHAR(100),
    interpretation_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
