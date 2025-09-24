import { BellAlertIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { CheckboxField } from '../../components/forms/CheckboxField';
import { useNotifications } from '../../hooks/useNotifications';

export const NotificationCenterPage: React.FC = () => {
  const { notifications, preferences, markAsRead, togglePreference } = useNotifications();
  const preferenceLabels: Record<string, string> = {
    events: 'eventos',
    inventory: 'inventario',
    reservations: 'reservaciones',
    finance: 'finanzas',
    system: 'sistema',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Notificaciones</h1>
          <p className="text-sm text-neutral-500">
            Mantente al tanto de cambios en eventos, alertas de inventario, hitos financieros y reservaciones en tiempo real.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">Preferencias</h2>
          <p className="text-sm text-neutral-500">Elige qué alertas deseas recibir. Se aplican tanto por correo como dentro de la aplicación.</p>
          <div className="space-y-3">
            {Object.entries(preferences).map(([category, enabled]) => (
              <CheckboxField
                key={category}
                label={`Notificar sobre ${preferenceLabels[category] ?? category}`}
                checked={enabled}
                onChange={() => togglePreference(category as keyof typeof preferences)}
              />
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-primary">Actualizaciones recientes</h2>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  notification.read ? 'border-transparent bg-neutral-200/40 text-neutral-500' : 'border-primary/40 bg-white text-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BellAlertIcon className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-xs text-neutral-500">{notification.message}</p>
                  </div>
                </div>
                {!notification.read && (
                  <Button variant="secondary" size="sm" onClick={() => markAsRead(notification.id)} className="inline-flex items-center gap-1">
                    <CheckIcon className="h-4 w-4" /> Marcar como leída
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
