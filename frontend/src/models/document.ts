export interface Document {
  id: string;
  parcel_id: string;
  document_type: string;
  document_name: string;
  file_reference?: string;
  file_size?: number;
  mime_type?: string;
  uploaded_by?: string;
  uploaded_at: string;
  verified: boolean;
  source_state: string;
  description?: string;
}
