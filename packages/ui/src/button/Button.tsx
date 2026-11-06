import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import { cx } from '../cx';

/** Figma "Style" property, value for value. */
export type ButtonVariant =
  | 'primary'
  | 'neutral'
  | 'secondary-solid'
  | 'secondary-outline'
  | 'subtle'
  | 'transparent';

/** Figma "Size" property. */
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  /** Figma "On-color": use on dark or brand-colored surfaces. */
  onColor?: boolean;
  /** Figma "State=Selected". Rendered as a toggle via `aria-pressed`. */
  selected?: boolean;
  /** Figma "Lead Icon" + "🔁 Swap Lead Icon". */
  startIcon?: ReactNode;
  /** Figma "Trail icon" + "🔁 Swap Trail Icon". */
  endIcon?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

/** Figma has no destructive variants of "Neutral", so the type forbids it. */
type VariantProps =
  | { variant: 'neutral'; destructive?: false }
  | { variant?: Exclude<ButtonVariant, 'neutral'>; destructive?: boolean };

/** Figma "Icon only=True": square button, label goes to aria-label. */
type IconOnlyProps =
  | { iconOnly?: false }
  | { iconOnly: true; 'aria-label': string; children?: never };

export type ButtonProps = ButtonBaseProps & VariantProps & IconOnlyProps;

export function Button({
  variant = 'primary',
  destructive = false,
  size = 'md',
  onColor = false,
  selected,
  iconOnly = false,
  startIcon,
  endIcon,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx('dga-button', className)}
      data-variant={variant}
      data-destructive={destructive || undefined}
      data-size={size}
      data-on-color={onColor || undefined}
      data-icon-only={iconOnly || undefined}
      aria-pressed={selected}
      {...rest}
    >
      {iconOnly ? (
        <span className="dga-button__icon" aria-hidden="true">
          {startIcon}
        </span>
      ) : (
        <>
          {startIcon && (
            <span className="dga-button__icon" aria-hidden="true">
              {startIcon}
            </span>
          )}
          <span className="dga-button__label">{children}</span>
          {endIcon && (
            <span className="dga-button__icon" aria-hidden="true">
              {endIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
