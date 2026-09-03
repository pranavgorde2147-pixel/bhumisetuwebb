import type { Notification } from '../../models/notification';
import NotificationItem from './NotificationItem';
import EmptyState from '../common/EmptyState';

interface NotificationPanelProps {
  notifications: Notification[];
  onRead?: (id: string) => void;
  onMarkAllRead?: () => void;
}

export default function NotificationPanel({ notifications, onRead, onMarkAllRead }: NotificationPanelProps) {
  if (!notifications.length) {
    return (
      <div className="notification-panel">
        <EmptyState icon="🔔" title="No Notifications" description="You're all caught up!" />
      </div>
    );
  }

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="notification-panel">
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 16px', borderBottom: '1px solid var(--color-gray-100)',
      }}>
        <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
          {unread > 0 ? `${unread} unread` : 'All read'}
        </span>
        {unread > 0 && (
          <button
            onClick={onMarkAllRead}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '0.75rem' }}
          >
            Mark all read
          </button>
        )}
      </div>
      {notifications.map((notif) => (
        <NotificationItem key={notif.id} notification={notif} onRead={onRead} />
      ))}
    </div>
  );
}
