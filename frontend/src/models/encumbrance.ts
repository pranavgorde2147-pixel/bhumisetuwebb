export interface Encumbrance {
  id: string;
  parcel_id: string;
  encumbrance_type: 'mortgage' | 'lien' | 'charge' | 'lease' | 'easement' | 'restriction';
  encumbered_amount?: number;
  encumbrance_date: string;
  expiry_date?: string;
  encumbrancer: string;
  beneficiary?: string;
  status: 'active' | 'released' | 'expired' | 'disputed';
  document_reference?: string;
  remarks?: string;
  source_state: string;
  created_at: string;
}
