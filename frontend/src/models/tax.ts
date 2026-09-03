export interface PropertyTax {
  id: string;
  parcel_id: string;
  assessment_year: string;
  assessed_value: number;
  tax_rate: number;
  annual_tax: number;
  paid_amount: number;
  pending_amount: number;
  last_payment_date?: string;
  next_due_date?: string;
  tax_history: TaxPayment[];
  status: 'paid' | 'partial' | 'unpaid' | 'exempted';
  source_state: string;
  created_at: string;
}

export interface TaxPayment {
  year: string;
  amount: number;
  date: string;
  receipt_number?: string;
}
