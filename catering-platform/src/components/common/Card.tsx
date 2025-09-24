import clsx from 'classnames';
import { HTMLAttributes } from 'react';

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div
    className={clsx(
      'rounded-2xl border border-white/60 bg-white/90 p-6 shadow-card backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-lg',
      className
    )}
    {...props}
  >
    {children}
  </div>
);
