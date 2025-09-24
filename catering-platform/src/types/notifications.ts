export type NotificationCategory =
  | 'events'
  | 'inventory'
  | 'reservations'
  | 'finance'
  | 'system';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: NotificationCategory;
  read: boolean;
}

export interface NotificationPreferences {
  events: boolean;
  inventory: boolean;
  reservations: boolean;
  finance: boolean;
  system: boolean;
}
