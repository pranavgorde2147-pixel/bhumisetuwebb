-- ============================================================================
-- BHUMISETU Demo Seed Data
-- ============================================================================

-- ============================================================================
-- 1. CITIZENS
-- ============================================================================
INSERT INTO citizens (id, mobile_number, name, email, preferred_language)
VALUES
(1, '1111111111', 'Arjun Mehta', 'arjun.mehta@example.com', 'en'),
(2, '2222222222', 'Kavya Nair', 'kavya.nair@example.com', 'en'),
(3, '3333333333', 'Rohan Deshpande', 'rohan.deshpande@example.com', 'en'),
(4, '4444444444', 'Meera Iyer', 'meera.iyer@example.com', 'en'),
(5, '5555555555', 'Sameer Khan', 'sameer.khan@example.com', 'en');

SELECT setval('citizens_id_seq', 5);

-- ============================================================================
-- 2. PARCELS
-- ============================================================================
INSERT INTO parcels (id, parcel_id, ulpin, survey_number, khasra_number, khata_number,
                     village, tehsil, district, state, area_sq_m, land_use,
                     status, risk_score, center_lat, center_lng)
VALUES
(1, 'PB-CHD-000128', 'PB-CHD-ULP-2024-00128', '128', 'K-128', 'KH-128',
 'Mauli Jagran', 'Chandigarh', 'Chandigarh', 'Chandigarh', 1240.00,
 'RESIDENTIAL', 'ACTIVE', 'LOW', 30.7333000, 76.7794000),

(2, 'PB-CHD-000129', 'PB-CHD-ULP-2024-00129', '129', 'K-129', 'KH-129',
 'Mauli Jagran', 'Chandigarh', 'Chandigarh', 'Chandigarh', 860.50,
 'RESIDENTIAL', 'ACTIVE', 'LOW', 30.7341000, 76.7802000),

(3, 'RJ-JP-000456', 'RJ-JP-ULP-2024-00456', '456', 'K-456', 'KH-456',
 'Jagatpura', 'Jaipur', 'Jaipur', 'Rajasthan', 2150.75,
 'COMMERCIAL', 'ACTIVE', 'MEDIUM', 26.8854000, 75.8102000);

SELECT setval('parcels_id_seq', 3);

-- ============================================================================
-- 3. PARCEL GEOMETRY
-- ============================================================================
-- Parcel PB-CHD-000128: realistic polygon around Chandigarh coordinates
INSERT INTO parcel_geometry (parcel_id, geometry, geom_type)
VALUES (1,
  ST_GeomFromText('POLYGON(
    30.7327000 76.7788000,
    30.7327000 76.7800000,
    30.7339000 76.7800000,
    30.7339000 76.7788000,
    30.7327000 76.7788000
  )', 4326),
  'LAND_PARCEL');

-- Parcel PB-CHD-000129
INSERT INTO parcel_geometry (parcel_id, geometry, geom_type)
VALUES (2,
  ST_GeomFromText('POLYGON(
    30.7335000 76.7796000,
    30.7335000 76.7808000,
    30.7347000 76.7808000,
    30.7347000 76.7796000,
    30.7335000 76.7796000
  )', 4326),
  'LAND_PARCEL');

-- Parcel RJ-JP-000456
INSERT INTO parcel_geometry (parcel_id, geometry, geom_type)
VALUES (3,
  ST_GeomFromText('POLYGON(
    26.8848000 75.8096000,
    26.8848000 75.8108000,
    26.8860000 75.8108000,
    26.8860000 75.8096000,
    26.8848000 75.8096000
  )', 4326),
  'LAND_PARCEL');

-- ============================================================================
-- 4. OWNERS
-- ============================================================================
INSERT INTO owners (parcel_id, name, owner_type, share_percentage,
                    record_source, last_verified, effective_date)
VALUES (1, 'Arjun Mehta', 'Individual', 100.00,
        'Chandigarh Revenue Department', '2026-01-15 10:30:00', '2020-06-15');

-- ============================================================================
-- 5. RECORD OF RIGHTS
-- ============================================================================
INSERT INTO record_of_rights (parcel_id, record_number, khasra_khata,
                              land_type, issue_date, status, source, last_updated)
VALUES (1, 'ROR-CHD-2024-00128', 'K-128/KH-128',
        'Non-Agricultural', '2020-06-15', 'ACTIVE',
        'Chandigarh Revenue Department', '2026-01-15 10:30:00');

-- ============================================================================
-- 6. REGISTRATION RECORDS
-- ============================================================================
INSERT INTO registration_records (parcel_id, transaction_id, registration_date,
                                  sro_office, deed_type, consideration_amount,
                                  status, source)
VALUES (1, 'REG-CHD-2020-04521', '2020-06-15',
        'SRO Chandigarh - Sector 17', 'Sale Deed', 4500000.00,
        'REGISTERED', 'Chandigarh Registration Department');

-- ============================================================================
-- 7. MUTATION RECORDS
-- ============================================================================
INSERT INTO mutation_records (parcel_id, mutation_id, mutation_type,
                              applicant_name, status, submitted_date,
                              remarks, source)
