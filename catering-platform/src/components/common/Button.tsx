import clsx from 'classnames';
import { ButtonHTMLAttributes, ReactElement, cloneElement, isValidElement } from 'react';

const baseStyles =
  'inline-flex items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 disabled:cursor-not-allowed disabled:opacity-60 shadow-sm';

const variantStyles: Record<string, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-secondary/20 text-primary border-secondary/40 hover:bg-secondary/30',
  ghost: 'bg-transparent text-primary hover:bg-primary/10',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  isLoading?: boolean;
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  asChild,
  ...props
}) => {
  const styles = clsx(baseStyles, variantStyles[variant], sizeStyles[size], className);
  const { type: _type, ...restProps } = props;

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement, {
      className: clsx(styles, (children as ReactElement).props.className),
      ...restProps,
    });
  }

  return (
    <button className={styles} disabled={disabled || isLoading} {...props}>
      {isLoading ? 'Procesando…' : children}
    </button>
  );
};
