import { Link } from 'react-router-dom';
import type { Transaction } from '../../models/transaction';
import StatusBadge from '../common/StatusBadge';
import { formatDateTime } from '../../utils/formatters';

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <Link
      to={`/transactions`}
      style={{
        display: 'block', padding: '16px', background: 'var(--color-white)',
        border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)',
        textDecoration: 'none', color: 'inherit',
        transition: 'all var(--transition-normal)',
      }}
      className="parcel-card"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{transaction.title}</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>
            {transaction.type}
          </div>
        </div>
        <StatusBadge status={transaction.status} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
        <span>Step {transaction.current_step}/{transaction.total_steps}</span>
        <span>{formatDateTime(transaction.updated_at)}</span>
      </div>
      <div style={{
        marginTop: 8, height: 4, background: 'var(--color-gray-100)',
        borderRadius: 'var(--radius-full)', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${(transaction.current_step / transaction.total_steps) * 100}%`,
          background: 'var(--color-primary)',
          borderRadius: 'var(--radius-full)',
        }} />
      </div>
    </Link>
  );
}
