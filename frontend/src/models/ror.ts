export interface RecordOfRights {
  id: string;
  parcel_id: string;
  ror_number?: string;
  registration_date?: string;
  rights_type: string;
  rights_description?: string;
  holders: RightsHolder[];
  source_state: string;
  source_system?: string;
  document_reference?: string;
  status: 'active' | 'revoked' | 'pending' | 'disputed';
  created_at: string;
}

export interface RightsHolder {
  name: string;
  relationship?: string;
  share: string;
  rights: string;
}
