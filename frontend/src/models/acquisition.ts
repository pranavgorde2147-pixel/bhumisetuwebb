export interface AcquisitionProject {
  id: string;
  project_name: string;
  project_type: 'highway' | 'railway' | 'irrigation' | 'industrial' | 'urban_development' | 'power' | 'other';
  description?: string;
  authority: string;
  status: 'proposed' | 'survey' | 'notification' | 'hearing' | 'awarded' | 'completed' | 'disputed';
  estimated_parcel_count: number;
  affected_states: string[];
  start_date?: string;
  target_date?: string;
  created_at: string;
}

export interface ParcelAcquisition {
  id: string;
  parcel_id: string;
  project_id: string;
  project_name: string;
  area_required_sqm: number;
  compensation_offered?: number;
  compensation_status: 'pending' | 'offered' | 'accepted' | 'disputed' | 'paid';
  hearing_date?: string;
  status: 'identified' | 'notified' | 'hearing' | 'awarded' | 'acquired' | 'disputed';
  representations: Representation[];
  created_at: string;
}

export interface Representation {
  id: string;
  acquisition_id: string;
  representor_name: string;
  representation_type: 'objection' | 'counter' | 'evidence' | 'alternative';
  description: string;
  filed_date: string;
  status: 'filed' | 'under_review' | 'accepted' | 'rejected';
}
