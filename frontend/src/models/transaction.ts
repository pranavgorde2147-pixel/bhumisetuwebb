export interface Transaction {
  id: string;
  type: string;
  title: string;
  description?: string;
  parcel_id?: string;
  status: 'initiated' | 'processing' | 'under_review' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  current_step: number;
  total_steps: number;
  events: TransactionEvent[];
  created_at: string;
  updated_at: string;
}

export interface TransactionEvent {
  id: string;
  step: number;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'pending';
  actor?: string;
  timestamp?: string;
  remarks?: string;
}
