'use client';

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type ButtonHTMLAttributes,
} from 'react';
import { cx } from '../cx';

/** Figma "Size" on Horizontal/Vertical Tab and Tab List. */
export type TabsSize = 'sm' | 'md' | 'lg';
/** Figma "Horizontal Tab List" vs "Vertical Tab List". */
export type TabsOrientation = 'horizontal' | 'vertical';

interface TabsContextValue {
  baseId: string;
  value: string | undefined;
  select: (value: string) => void;
  orientation: TabsOrientation;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`<${component}> must be rendered inside <Tabs>.`);
  return ctx;
}

const slug = (value: string) => value.replace(/[^\w-]/g, '_');

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: TabsSize;
  orientation?: TabsOrientation;
}

export function Tabs({
  value: controlled,
  defaultValue,
  onValueChange,
  size = 'md',
  orientation = 'horizontal',
  className,
  children,
  ...rest
}: TabsProps) {
  const baseId = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlled ?? uncontrolled;

  const select = useCallback(
    (next: string) => {
      if (controlled === undefined) setUncontrolled(next);
      onValueChange?.(next);
    },
    [controlled, onValueChange],
  );

  return (
    <TabsContext.Provider value={{ baseId, value, select, orientation }}>
      <div
        className={cx('dga-tabs', className)}
        data-size={size}
        data-orientation={orientation}
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma "Flush": first tab aligns with the content edge instead of its padding. */
  flush?: boolean;
  /** Figma "Divider": the full-width rule under (or beside) the tabs. */
  divider?: boolean;
}

export function TabsList({ flush = false, divider = true, className, onKeyDown, ...rest }: TabsListProps) {
  const { orientation } = useTabs('TabsList');
  const listRef = useRef<HTMLDivElement>(null);

  // Roving focus with automatic activation (WAI-ARIA tabs pattern).
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !listRef.current) return;

    const tabs = Array.from(
      listRef.current.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
    );
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1) return;

    const rtl = getComputedStyle(listRef.current).direction === 'rtl';
    const horizontal = orientation === 'horizontal';
    const nextKey = horizontal ? (rtl ? 'ArrowLeft' : 'ArrowRight') : 'ArrowDown';
    const prevKey = horizontal ? (rtl ? 'ArrowRight' : 'ArrowLeft') : 'ArrowUp';

    let target: number;
    if (event.key === nextKey) target = (current + 1) % tabs.length;
    else if (event.key === prevKey) target = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = tabs.length - 1;
    else return;

    event.preventDefault();
    tabs[target].focus();
    tabs[target].click();
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation={orientation}
      className={cx('dga-tabs__list', className)}
      data-flush={flush || undefined}
      data-divider={divider || undefined}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  );
}

export interface TabsTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
  /** Figma "Icon" + "🔁 Swap Icon". */
  icon?: ReactNode;
}

export function TabsTrigger({ value, icon, className, children, onClick, disabled, ...rest }: TabsTriggerProps) {
  const { baseId, value: active, select } = useTabs('TabsTrigger');
  const selected = active === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${slug(value)}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${slug(value)}`}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      className={cx('dga-tabs__trigger', className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) select(value);
      }}
      {...rest}
    >
      {icon && (
        <span className="dga-tabs__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, className, ...rest }: TabsContentProps) {
  const { baseId, value: active } = useTabs('TabsContent');
  const selected = active === value;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${slug(value)}`}
      aria-labelledby={`${baseId}-tab-${slug(value)}`}
      hidden={!selected}
      tabIndex={0}
      className={cx('dga-tabs__content', className)}
      {...rest}
    />
  );
}
