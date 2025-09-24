import clsx from 'classnames';
import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, hint, className, ...props }) => (
  <label className="flex flex-col gap-1 text-sm font-medium text-neutral-500">
    <span>{label}</span>
    <input
      className={clsx(
        'w-full rounded-xl border border-neutral-200/60 bg-white px-3 py-2 text-neutral-600 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40',
        className
      )}
      {...props}
    />
    {hint && <span className="text-xs font-normal text-neutral-500/80">{hint}</span>}
  </label>
);
