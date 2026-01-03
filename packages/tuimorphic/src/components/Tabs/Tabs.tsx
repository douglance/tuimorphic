'use client';

import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { classNames } from '@/utils/classNames';
import styles from './Tabs.module.css';

// State types for className functions
type RootState = Parameters<
  Extract<BaseTabs.Root.Props['className'], Function>
>[0];

type ListState = Parameters<
  Extract<BaseTabs.List.Props['className'], Function>
>[0];

type TabState = Parameters<
  Extract<BaseTabs.Tab.Props['className'], Function>
>[0];

type PanelState = Parameters<
  Extract<BaseTabs.Panel.Props['className'], Function>
>[0];

type IndicatorState = Parameters<
  Extract<BaseTabs.Indicator.Props['className'], Function>
>[0];

// Prop interfaces extending Base UI
export interface TabsRootProps
  extends Omit<BaseTabs.Root.Props, 'className'> {
  className?: string | ((state: RootState) => string | undefined);
}

export interface TabsListProps
  extends Omit<BaseTabs.List.Props, 'className'> {
  className?: string | ((state: ListState) => string | undefined);
}

export interface TabsTabProps
  extends Omit<BaseTabs.Tab.Props, 'className'> {
  className?: string | ((state: TabState) => string | undefined);
}

export interface TabsPanelProps
  extends Omit<BaseTabs.Panel.Props, 'className'> {
  className?: string | ((state: PanelState) => string | undefined);
}

export interface TabsIndicatorProps
  extends Omit<BaseTabs.Indicator.Props, 'className'> {
  className?: string | ((state: IndicatorState) => string | undefined);
}

// Backwards-compatible convenience interfaces (existing API)
export interface TabsProps {
  /** Selected tab value (controlled) */
  value?: string | number | null;
  /** Default selected tab value (uncontrolled) */
  defaultValue?: string | number | null;
  /** Callback when selected tab changes */
  onValueChange?: (value: string | number | null) => void;
  /** Tab list and content panels */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface TabsListPropsLegacy {
  /** Tab triggers */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface TabsTriggerProps {
  /** Value that identifies this tab - must match corresponding TabsContent */
  value: string | number | null;
  /** Tab label content */
  children?: React.ReactNode;
  /** Whether this tab is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
}

export interface TabsContentProps {
  /** Value that identifies this panel - must match corresponding TabsTrigger */
  value: string | number | null;
  /** Panel content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Tabs component for organizing content into selectable panels.
 *
 * Built on Base UI for accessibility, styled with terminal aesthetics.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Overview</TabsTrigger>
 *     <TabsTrigger value="tab2">Details</TabsTrigger>
 *     <TabsTrigger value="tab3">Settings</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">
 *     <p>Overview content goes here.</p>
 *   </TabsContent>
 *   <TabsContent value="tab2">
 *     <p>Details content goes here.</p>
 *   </TabsContent>
 *   <TabsContent value="tab3">
 *     <p>Settings content goes here.</p>
 *   </TabsContent>
 * </Tabs>
 * ```
 *
 * @example Controlled
 * ```tsx
 * const [activeTab, setActiveTab] = React.useState<string | number | null>('tab1');
 *
 * <Tabs value={activeTab} onValueChange={setActiveTab}>
 *   <TabsList>
 *     <TabsTrigger value="tab1">First</TabsTrigger>
 *     <TabsTrigger value="tab2">Second</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">First panel</TabsContent>
 *   <TabsContent value="tab2">Second panel</TabsContent>
 * </Tabs>
 * ```
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { value, defaultValue, onValueChange, children, className },
  ref
) {
  return (
    <BaseTabs.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={classNames(styles.root, className)}
    >
      {children}
    </BaseTabs.Root>
  );
});

/**
 * Container for TabsTrigger components.
 *
 * Provides horizontal layout for tab buttons with terminal-style borders.
 */
export const TabsList = React.forwardRef<HTMLDivElement, TabsListPropsLegacy>(
  function TabsList({ children, className }, ref) {
    return (
      <BaseTabs.List ref={ref} className={classNames(styles.list, className)}>
        {children}
      </BaseTabs.List>
    );
  }
);

/**
 * Individual tab trigger button.
 *
 * Must be used within a TabsList. The value prop must match a corresponding TabsContent.
 */
export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger({ value, children, disabled, className }, ref) {
    return (
      <BaseTabs.Tab
        ref={ref}
        value={value}
        disabled={disabled}
        className={classNames(styles.trigger, className)}
      >
        {children}
      </BaseTabs.Tab>
    );
  }
);

/**
 * Content panel for a tab.
 *
 * The value prop must match a corresponding TabsTrigger.
 * Only the active panel is rendered.
 */
export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent({ value, children, className }, ref) {
    return (
      <BaseTabs.Panel
        ref={ref}
        value={value}
        className={classNames(styles.content, className)}
      >
        {children}
      </BaseTabs.Panel>
    );
  }
);

// Compound components for advanced usage (extending Base UI props)

export const TabsRoot = React.forwardRef<HTMLDivElement, TabsRootProps>(
  ({ className, ...props }, ref) => (
    <BaseTabs.Root
      ref={ref}
      className={(state) =>
        classNames(
          styles.root,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  )
);
TabsRoot.displayName = 'TabsRoot';

export const TabsListAdvanced = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <BaseTabs.List
      ref={ref}
      className={(state) =>
        classNames(
          styles.list,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  )
);
TabsListAdvanced.displayName = 'TabsListAdvanced';

export const TabsTab = React.forwardRef<HTMLButtonElement, TabsTabProps>(
  ({ className, ...props }, ref) => (
    <BaseTabs.Tab
      ref={ref}
      className={(state) =>
        classNames(
          styles.trigger,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  )
);
TabsTab.displayName = 'TabsTab';

export const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ className, ...props }, ref) => (
    <BaseTabs.Panel
      ref={ref}
      className={(state) =>
        classNames(
          styles.content,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  )
);
TabsPanel.displayName = 'TabsPanel';

export const TabsIndicator = React.forwardRef<HTMLSpanElement, TabsIndicatorProps>(
  ({ className, ...props }, ref) => (
    <BaseTabs.Indicator
      ref={ref}
      className={(state) =>
        typeof className === 'function' ? className(state) : className
      }
      {...props}
    />
  )
);
TabsIndicator.displayName = 'TabsIndicator';

export default Tabs;
