import type { ButtonHTMLAttributes, Ref } from 'react';
import { Button } from '../button/Button';
import { CloseIcon } from '../icons/icons';

export type CloseButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface CloseButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma "Size": x Small, Small, Medium, Large. x Small uses the Small hit area. */
  size?: CloseButtonSize;
  /** Figma "On-color". */
  onColor?: boolean;
  /** Accessible name. Defaults to "Close". */
  'aria-label'?: string;
  ref?: Ref<HTMLButtonElement>;
}

/** Figma "Button-Close": an icon-only transparent Button with the close glyph. */
export function CloseButton({ size = 'md', onColor = false, 'aria-label': label = 'Close', ...rest }: CloseButtonProps) {
  return (
    <Button
      {...rest}
      variant="transparent"
      size={size === 'xs' ? 'sm' : size}
      onColor={onColor}
      iconOnly
      aria-label={label}
      startIcon={<CloseIcon />}
    />
  );
}