VALUES (1, 'MUT-2026-00912', 'Succession',
        'Arjun Mehta', 'SUBMITTED', '2026-03-10 09:15:00',
        'Mutation application for succession after father''s demise. Documents verified.',
        'Chandigarh Revenue Department');

-- ============================================================================
-- 8. ENCUMBRANCES
-- ============================================================================
-- No encumbrances for PB-CHD-000128 (clear title)

-- ============================================================================
-- 9. PLANNING RECORDS
-- ============================================================================
INSERT INTO planning_records (parcel_id, current_land_use, zoning_category,
                              master_plan_classification, building_permission_status,
                              restrictions, source, last_updated)
VALUES (1, 'Residential', 'R-1 (Residential)',
        'Residential Zone - Low Density', 'Approved',
        'Max building height: 15m. Min setback: 3m front, 2m sides.',
        'Chandigarh Housing Board', '2026-02-20 14:00:00');

-- ============================================================================
-- 10. PROPERTY TAX
-- ============================================================================
INSERT INTO property_tax (parcel_id, assessment_year, annual_tax,
                          outstanding_amount, payment_status,
                          last_payment_date, source, last_updated)
VALUES (1, '2026-2027', 12500.00, 0.00,
        'PAID', '2026-04-01',
        'Chandigarh Municipal Corporation', '2026-04-01 11:00:00');

-- ============================================================================
-- 11. DISPUTES
-- ============================================================================
-- No active disputes (resolved historical)

-- ============================================================================
-- 12. DOCUMENTS
-- ============================================================================
INSERT INTO documents (parcel_id, title, document_type, category,
                      file_path, file_size, mime_type, source, status)
VALUES
(1, 'Sale Deed - Arjun Mehta (2020)', 'Sale Deed', 'Registration',
 '/documents/PB-CHD-000128/sale-deed-2020.pdf', 245760,
 'application/pdf', 'Chandigarh Registration Department', 'VERIFIED'),

(1, 'Property Tax Receipt 2026-2027', 'Tax Receipt', 'Tax',
 '/documents/PB-CHD-000128/tax-receipt-2026.pdf', 51200,
 'application/pdf', 'Chandigarh Municipal Corporation', 'VERIFIED'),

(1, 'Encumbrance Certificate', 'Encumbrance Certificate', 'Encumbrance',
 '/documents/PB-CHD-000128/encumbrance-cert.pdf', 76800,
 'application/pdf', 'Chandigarh Registration Department', 'VERIFIED');

-- ============================================================================
-- 13. VERIFICATION RESULTS
-- ============================================================================
INSERT INTO verification_results (parcel_id, overall_status, check_results, verified_at)
VALUES (1, 'REVIEW_REQUIRED',
  '{
    "total_checks": 9,
    "passed": 7,
    "warnings": 1,
    "failed": 1,
    "checks": [
      {"check_name": "ownership_chain", "status": "PASS", "message": "Ownership chain is complete and verified"},
      {"check_name": "registration_status", "status": "PASS", "message": "Registration is valid and active"},
      {"check_name": "mutation_status", "status": "WARNING", "message": "Mutation MUT-2026-00912 is pending approval"},
      {"check_name": "encumbrance_check", "status": "PASS", "message": "No active encumbrances found"},
      {"check_name": "tax_compliance", "status": "PASS", "message": "All property taxes are current"},
      {"check_name": "dispute_check", "status": "PASS", "message": "No active disputes found"},
      {"check_name": "boundary_verification", "status": "PASS", "message": "Parcel boundaries match recorded geometry"},
      {"check_name": "planning_compliance", "status": "FAIL", "message": "Building setback violation on eastern boundary - 1.8m vs required 2m"},
      {"check_name": "title_clarity", "status": "PASS", "message": "Title is clear and marketable"}
    ]
  }'::jsonb,
  '2026-04-05 16:45:00');

-- ============================================================================
-- 14. STATE PROFILES
-- ============================================================================
INSERT INTO state_profiles (state_name, land_record_system, terminology_style)
VALUES
('Maharashtra', 'E-Hakk / Digital Satbara', 'Maharashtra Style'),
('Rajasthan', 'Apna Khata / REETHI', 'Rajasthani Style'),
('Chandigarh', 'Chandigarh Land Records', 'Punjabi Style'),
('Karnataka', 'Bhoomi / i-Khedath', 'Kannada Style'),
('Tamil Nadu', 'Patta Chitta', 'Tamil Style');

-- ============================================================================
-- 15. SEMANTIC FIELD MAPPINGS
-- ============================================================================
INSERT INTO semantic_field_mappings (source_state, target_state, source_field,
                                     common_concept, target_field, confidence_score,
                                     mapping_source)
VALUES
('Maharashtra', 'Chandigarh', 'Survey Number', 'Parcel Identifier',
 'Khasra Number', 0.95, 'Revenue Department Cross-Reference'),
