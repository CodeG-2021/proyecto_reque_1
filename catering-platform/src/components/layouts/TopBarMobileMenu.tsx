import { Dialog, Transition } from '@headlessui/react';
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
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { UserRole } from '../../types/auth';
import { Button } from '../common/Button';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: Squares2X2Icon, roles: ['administrator'] },
  { label: 'User Management', to: '/users', icon: UserGroupIcon, roles: ['administrator'] },
  { label: 'Events', to: '/events', icon: CalendarDaysIcon, roles: ['administrator', 'coordinator'] },
  { label: 'Menus & Recipes', to: '/menus', icon: ClipboardDocumentCheckIcon, roles: ['coordinator', 'chef'] },
  { label: 'Purchases & Inventory', to: '/purchases', icon: ShoppingCartIcon, roles: ['purchasing', 'administrator'] },
  { label: 'Reports', to: '/reports', icon: DocumentChartBarIcon, roles: ['administrator'] },
  { label: 'Services', to: '/client/catalog', icon: HomeModernIcon, roles: ['client', 'administrator'] },
  { label: 'Reservations', to: '/client/reservations', icon: BanknotesIcon, roles: ['client', 'administrator'] },
  { label: 'Notifications', to: '/notifications', icon: BellAlertIcon, roles: ['administrator', 'coordinator', 'purchasing', 'chef', 'client'] },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, onLogout }) => {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();

  if (!user) return null;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-out duration-200"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-150"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="ml-auto flex h-full w-80 flex-col gap-4 overflow-y-auto bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-semibold text-primary">Menu</Dialog.Title>
              <div className="flex flex-col gap-2">
                {navItems
                  .filter((item) => item.roles.includes(user.role))
                  .map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-neutral-500 transition hover:bg-primary/10 hover:text-primary"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="flex-1">{item.label}</span>
                      {item.to === '/notifications' && unreadCount > 0 && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">{unreadCount}</span>
                      )}
                    </Link>
                  ))}
              </div>
              <Button variant="primary" onClick={onLogout}>
                Sign out
              </Button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
