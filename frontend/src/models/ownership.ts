export interface Owner {
  id: string;
  parcel_id: string;
  name: string;
  father_name?: string;
  owner_type: 'individual' | 'joint' | 'government' | 'corporate' | 'trust';
  share_percentage?: number;
  id_type?: string;
  id_number?: string;
  address?: string;
  phone?: string;
  email?: string;
  status: 'active' | 'deceased' | 'transferred' | 'disputed';
  created_at: string;
}
