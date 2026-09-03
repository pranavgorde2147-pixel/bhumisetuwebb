export interface InterpretationResult {
  parcel_id: string;
  source_state: string;
  target_state: string;
  fields: FieldInterpretation[];
  confidence_score: number;
  generated_at: string;
}

export interface FieldInterpretation {
  field_name: string;
  source_label: string;
  source_value: string;
  target_label: string;
  target_value: string;
  match_confidence: 'high' | 'medium' | 'low' | 'none';
  notes?: string;
}
