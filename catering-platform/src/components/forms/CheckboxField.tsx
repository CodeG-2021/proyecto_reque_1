import clsx from 'classnames';
import { InputHTMLAttributes } from 'react';

interface CheckboxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, className, ...props }) => (
  <label className={clsx('flex items-center gap-2 text-sm font-medium text-neutral-500', className)}>
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary/40"
      {...props}
    />
    <span>{label}</span>
  </label>
);
