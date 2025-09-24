import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const MainLayout: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-neutral-200/70 via-white to-neutral-100">
    <div className="mx-auto flex max-w-[1440px] gap-0 lg:gap-8">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-4 py-6 lg:px-10 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  </div>
);
