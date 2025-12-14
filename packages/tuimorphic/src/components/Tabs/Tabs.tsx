'use client';

import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { classNames } from '@/utils/classNames';
import styles from './Tabs.module.scss';

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

export interface TabsListProps {
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
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
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

export default Tabs;
