import { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { InputField } from '../../components/forms/InputField';
import { SelectField } from '../../components/forms/SelectField';
import { TextAreaField } from '../../components/forms/TextAreaField';
import { mockReservations, mockServicesCatalog } from '../../data/mockData';

interface ReservationFormState {
  serviceId: string;
  date: string;
  guests: number;
  comments: string;
}

export const ClientReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState(mockReservations);
  const [formState, setFormState] = useState<ReservationFormState>({
    serviceId: mockServicesCatalog[0]?.id ?? '',
    date: '',
    guests: 50,
    comments: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedService = mockServicesCatalog.find((service) => service.id === formState.serviceId);
    setReservations((prev) => [
      {
        id: crypto.randomUUID(),
        service: selectedService?.name ?? 'Servicio personalizado',
        date: formState.date,
        guests: formState.guests,
        status: 'Pendiente',
      },
      ...prev,
    ]);
    setFormState({ ...formState, comments: '' });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-primary">Solicita una cotización</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Cuéntanos los detalles de tu evento y un coordinador te contactará con una propuesta personalizada.
        </p>
      </div>

      <Card className="space-y-6">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <SelectField
            label="Servicio"
            value={formState.serviceId}
            onChange={(event) => setFormState((prev) => ({ ...prev, serviceId: event.target.value }))}
            options={mockServicesCatalog.map((service) => ({ value: service.id, label: service.name }))}
          />
          <InputField
            label="Fecha preferida"
            type="date"
            value={formState.date}
            onChange={(event) => setFormState((prev) => ({ ...prev, date: event.target.value }))}
          />
          <InputField
            label="Invitados estimados"
            type="number"
            min={10}
            value={formState.guests}
            onChange={(event) => setFormState((prev) => ({ ...prev, guests: Number(event.target.value) }))}
          />
          <TextAreaField
            label="Comentarios"
            placeholder="Comparte la visión de tu evento, preferencias o preguntas."
            value={formState.comments}
            onChange={(event) => setFormState((prev) => ({ ...prev, comments: event.target.value }))}
            className="md:col-span-2"
          />
          <Button type="submit" className="md:col-span-2">
            Enviar solicitud de reservación
          </Button>
        </form>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-lg font-semibold text-primary">Historial de reservaciones</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="rounded-2xl bg-neutral-200/40 p-4">
              <p className="text-sm font-semibold text-primary">{reservation.service}</p>
              <p className="text-xs text-neutral-500">{reservation.date}</p>
              <p className="mt-2 text-xs text-neutral-500">{reservation.guests} invitados</p>
              <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary">
                {reservation.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
