import {
  ArrowLeftIcon,
  ClockIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { mockEvents } from '../../data/mockData';

export const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = mockEvents.find((item) => item.id === eventId);

  if (!event) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-primary">Event not found</h1>
        <Button asChild>
          <Link to="/events">Back to events</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to events
          </Link>
          <h1 className="mt-3 text-2xl font-semibold text-primary">{event.client}</h1>
          <p className="text-sm text-neutral-500">{event.type} &middot; {format(new Date(event.date), 'PPP')}</p>
        </div>
        <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold capitalize text-primary">
          {event.status.replace('-', ' ')}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-primary">Menu assignments</h2>
          {event.assignedMenus.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {event.assignedMenus.map((menu) => (
                <div key={menu.id} className="rounded-2xl border border-neutral-200/60 bg-white/90 p-4">
                  <h3 className="font-semibold text-primary">{menu.name}</h3>
                  <p className="mt-2 text-sm text-neutral-500">Estimated price per guest: ${menu.pricePerGuest}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">No menus have been assigned yet.</p>
          )}
        </Card>
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">Staffing</h2>
          {event.staff.length ? (
            <ul className="space-y-2 text-sm text-neutral-500">
              {event.staff.map((member) => (
                <li key={member} className="flex items-center gap-2">
                  <UserCircleIcon className="h-5 w-5 text-primary" />
                  {member}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500">No staff has been assigned.</p>
          )}
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">Inventory requirements</h2>
          {event.inventoryNeeds.length ? (
            <ul className="space-y-2 text-sm text-neutral-500">
              {event.inventoryNeeds.map((need) => (
                <li key={need} className="flex items-center gap-2">
                  <ClipboardDocumentListIcon className="h-5 w-5 text-primary" />
                  {need}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500">No inventory requirements logged.</p>
          )}
        </Card>
        <Card className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-primary">Timeline</h2>
          {event.timeline.length ? (
            <ul className="space-y-3">
              {event.timeline.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-neutral-200/40 px-4 py-3 text-sm text-neutral-600"
                >
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-primary">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{format(new Date(item.dueDate), 'PPP')}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.completed ? 'bg-primary/10 text-primary' : 'bg-neutral-200/70 text-neutral-500'
                      }`}
                    >
                      {item.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500">Timeline items will appear here as you plan milestones.</p>
          )}
        </Card>
      </div>
    </div>
  );
};