('Rajasthan', 'Chandigarh', 'Khasra No.', 'Parcel Identifier',
 'Khasra Number', 0.98, 'Standard Revenue Records'),
('Karnataka', 'Chandigarh', 'Survey No.', 'Parcel Identifier',
 'Survey Number', 0.92, 'Land Records Interoperability Committee'),
('Tamil Nadu', 'Chandigarh', 'Patta No.', 'Ownership Record',
 'Khata Number', 0.88, 'Revenue Officers Manual Mapping'),
('Maharashtra', 'Rajasthan', '7/12 Extract', 'Land Ownership Extract',
 'Jamabandi', 0.85, 'National Land Records Modernization');

-- ============================================================================
-- 16. ACQUISITION PROJECTS
-- ============================================================================
INSERT INTO acquisition_projects (id, project_id, project_name, authority,
                                  notification_date, current_stage, status)
VALUES (1, 'LA-2026-0042', 'New Industrial Corridor - Chandigarh Extension',
        'Haryana Shehri Vikas Pradhikaran (HSVP)', '2026-02-01',
        'AWARD_PUBLISHED', 'IN_PROGRESS');

SELECT setval('acquisition_projects_id_seq', 1);

-- ============================================================================
-- 17. PARCEL ACQUISITIONS
-- ============================================================================
INSERT INTO parcel_acquisitions (parcel_id, project_id, total_area_sq_m,
                                 affected_area_sq_m, remaining_area_sq_m,
                                 acquisition_status, award_status,
                                 compensation_status, possession_status, rr_status)
VALUES (1, 1, 1240.00, 420.00, 820.00,
        'PARTIAL', 'PUBLISHED', 'PENDING', 'NOT_TAKEN', 'PENDING');

SELECT setval('parcel_acquisitions_id_seq', 1);

-- ============================================================================
-- 18. ACQUISITION MILESTONES
-- ============================================================================
INSERT INTO acquisition_milestones (project_id, milestone_name, milestone_date,
                                    status, description)
VALUES
(1, 'Section 4(1) Notification', '2026-02-01', 'COMPLETED',
 'Preliminary notification issued under LR Act for land acquisition'),
(1, 'Section 5(1) Declaration', '2026-03-15', 'COMPLETED',
 'Final declaration of intent to acquire published in Gazette'),
(1, 'Award Publication', '2026-04-20', 'IN_PROGRESS',
 'Compensation award being prepared by District Collector');

SELECT setval('acquisition_milestones_id_seq', 3);

-- ============================================================================
-- 19. ACQUISITION DOCUMENTS
-- ============================================================================
INSERT INTO acquisition_documents (project_id, parcel_acquisition_id, title,
                                   document_type, file_path)
VALUES
(1, 1, 'Section 4(1) Notification - LA-2026-0042', 'Notification',
 '/documents/acquisition/LA-2026-0042/section-4-notification.pdf'),
(1, 1, 'Land Acquisition Award - PB-CHD-000128', 'Award',
 '/documents/acquisition/LA-2026-0042/award-pb-chd-000128.pdf');

SELECT setval('acquisition_documents_id_seq', 2);

-- ============================================================================
-- 20. ACQUISITION GEOMETRY
-- ============================================================================
INSERT INTO acquisition_geometries (project_id, geometry, geom_type)
VALUES (1,
  ST_GeomFromText('POLYGON(
    30.7325000 76.7785000,
    30.7325000 76.7803000,
    30.7341000 76.7803000,
    30.7341000 76.7785000,
    30.7325000 76.7785000
  )', 4326),
  'ACQUISITION_ZONE');

-- ============================================================================
-- 21. NOTIFICATIONS
-- ============================================================================
INSERT INTO notifications (citizen_id, parcel_id, notification_type, title,
                           message, is_read, deep_link)
VALUES
(1, 1, 'LAND_UPDATE', 'Land Record Updated',
 'Your land record for PB-CHD-000128 has been updated with latest survey data.',
 FALSE, '/parcel/PB-CHD-000128'),

(1, 1, 'MUTATION_UPDATE', 'Mutation Application Status Updated',
 'Your mutation application MUT-2026-00912 has been forwarded to the Tehsildar for review.',
 FALSE, '/mutation/MUT-2026-00912'),

(1, 1, 'ACQUISITION', 'Land Acquisition Notification',
 'A portion of your land (420 sq m) has been notified for acquisition under LA-2026-0042. Award has been published.',
 TRUE, '/acquisition/LA-2026-0042');

-- ============================================================================
-- 22. PROVENANCE
-- ============================================================================
INSERT INTO provenance (parcel_id, source_system, source_department,
                        source_record_id, last_updated, version)
VALUES
(1, 'Chandigarh Land Records System', 'Department of Revenue & Disaster Management',
 'CLR-2024-00128', '2026-04-01 09:00:00', '1.0'),

(1, 'Chandigarh Registration Portal', 'Inspector General of Registration & Controller of Stamps',
 'REG-2020-04521', '2026-03-15 14:30:00', '1.0');
