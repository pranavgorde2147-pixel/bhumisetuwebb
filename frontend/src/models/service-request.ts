export interface ServiceRequest {
  id: string;
  service_type: string;
  parcel_id?: string;
  requester_id: string;
  status: 'draft' | 'submitted' | 'processing' | 'under_review' | 'approved' | 'rejected' | 'completed';
  formData: Record<string, unknown>;
  assigned_to?: string;
  remarks?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}
