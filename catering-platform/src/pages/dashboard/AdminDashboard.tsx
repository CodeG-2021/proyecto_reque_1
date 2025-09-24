import {
  ArrowRightIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { mockKpis } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(value);

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-primary">Resumen del panel</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Supervisa la salud del negocio de catering y accede rápidamente a las herramientas de gestión.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500">Eventos programados</p>
              <p className="mt-3 text-3xl font-semibold text-primary">{mockKpis.eventsScheduled}</p>
            </div>
            <CalendarDaysIcon className="h-10 w-10 text-primary/70" />
          </div>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-neutral-500">Ingresos</p>
          <p className="mt-3 text-3xl font-semibold text-primary">
            {formatCurrency(mockKpis.financialSummary.revenue)}
          </p>
          <span className="mt-2 text-xs text-neutral-500">Últimos 30 días</span>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-neutral-500">Gastos</p>
          <p className="mt-3 text-3xl font-semibold text-primary">
            {formatCurrency(mockKpis.financialSummary.expenses)}
          </p>
          <span className="mt-2 text-xs text-neutral-500">Últimos 30 días</span>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-neutral-500">Alertas de inventario</p>
          <p className="mt-3 text-3xl font-semibold text-primary">{mockKpis.inventoryStatus.criticalItems}</p>
          <span className="mt-2 text-xs text-neutral-500">
            {mockKpis.inventoryStatus.restocksThisWeek} reabastecimientos programados
          </span>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">Reservaciones recientes</h2>
            <Button variant="ghost" asChild>
              <Link to="/client/reservations" className="inline-flex items-center gap-2">
                Ver todas
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 space-y-4">
            {mockKpis.recentReservations.map((reservation) => (
              <div
                key={reservation.client}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-neutral-200/40 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-primary">{reservation.client}</p>
                  <p className="text-xs text-neutral-500">{reservation.date}</p>
                </div>
                <span className="rounded-full bg-white px-4 py-1 text-sm font-medium text-primary">
                  {reservation.guests} invitados
                </span>
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-3">
              <UsersIcon className="h-10 w-10 rounded-2xl bg-primary/10 p-2 text-primary" />
              <div>
                <p className="text-sm font-semibold text-primary">Gestiona usuarios</p>
                <p className="text-xs text-neutral-500">Asigna roles, actualiza permisos e incorpora al equipo.</p>
              </div>
            </div>
            <Button asChild className="mt-4 w-full">
              <Link to="/users">Ir a gestión de usuarios</Link>
            </Button>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <ChartBarIcon className="h-10 w-10 rounded-2xl bg-secondary/10 p-2 text-secondary" />
              <div>
                <p className="text-sm font-semibold text-primary">Reportes financieros</p>
                <p className="text-xs text-neutral-500">Analiza la rentabilidad y exporta reportes actualizados.</p>
              </div>
            </div>
            <Button variant="secondary" asChild className="mt-4 w-full">
              <Link to="/reports">Ver analíticas</Link>
            </Button>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <ClipboardDocumentListIcon className="h-10 w-10 rounded-2xl bg-primary/10 p-2 text-primary" />
              <div>
                <p className="text-sm font-semibold text-primary">Operaciones de eventos</p>
                <p className="text-xs text-neutral-500">Coordina menús, personal y cronogramas en un solo lugar.</p>
              </div>
            </div>
            <Button asChild className="mt-4 w-full">
              <Link to="/events">Abrir gestor de eventos</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
