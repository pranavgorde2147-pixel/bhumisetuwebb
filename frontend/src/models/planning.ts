export interface PlanningRecord {
  id: string;
  parcel_id: string;
  zone_code: string;
  zone_name: string;
  zone_description?: string;
  land_use_allowed: string[];
  fsi?: number;
  far?: number;
  building_height_limit?: number;
  setback_front?: number;
  setback_side?: number;
  setback_rear?: number;
  parking_requirement?: string;
  green_area_requirement?: number;
  master_plan_reference?: string;
  status: 'compliant' | 'non_compliant' | 'under_review' | 'exempted';
  source_state: string;
  created_at: string;
}
