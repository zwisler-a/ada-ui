export interface Notification {
  duration?: number;
  title?: string;
  text?: string;
  type?: 'success' | 'failure' | 'warning';
}
