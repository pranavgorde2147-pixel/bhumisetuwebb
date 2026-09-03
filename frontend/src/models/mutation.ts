export interface MutationRecord {
  id: string;
  parcel_id: string;
  mutation_number: string;
  mutation_date: string;
  mutation_type: 'transfer' | 'inheritance' | 'partition' | 'correction' | 'split' | 'merge';
  description?: string;
  from_party?: string;
  to_party?: string;
  reason?: string;
  area_change?: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  authority?: string;
  source_state: string;
  created_at: string;
}
