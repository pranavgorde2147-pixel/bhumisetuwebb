import type { Transaction } from '../../models/transaction';
import { formatDateTime } from '../../utils/formatters';

interface TransactionTimelineProps {
  transaction: Transaction;
}

export default function TransactionTimeline({ transaction }: TransactionTimelineProps) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{transaction.title}</h4>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>
            Step {transaction.current_step} of {transaction.total_steps}
          </div>
        </div>
      </div>
      <div className="timeline">
        {transaction.events.map((event) => (
          <div key={event.id} className="timeline-item">
            <div className={`timeline-dot ${event.status}`} />
            <div className="timeline-content">
              <div className="timeline-title">{event.title}</div>
              {event.description && <div className="timeline-desc">{event.description}</div>}
              {event.actor && (
                <div className="timeline-desc">By: {event.actor}</div>
              )}
              {event.timestamp && (
                <div className="timeline-time">{formatDateTime(event.timestamp)}</div>
              )}
              {event.remarks && (
                <div style={{
                  marginTop: 4, padding: '6px 10px', background: 'var(--color-gray-50)',
                  borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--color-gray-600)',
                }}>
                  {event.remarks}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
