export interface VerificationResult {
  parcel_id: string;
  overall_score: number;
  overall_status: 'verified' | 'partially_verified' | 'unverified' | 'discrepancies_found';
  checks: CheckResult[];
  verified_at: string;
}

export interface CheckResult {
  check_name: string;
  check_description: string;
  status: 'pass' | 'fail' | 'warning' | 'pending' | 'na';
  details?: string;
  confidence?: number;
  checked_at?: string;
}
