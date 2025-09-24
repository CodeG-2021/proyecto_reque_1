import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/layouts/MainLayout';
import { ForgotPasswordPage } from './pages/auth/ForgotPassword';
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';
import { ClientReservationsPage } from './pages/client/ClientReservations';
import { ServicesCatalogPage } from './pages/client/ServicesCatalog';
import { AdminDashboardPage } from './pages/dashboard/AdminDashboard';
import { EventDetailPage } from './pages/events/EventDetail';
import { EventListPage } from './pages/events/EventList';
import { MenuManagementPage } from './pages/menus/MenuManagement';
import { NotificationCenterPage } from './pages/notifications/NotificationCenter';
import { PurchasingDashboardPage } from './pages/purchases/PurchasingDashboard';
import { FinancialReportsPage } from './pages/reports/FinancialReports';
import { UserManagementPage } from './pages/users/UserManagement';
import { ProtectedRoute } from './routes/ProtectedRoute';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

    <Route element={<ProtectedRoute roles={['administrator']} />}>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/reports" element={<FinancialReportsPage />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute roles={['administrator', 'coordinator']} />}>
      <Route element={<MainLayout />}>
        <Route path="/events" element={<EventListPage />} />
        <Route path="/events/:eventId" element={<EventDetailPage />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute roles={['coordinator', 'chef']} />}>
      <Route element={<MainLayout />}>
        <Route path="/menus" element={<MenuManagementPage />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute roles={['administrator', 'purchasing']} />}>
      <Route element={<MainLayout />}>
        <Route path="/purchases" element={<PurchasingDashboardPage />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute roles={['client', 'administrator']} />}>
      <Route element={<MainLayout />}>
        <Route path="/client/catalog" element={<ServicesCatalogPage />} />
        <Route path="/client/reservations" element={<ClientReservationsPage />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route path="/notifications" element={<NotificationCenterPage />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default App;
