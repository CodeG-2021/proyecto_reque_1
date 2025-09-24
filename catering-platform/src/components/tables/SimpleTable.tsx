import clsx from 'classnames';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface SimpleTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export const SimpleTable = <T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = 'No data available.',
}: SimpleTableProps<T>) => {
  if (!data.length) {
    return <p className="text-sm text-neutral-500">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-200/80">
        <thead className="bg-neutral-200/30">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200/50 bg-white/60">
          {data.map((item, index) => (
            <tr key={index} className={clsx('transition hover:bg-primary/5')}>
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-3 text-sm text-neutral-600">
                  {column.render ? column.render(item) : String(item[column.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
