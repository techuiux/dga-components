import type { SVGProps } from 'react';

/** Minimal 1em icons for Figma parts that have no swappable icon (Button-Close, Button-menu). */
type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps): IconProps => ({
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
  ...props,
});

/** Figma "multiplication-sign". */
export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/** Figma "arrow-down-01". */
export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m18 9-6 6-6-6" />
    </svg>
  );
}
