'use client';

import * as React from 'react';
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { classNames } from '@/utils/classNames';
import styles from './Collapsible.module.css';

export interface CollapsibleProps {
  /** Controlled open state */
  open?: boolean;
  /** Default open state for uncontrolled mode */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether the collapsible is disabled */
  disabled?: boolean;
  /** Collapsible content (CollapsibleTrigger and CollapsibleContent) */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface CollapsibleTriggerProps {
  /** Trigger content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface CollapsibleContentProps {
  /** Panel content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Collapsible component for a single expandable content section.
 *
 * A simpler alternative to Accordion when you only need one collapsible item.
 *
 * @example
 * // Basic usage
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle Details</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     Hidden content that can be expanded or collapsed.
 *   </CollapsibleContent>
 * </Collapsible>
 *
 * @example
 * // Default open
 * <Collapsible defaultOpen>
 *   <CollapsibleTrigger>Settings</CollapsibleTrigger>
 *   <CollapsibleContent>Advanced settings panel.</CollapsibleContent>
 * </Collapsible>
 *
 * @example
 * // Controlled usage
 * const [isOpen, setIsOpen] = useState(false);
 * <Collapsible open={isOpen} onOpenChange={setIsOpen}>
 *   <CollapsibleTrigger>Click to toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Controlled content.</CollapsibleContent>
 * </Collapsible>
 */
export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  function Collapsible(
    {
      open,
      defaultOpen,
      onOpenChange,
      disabled = false,
      children,
      className,
    },
    ref
  ) {
    return (
      <BaseCollapsible.Root
        ref={ref}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        disabled={disabled}
        className={classNames(styles.root, className)}
      >
        {children}
      </BaseCollapsible.Root>
    );
  }
);
Collapsible.displayName = 'Collapsible';

/**
 * CollapsibleTrigger displays the header with ▾/▸ indicators.
 *
 * Must be used within a Collapsible.
 */
export const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  function CollapsibleTrigger({ children, className }, ref) {
    return (
      <BaseCollapsible.Trigger
        ref={ref}
        className={classNames(styles.trigger, className)}
      >
        <span className={styles.indicatorOpen} aria-hidden="true">▾</span>
        <span className={styles.indicatorClosed} aria-hidden="true">▸</span>
        <span className={styles.triggerContent}>{children}</span>
      </BaseCollapsible.Trigger>
    );
  }
);
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

/**
 * CollapsibleContent contains the collapsible panel content.
 *
 * Must be used within a Collapsible.
 */
export const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  function CollapsibleContent({ children, className }, ref) {
    return (
      <BaseCollapsible.Panel
        ref={ref}
        className={classNames(styles.panel, className)}
      >
        <div className={styles.content}>{children}</div>
      </BaseCollapsible.Panel>
    );
  }
);
CollapsibleContent.displayName = 'CollapsibleContent';

// Export Base UI parts for advanced usage
export const CollapsibleRoot = BaseCollapsible.Root;
export const CollapsiblePanel = BaseCollapsible.Panel;

export default Collapsible;
