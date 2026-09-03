export interface RegistrationRecord {
  id: string;
  parcel_id: string;
  registration_number: string;
  registration_date: string;
  document_number?: string;
  document_type: string;
  description?: string;
  parties: RegistrationParty[];
  property_details?: string;
  consideration_amount?: number;
  stamp_duty?: number;
  registration_fee?: number;
  sub_registrar_office?: string;
  status: 'registered' | 'pending' | 'cancelled' | 'expired';
  source_state: string;
  created_at: string;
}

export interface RegistrationParty {
  name: string;
  role: 'executant' | 'claimant' | 'witness' | 'warrantor';
  father_name?: string;
  address?: string;
}
