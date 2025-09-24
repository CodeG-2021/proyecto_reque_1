import { ArrowDownTrayIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { InputField } from '../../components/forms/InputField';
import { SelectField } from '../../components/forms/SelectField';
import { SimpleTable } from '../../components/tables/SimpleTable';
import { mockFinancialReport } from '../../data/mockData';

const clients = Array.from(new Set(mockFinancialReport.map((report) => report.client)));

export const FinancialReportsPage: React.FC = () => {
  const [filters, setFilters] = useState({ client: '', from: '', to: '' });

  const filteredReports = useMemo(() => {
    return mockFinancialReport.filter((report) => {
      const matchesClient = filters.client ? report.client === filters.client : true;
      const matchesFrom = filters.from ? report.date >= filters.from : true;
      const matchesTo = filters.to ? report.date <= filters.to : true;
      return matchesClient && matchesFrom && matchesTo;
    });
  }, [filters]);

  const totals = useMemo(() => {
    return filteredReports.reduce(
      (acc, report) => {
        acc.revenue += report.revenue;
        acc.expenses += report.expenses;
        acc.profit += report.profit;
        return acc;
      },
      { revenue: 0, expenses: 0, profit: 0 }
    );
  }, [filteredReports]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Resultados financieros</h1>
          <p className="text-sm text-neutral-500">
            Analiza ingresos, gastos y márgenes por evento. Exporta la información para compartirla con los equipos interesados.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="inline-flex items-center gap-2">
            <ArrowDownTrayIcon className="h-5 w-5" />
            Exportar Excel
          </Button>
          <Button className="inline-flex items-center gap-2">
            <DocumentArrowDownIcon className="h-5 w-5" />
            Exportar PDF
          </Button>
        </div>
      </div>

      <Card>
        <div className="grid gap-4 md:grid-cols-4">
          <SelectField
            label="Cliente"
            value={filters.client}
            onChange={(event) => setFilters((prev) => ({ ...prev, client: event.target.value }))}
            options={[{ value: '', label: 'Todos los clientes' }, ...clients.map((client) => ({ value: client, label: client }))]}
          />
          <InputField
            label="Desde"
            type="date"
            value={filters.from}
            onChange={(event) => setFilters((prev) => ({ ...prev, from: event.target.value }))}
          />
          <InputField
            label="Hasta"
            type="date"
            value={filters.to}
            onChange={(event) => setFilters((prev) => ({ ...prev, to: event.target.value }))}
          />
          <div className="rounded-2xl bg-neutral-200/40 p-4 text-sm text-neutral-500">
            <p>Total de ingresos:</p>
            <p className="text-lg font-semibold text-primary">
              ${totals.revenue.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Gastos ${totals.expenses.toLocaleString()} &middot; Utilidad ${totals.profit.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <SimpleTable
            data={filteredReports}
            columns={[
              { key: 'event', header: 'Evento' },
              { key: 'client', header: 'Cliente' },
              { key: 'date', header: 'Fecha' },
              {
                key: 'revenue',
                header: 'Ingresos',
                render: (item) => <span>${item.revenue.toLocaleString()}</span>,
              },
              {
                key: 'expenses',
                header: 'Gastos',
                render: (item) => <span>${item.expenses.toLocaleString()}</span>,
              },
              {
                key: 'profit',
                header: 'Utilidad',
                render: (item) => (
                  <span className={item.profit >= 0 ? 'text-primary' : 'text-red-500'}>${item.profit.toLocaleString()}</span>
                ),
              },
            ]}
          />
        </div>
      </Card>
    </div>
  );
};
