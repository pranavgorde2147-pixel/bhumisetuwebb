CREATE TABLE encumbrances (
    id BIGSERIAL PRIMARY KEY,
    parcel_id BIGINT REFERENCES parcels(id) ON DELETE CASCADE,
    encumbrance_id VARCHAR(100),
    institution VARCHAR(255),
    encumbrance_type VARCHAR(100),
    amount DECIMAL(15,2),
    status VARCHAR(50),
    remarks TEXT,
    encumbrance_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
