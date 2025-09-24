import clsx from 'classnames';
import { SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

export const SelectField: React.FC<SelectFieldProps> = ({ label, options, className, ...props }) => (
  <label className="flex flex-col gap-1 text-sm font-medium text-neutral-500">
    <span>{label}</span>
    <select
      className={clsx(
        'w-full rounded-xl border border-neutral-200/60 bg-white px-3 py-2 text-neutral-600 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40',
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);
