import { Spinner as UpstreamSpinner, type SpinnerProps as UpstreamSpinnerProps } from '@dev-dga/react';

/**
 * Figma "Loading" sizes: xx Small → xx Large, 20px to 44px in 4px steps.
 * Upstream ships only 16/24/32/40px, so this wrapper keeps upstream's
 * styling and animation but sizes it exactly like Figma.
 */
const SIZE_PX = { xxs: 20, xs: 24, sm: 28, md: 32, lg: 36, xl: 40, xxl: 44 } as const;

export type SpinnerSize = keyof typeof SIZE_PX;

export type SpinnerProps = Omit<UpstreamSpinnerProps, 'size'> & {
  /** Figma "Size". */
  size?: SpinnerSize;
};

export function Spinner({ size = 'md', style, ...rest }: SpinnerProps) {
  // Upstream sizes the SVG in `em`, so font-size sets the rendered size.
  return <UpstreamSpinner {...rest} style={{ fontSize: SIZE_PX[size], ...style }} />;
}
