import type { Notification } from '../../models/notification';
import { formatRelativeTime } from '../../utils/formatters';

interface NotificationItemProps {
  notification: Notification;
  onRead?: (id: string) => void;
}

const typeColors: Record<string, { bg: string; text: string }> = {
  info: { bg: 'var(--color-info-bg)', text: 'var(--color-info)' },
  success: { bg: 'var(--color-success-bg)', text: 'var(--color-success)' },
  warning: { bg: 'var(--color-warning-bg)', text: 'var(--color-warning)' },
  error: { bg: 'var(--color-error-bg)', text: 'var(--color-error)' },
};

const typeIcons: Record<string, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '!',
  error: '✗',
};

export default function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const colors = typeColors[notification.type] || typeColors.info;

  return (
    <div
      className={`notification-item ${!notification.read ? 'unread' : ''}`}
      onClick={() => !notification.read && onRead?.(notification.id)}
      role="article"
      aria-label={notification.title}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onRead?.(notification.id);
      }}
    >
      <div
        className="notification-item-icon"
        style={{ backgroundColor: colors.bg, color: colors.text }}
      >
        {typeIcons[notification.type]}
      </div>
      <div className="notification-item-content">
        <div className="notification-item-title">{notification.title}</div>
        <div className="notification-item-desc">{notification.message}</div>
        <div className="notification-item-time">{formatRelativeTime(notification.created_at)}</div>
      </div>
    </div>
  );
}
