import { UserRole } from '../types/auth';

export const getDefaultRouteForRole = (role: UserRole): string => {
  switch (role) {
    case 'administrator':
      return '/dashboard';
    case 'coordinator':
      return '/events';
    case 'chef':
      return '/menus';
    case 'purchasing':
      return '/purchases';
    case 'client':
      return '/client/catalog';
    default:
      return '/notifications';
  }
};
