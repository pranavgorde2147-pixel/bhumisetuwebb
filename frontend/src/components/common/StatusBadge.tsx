import { STATUS_LABELS } from '../../utils/constants';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

const statusClassMap: Record<string, string> = {
  consistent: 'badge-success',
  active: 'badge-success',
  approved: 'badge-success',
  completed: 'badge-success',
  pass: 'badge-success',
  paid: 'badge-success',
  accepted: 'badge-success',
  resolved: 'badge-success',
  registered: 'badge-success',
  released: 'badge-success',
  compliant: 'badge-success',
  verified: 'badge-success',

  review_required: 'badge-warning',
  pending: 'badge-warning',
  processing: 'badge-warning',
  under_review: 'badge-warning',
  partial: 'badge-warning',
  warning: 'badge-warning',
  filed: 'badge-warning',
  ongoing: 'badge-warning',
  proposed: 'badge-warning',
  survey: 'badge-warning',
  notification: 'badge-warning',
  hearing: 'badge-warning',

  incomplete: 'badge-info',
  submitted: 'badge-info',
  draft: 'badge-info',
  info: 'badge-info',

  rejected: 'badge-error',
  fail: 'badge-error',
  unpaid: 'badge-error',
  disputed: 'badge-error',
  dismissed: 'badge-error',
  expired: 'badge-error',
  cancelled: 'badge-error',
  revoked: 'badge-error',
  non_compliant: 'badge-error',

  unavailable: 'badge-neutral',
  na: 'badge-neutral',
  exempted: 'badge-neutral',
};

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const label = STATUS_LABELS[status] || status;
  const className = statusClassMap[status] || 'badge-neutral';

  return (
    <span
      className={`badge ${className}`}
      style={size === 'sm' ? { padding: '2px 8px', fontSize: '0.7rem' } : undefined}
      role="status"
      aria-label={`Status: ${label}`}
    >
      {label}
    </span>
  );
}
