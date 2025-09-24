import {
  FunnelIcon,
  MapPinIcon,
  PlusIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { InputField } from '../../components/forms/InputField';
import { SelectField } from '../../components/forms/SelectField';
import { TextAreaField } from '../../components/forms/TextAreaField';
import { mockEvents, mockMenus } from '../../data/mockData';
import { CateringEvent, EventStatus } from '../../types/events';

const statusOptions: { value: EventStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
];

export const EventListPage: React.FC = () => {
  const [events, setEvents] = useState<CateringEvent[]>(mockEvents);
  const [filters, setFilters] = useState({ client: '', status: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    client: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    type: 'Corporate',
    attendees: 50,
    notes: '',
    status: 'scheduled' as EventStatus,
    menuId: mockMenus[0]?.id ?? '',
  });

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesClient = filters.client
        ? event.client.toLowerCase().includes(filters.client.toLowerCase())
        : true;
      const matchesStatus = filters.status ? event.status === filters.status : true;
      return matchesClient && matchesStatus;
    });
  }, [events, filters]);

  const resetForm = () => {
    setFormState({
      client: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      type: 'Corporate',
      attendees: 50,
      notes: '',
      status: 'scheduled',
      menuId: mockMenus[0]?.id ?? '',
    });
  };

  const handleCreateEvent = () => {
    const menu = mockMenus.find((item) => item.id === formState.menuId);
    const newEvent: CateringEvent = {
      id: crypto.randomUUID(),
      client: formState.client,
      date: formState.date,
      type: formState.type,
      attendees: Number(formState.attendees),
      status: formState.status,
      assignedMenus: menu
        ? menu.dishes.map((dish) => ({ id: dish.id, name: dish.name, pricePerGuest: menu.estimatedPrice }))
        : [],
      staff: [],
      inventoryNeeds: [],
      timeline: [],
      notes: formState.notes,
    };
    setEvents((prev) => [newEvent, ...prev]);
    setModalOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Event planning</h1>
          <p className="text-sm text-neutral-500">Monitor upcoming experiences and coordinate teams effortlessly.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          Schedule event
        </Button>
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-4">
          <InputField
            label="Client"
            placeholder="Search by client"
            value={filters.client}
            onChange={(event) => setFilters((prev) => ({ ...prev, client: event.target.value }))}
            className="w-full sm:max-w-xs"
          />
          <SelectField
            label="Status"
            value={filters.status}
            onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}
            options={[{ value: '', label: 'All statuses' }, ...statusOptions]}
            className="w-full sm:max-w-xs"
          />
          <div className="flex items-center gap-2 rounded-2xl bg-neutral-200/40 px-4 py-2 text-sm text-neutral-500">
            <FunnelIcon className="h-5 w-5" />
            {filteredEvents.length} events
          </div>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-primary">{event.client}</h2>
                <p className="text-xs uppercase tracking-wide text-neutral-500">{event.type}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">
                {event.status.replace('-', ' ')}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <MapPinIcon className="h-5 w-5 text-primary" />
              <span>{format(new Date(event.date), 'PPP')}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <UsersIcon className="h-5 w-5 text-primary" />
              <span>{event.attendees} guests</span>
            </div>
            <p className="text-sm text-neutral-500">{event.notes ?? 'No additional notes provided.'}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {event.assignedMenus.map((menu) => (
                  <span key={menu.id} className="rounded-full bg-neutral-200/60 px-3 py-1 text-xs text-neutral-600">
                    {menu.name}
                  </span>
                ))}
              </div>
              <Button asChild variant="secondary">
                <Link to={`/events/${event.id}`}>View details</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create new event"
        description="Plan every detail including menus, staffing, and inventory requirements."
        primaryAction={{ label: 'Save event', onClick: handleCreateEvent }}
        secondaryAction={{ label: 'Cancel', onClick: () => setModalOpen(false) }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <InputField
            label="Client"
            placeholder="Client or organization"
            value={formState.client}
            onChange={(event) => setFormState((prev) => ({ ...prev, client: event.target.value }))}
          />
          <InputField
            label="Event date"
            type="date"
            value={formState.date}
            onChange={(event) => setFormState((prev) => ({ ...prev, date: event.target.value }))}
          />
          <InputField
            label="Event type"
            placeholder="Wedding, conference, gala..."
            value={formState.type}
            onChange={(event) => setFormState((prev) => ({ ...prev, type: event.target.value }))}
          />
          <InputField
            label="Attendees"
            type="number"
            min={1}
            value={formState.attendees}
            onChange={(event) => setFormState((prev) => ({ ...prev, attendees: Number(event.target.value) }))}
          />
        </div>
        <SelectField
          label="Status"
          value={formState.status}
          onChange={(event) => setFormState((prev) => ({ ...prev, status: event.target.value as EventStatus }))}
          options={statusOptions}
        />
        <SelectField
          label="Assigned menu"
          value={formState.menuId}
          onChange={(event) => setFormState((prev) => ({ ...prev, menuId: event.target.value }))}
          options={mockMenus.map((menu) => ({ value: menu.id, label: menu.name }))}
        />
        <TextAreaField
          label="Notes"
          placeholder="Share context, logistic notes or VIP considerations"
          value={formState.notes}
          onChange={(event) => setFormState((prev) => ({ ...prev, notes: event.target.value }))}
        />
      </Modal>
    </div>
  );
};
