import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { mockNotifications } from '../data/mockData';
import {
  Notification,
  NotificationCategory,
  NotificationPreferences,
} from '../types/notifications';

interface NotificationContextValue {
  notifications: Notification[];
  preferences: NotificationPreferences;
  unreadCount: number;
  markAsRead: (id: string) => void;
  togglePreference: (category: NotificationCategory) => void;
  addNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

const defaultPreferences: NotificationPreferences = {
  events: true,
  inventory: true,
  reservations: true,
  finance: true,
  system: true,
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  }, []);

  const togglePreference = useCallback((category: NotificationCategory) => {
    setPreferences((prev) => ({ ...prev, [category]: !prev[category] }));
  }, []);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);

  const value = useMemo(
    () => ({ notifications, preferences, unreadCount, markAsRead, togglePreference, addNotification }),
    [notifications, preferences, unreadCount, markAsRead, togglePreference, addNotification]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotificationContext = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext debe utilizarse dentro de un NotificationProvider');
  }
  return context;
};
