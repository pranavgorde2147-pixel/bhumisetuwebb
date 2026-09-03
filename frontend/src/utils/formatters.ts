import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatDate(date: string | Date | undefined): string {
  if (!date) return '—';
  return dayjs(date).format('DD MMM YYYY');
}

export function formatDateTime(date: string | Date | undefined): string {
  if (!date) return '—';
  return dayjs(date).format('DD MMM YYYY, hh:mm A');
}

export function formatRelativeTime(date: string | Date | undefined): string {
  if (!date) return '';
  return dayjs(date).fromNow();
}

export function formatCurrency(amount: number | undefined): string {
  if (amount === undefined || amount === null) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatArea(sqm: number | undefined, unit: 'sqm' | 'acres' | 'hectares' = 'sqm'): string {
  if (sqm === undefined || sqm === null) return '—';
  switch (unit) {
    case 'acres':
      return `${(sqm / 4046.86).toFixed(2)} acres`;
    case 'hectares':
      return `${(sqm / 10000).toFixed(2)} hectares`;
    default:
      return `${sqm.toLocaleString('en-IN')} sq m`;
  }
}

export function formatNumber(num: number | undefined): string {
  if (num === undefined || num === null) return '—';
  return num.toLocaleString('en-IN');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
