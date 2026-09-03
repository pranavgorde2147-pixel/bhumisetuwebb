export interface Dispute {
  id: string;
  parcel_id: string;
  dispute_type: 'boundary' | 'ownership' | 'inheritance' | 'encroachment' | 'title' | 'partition' | 'other';
  case_number?: string;
  court_name?: string;
  court_level?: 'district' | 'high_court' | 'supreme_court' | 'tribunal' | 'revenue_court';
  filed_date: string;
  next_hearing_date?: string;
  parties: DisputeParty[];
  description?: string;
  status: 'pending' | 'ongoing' | 'resolved' | 'appealed' | 'dismissed';
  judgment_details?: string;
  source_state: string;
  created_at: string;
}

export interface DisputeParty {
  name: string;
  role: 'plaintiff' | 'defendant' | 'third_party';
  representation?: string;
}
