import type { LabelHTMLAttributes } from 'react';
import { cx } from '../cx';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Figma "Size": Medium (14/20) or Large (16/24). */
  size?: 'md' | 'lg';
  /** Figma "Type": Regular (Default) or Semibold. */
  weight?: 'regular' | 'semibold';
  /** Figma "Required": shows the asterisk. */
  required?: boolean;
  /** Figma "Disabled". */
  disabled?: boolean;
}

export function Label({
  size = 'md',
  weight = 'regular',
  required = false,
  disabled = false,
  className,
  children,
  ...rest
}: LabelProps) {
  return (
    <label
      className={cx('dga-label', className)}
      data-size={size}
      data-weight={weight}
      data-disabled={disabled || undefined}
      {...rest}
    >
      {/* Asterisk leads the text, matching Figma's layer order and upstream fields */}
      {required && (
        <span className="dga-label__required" aria-hidden="true">
          *
        </span>
      )}
      {children}
    </label>
  );
}
