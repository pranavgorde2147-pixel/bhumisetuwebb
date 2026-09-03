export interface Parcel {
  id: string;
  ulpin: string;
  survey_number?: string;
  khasra_number?: string;
  khata_number?: string;
  village: string;
  tehsil: string;
  district: string;
  state: string;
  state_code: string;
  area_sqm: number;
  area_acres: number;
  land_use: string;
  land_use_code?: string;
  classification?: string;
  status: 'consistent' | 'review_required' | 'incomplete' | 'unavailable';
  verification_score?: number;
  geometry_type?: string;
  coordinates?: number[][][];
  centroid_lat?: number;
  centroid_lng?: number;
  created_at: string;
  updated_at: string;
}

export interface ParcelSearchResult {
  parcel: Parcel;
  match_score: number;
  match_field: string;
}

export interface ParcelSearchParams {
  query?: string;
  parcel_id?: string;
  ulpin?: string;
  survey_number?: string;
  khasra_number?: string;
  khata_number?: string;
  village?: string;
  tehsil?: string;
  district?: string;
  state?: string;
  land_use?: string;
  page?: number;
  page_size?: number;
}
