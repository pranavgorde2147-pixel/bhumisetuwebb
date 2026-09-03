import { useState, useEffect } from 'react';
import { notificationAPI } from '../api/endpoints';
import NotificationPanel from '../components/notifications/NotificationPanel';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { Notification } from '../models/notification';

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationAPI.list()
      .then((res) => setNotifications(res.data.data?.items || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleRead = async (id: string) => {
    await notificationAPI.markRead(id);
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = async () => {
    await notificationAPI.markAllRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  if (loading) return <LoadingSpinner text="Loading notifications..." />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px', maxWidth: 680 }}>
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <span className="breadcrumb-sep">/</span>
        <span>Notifications</span>
      </nav>
      <div className="page-header">
        <h1>Notification Center</h1>
        <p className="page-header-desc">Stay updated on your land records and service requests.</p>
      </div>
      <NotificationPanel
        notifications={notifications}
        onRead={handleRead}
        onMarkAllRead={handleMarkAllRead}
      />
    </div>
  );
}
