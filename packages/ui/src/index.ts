/*
 * @techuiux/dga-ui: one import surface for the DGA Platforms Code library.
 *
 * - Components built here are 1:1 with Figma where @dev-dga/react falls short.
 * - Everything else is re-exported from @dev-dga/react unchanged.
 *
 * Local exports below shadow same-named exports from the star re-export
 * (standard ESM resolution), so consumers always get the local version.
 */
export * from '@dev-dga/react';
// Date pickers ship from a subpath upstream; surface them here so there is one import.
export { DatePicker, DateRangePicker } from '@dev-dga/react/date-picker';
export type { DatePickerProps, DateRangePickerProps, DateRange } from '@dev-dga/react/date-picker';

// Local components (override upstream)
export { Button } from './button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './button/Button';

export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs/Tabs';
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsSize,
  TabsOrientation,
} from './tabs/Tabs';

export { Spinner } from './spinner/Spinner';
export type { SpinnerProps, SpinnerSize } from './spinner/Spinner';

export { Label } from './label/Label';
export type { LabelProps } from './label/Label';

export { CloseButton } from './close-button/CloseButton';
export type { CloseButtonProps, CloseButtonSize } from './close-button/CloseButton';

export { CloseIcon, ChevronDownIcon } from './icons/icons';

export { DgaUiProvider } from './provider';
export type { DgaUiProviderProps } from './provider';
