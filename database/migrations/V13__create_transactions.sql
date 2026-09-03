CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,
    citizen_id BIGINT REFERENCES citizens(id),
    parcel_id BIGINT REFERENCES parcels(id),
    service_request_id BIGINT REFERENCES service_requests(id),
    transaction_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'SUBMITTED',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transaction_events (
    id BIGSERIAL PRIMARY KEY,
    transaction_id BIGINT REFERENCES transactions(id) ON DELETE CASCADE,
    event_type VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
