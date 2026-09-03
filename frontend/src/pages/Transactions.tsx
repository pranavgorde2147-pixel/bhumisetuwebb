import { useState, useEffect } from 'react';
import { transactionAPI } from '../api/endpoints';
import TransactionCard from '../components/transactions/TransactionCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import type { Transaction } from '../models/transaction';

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    transactionAPI.list()
      .then((res) => setTransactions(res.data.data?.items || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner text="Loading transactions..." />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <span className="breadcrumb-sep">/</span>
        <span>My Applications</span>
      </nav>
      <div className="page-header">
        <h1>My Applications</h1>
        <p className="page-header-desc">Track your service requests and applications.</p>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No Applications Yet"
          description="You haven't submitted any service requests yet."
          action={<a href="/services" className="btn btn-primary">Browse Services</a>}
        />
      ) : (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 16,
        }}>
          {transactions.map((t) => (
            <TransactionCard key={t.id} transaction={t} />
          ))}
        </div>
      )}
    </div>
  );
}
