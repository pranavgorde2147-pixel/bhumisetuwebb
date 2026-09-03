export const STATUS_COLORS = {
  consistent: { bg: '#E8F5E9', text: '#2E7D32', dot: '#2E7D32' },
  review_required: { bg: '#FFF8E1', text: '#F57F17', dot: '#F57F17' },
  incomplete: { bg: '#E3F2FD', text: '#1565C0', dot: '#1565C0' },
  unavailable: { bg: '#F1F5F9', text: '#64748B', dot: '#64748B' },
} as const;

export const STATUS_LABELS: Record<string, string> = {
  consistent: 'Verified',
  review_required: 'Review Required',
  incomplete: 'Incomplete',
  unavailable: 'Unavailable',
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  completed: 'Completed',
  processing: 'Processing',
  submitted: 'Submitted',
  draft: 'Draft',
  paid: 'Paid',
  unpaid: 'Unpaid',
  partial: 'Partial',
  pass: 'Pass',
  fail: 'Fail',
  warning: 'Warning',
  ongoing: 'Ongoing',
  resolved: 'Resolved',
  filed: 'Filed',
  under_review: 'Under Review',
  accepted: 'Accepted',
  identified: 'Identified',
  notified: 'Notified',
  acquired: 'Acquired',
  disputed: 'Disputed',
};

export const LAND_USE_LABELS: Record<string, string> = {
  agricultural: 'Agricultural',
  residential: 'Residential',
  commercial: 'Commercial',
  industrial: 'Industrial',
  institutional: 'Institutional',
  recreational: 'Recreational',
  forest: 'Forest',
  wasteland: 'Wasteland',
  water_body: 'Water Body',
  mixed: 'Mixed Use',
};

export const SERVICE_TYPES = [
  { id: 'encumbrance_certificate', label: 'Encumbrance Certificate', icon: '📋', description: 'Get encumbrance certificate for a parcel' },
  { id: 'title_search', label: 'Title Search Report', icon: '🔍', description: 'Complete title search and history' },
  { id: 'mutation_application', label: 'Mutation Application', icon: '📝', description: 'Apply for mutation of land records' },
  { id: 'property_valuation', label: 'Property Valuation', icon: '💰', description: 'Get property valuation report' },
  { id: 'land_conversion', label: 'Land Conversion', icon: '🔄', description: 'Apply for land use conversion' },
  { id: 'noc_request', label: 'NOC Request', icon: '✅', description: 'Request No Objection Certificate' },
  { id: 'grievance', label: 'File Grievance', icon: '⚠️', description: 'File a grievance related to land records' },
  { id: 'dispute_filing', label: 'Dispute Filing', icon: '⚖️', description: 'File a land dispute case' },
] as const;

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
] as const;
