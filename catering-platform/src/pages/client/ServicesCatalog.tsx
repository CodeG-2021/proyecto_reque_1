import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { mockServicesCatalog } from '../../data/mockData';

export const ServicesCatalogPage: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-primary">Catálogo de servicios de catering</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Explora paquetes diseñados para eventos corporativos, bodas y celebraciones a medida.
      </p>
    </div>

    <div className="grid gap-4 md:grid-cols-3">
      {mockServicesCatalog.map((service) => (
        <Card key={service.id} className="flex flex-col justify-between gap-4 text-left">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-primary">{service.name}</h2>
            <p className="text-sm text-neutral-500">{service.description}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              {service.priceRange}
            </p>
          </div>
          <Button className="w-full">Solicitar cotización</Button>
        </Card>
      ))}
    </div>
  </div>
);
