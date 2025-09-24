import clsx from 'classnames';
import { TextareaHTMLAttributes } from 'react';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, hint, className, ...props }) => (
  <label className="flex flex-col gap-1 text-sm font-medium text-neutral-500">
    <span>{label}</span>
    <textarea
      className={clsx(
        'w-full rounded-xl border border-neutral-200/60 bg-white px-3 py-2 text-neutral-600 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40',
        className
      )}
      rows={props.rows ?? 4}
      {...props}
    />
    {hint && <span className="text-xs font-normal text-neutral-500/80">{hint}</span>}
  </label>
);
