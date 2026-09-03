CREATE TABLE mutation_records (
    id BIGSERIAL PRIMARY KEY,
    parcel_id BIGINT REFERENCES parcels(id) ON DELETE CASCADE,
    mutation_id VARCHAR(100) UNIQUE,
    mutation_type VARCHAR(100),
    applicant_name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'SUBMITTED',
    submitted_date TIMESTAMP,
    completed_date TIMESTAMP,
    remarks TEXT,
    source VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
