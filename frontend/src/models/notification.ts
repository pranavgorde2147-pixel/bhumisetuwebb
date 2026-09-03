export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'transaction' | 'verification' | 'system' | 'alert' | 'update';
  read: boolean;
  action_url?: string;
  created_at: string;
}
