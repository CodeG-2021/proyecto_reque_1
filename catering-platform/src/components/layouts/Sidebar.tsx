import {
  BanknotesIcon,
  BellAlertIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  DocumentChartBarIcon,
  HomeModernIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import clsx from 'classnames';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { UserRole } from '../../types/auth';

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: Squares2X2Icon, roles: ['administrator'] },
  { label: 'User Management', to: '/users', icon: UserGroupIcon, roles: ['administrator'] },
  { label: 'Events', to: '/events', icon: CalendarDaysIcon, roles: ['coordinator', 'administrator'] },
  { label: 'Menus & Recipes', to: '/menus', icon: ClipboardDocumentCheckIcon, roles: ['coordinator', 'chef'] },
  { label: 'Purchases & Inventory', to: '/purchases', icon: ShoppingCartIcon, roles: ['purchasing', 'administrator'] },
  { label: 'Financial Reports', to: '/reports', icon: DocumentChartBarIcon, roles: ['administrator'] },
  { label: 'Client Services', to: '/client/catalog', icon: HomeModernIcon, roles: ['client', 'administrator'] },
  { label: 'Reservations', to: '/client/reservations', icon: BanknotesIcon, roles: ['client', 'administrator'] },
  { label: 'Notifications', to: '/notifications', icon: BellAlertIcon, roles: ['administrator', 'coordinator', 'purchasing', 'chef', 'client'] },
];

const roleTitles: Record<UserRole, string> = {
  administrator: 'Administrator',
  coordinator: 'Event Coordinator',
  chef: 'Chef',
  purchasing: 'Purchasing Manager',
  client: 'Client Portal',
};

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();

  if (!user) return null;

  return (
    <aside className="hidden w-72 flex-col gap-6 border-r border-white/40 bg-white/80 px-6 py-8 shadow-card lg:flex">
      <div>
        <span className="text-xs uppercase tracking-widest text-primary/80">Catering Platform</span>
        <h2 className="mt-1 text-xl font-semibold text-primary">{roleTitles[user.role]}</h2>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems
          .filter((item) => item.roles.includes(user.role))
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-neutral-500 transition hover:bg-primary/10 hover:text-primary',
                  isActive && 'bg-primary text-white shadow-lg'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {item.to === '/notifications' && unreadCount > 0 && (
                <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-primary">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};
