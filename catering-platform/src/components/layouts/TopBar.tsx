import { Bars3Icon, BellIcon, PowerIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { Button } from '../common/Button';
import { MobileMenu } from './TopBarMobileMenu';

interface TopBarProps {
  onToggleSidebar?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) return null;

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/50 bg-white/80 px-4 shadow-sm backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2 text-primary transition hover:bg-primary/10 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">Welcome back</p>
          <h1 className="text-lg font-semibold text-primary">{user.name}</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/notifications"
          className="relative inline-flex items-center rounded-xl p-2 text-primary transition hover:bg-primary/10"
        >
          <BellIcon className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </Link>
        <Button variant="ghost" className="hidden items-center gap-2 text-sm font-semibold text-primary sm:flex" onClick={logout}>
          <PowerIcon className="h-5 w-5" />
          Sign out
        </Button>
      </div>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} onLogout={logout} />
    </header>
  );
};
