'use client';

import * as React from 'react';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { classNames } from '@/utils/classNames';
import styles from './Accordion.module.css';

// State types for state-based className functions
type AccordionRootState = Parameters<
  Extract<BaseAccordion.Root.Props['className'], Function>
>[0];

type AccordionItemState = Parameters<
  Extract<BaseAccordion.Item.Props['className'], Function>
>[0];

type AccordionHeaderState = Parameters<
  Extract<BaseAccordion.Header.Props['className'], Function>
>[0];

type AccordionTriggerState = Parameters<
  Extract<BaseAccordion.Trigger.Props['className'], Function>
>[0];

type AccordionPanelState = Parameters<
  Extract<BaseAccordion.Panel.Props['className'], Function>
>[0];

export interface AccordionProps
  extends Omit<BaseAccordion.Root.Props, 'className' | 'onValueChange'> {
  /** Whether multiple items can be open at once (single mode closes other items) */
  type?: 'single' | 'multiple';
  /** Callback when open items change */
  onValueChange?: (value: string[]) => void;
  /** Additional CSS class names */
  className?: string | ((state: AccordionRootState) => string | undefined);
}

export interface AccordionItemProps
  extends Omit<BaseAccordion.Item.Props, 'className'> {
  /** Additional CSS class names */
  className?: string | ((state: AccordionItemState) => string | undefined);
}

export interface AccordionHeaderProps
  extends Omit<BaseAccordion.Header.Props, 'className'> {
  /** Additional CSS class names */
  className?: string | ((state: AccordionHeaderState) => string | undefined);
}

export interface AccordionTriggerProps
  extends Omit<BaseAccordion.Trigger.Props, 'className'> {
  /** Additional CSS class names */
  className?: string | ((state: AccordionTriggerState) => string | undefined);
}

export interface AccordionContentProps
  extends Omit<BaseAccordion.Panel.Props, 'className'> {
  /** Additional CSS class names */
  className?: string | ((state: AccordionPanelState) => string | undefined);
}

/**
 * Accordion component for expandable content sections.
 *
 * Supports both simple usage and compound component patterns.
 *
 * @example
 * // Simple usage
 * <Accordion defaultValue={['item-1']}>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content for section 1</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>Section 2</AccordionTrigger>
 *     <AccordionContent>Content for section 2</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 *
 * @example
 * // Single expansion mode
 * <Accordion type="single" defaultValue={['faq-1']}>
 *   <AccordionItem value="faq-1">
 *     <AccordionTrigger>What is Tuimorphic?</AccordionTrigger>
 *     <AccordionContent>A terminal-aesthetic component library.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 *
 * @example
 * // Controlled usage
 * const [openItems, setOpenItems] = useState(['item-1']);
 * <Accordion value={openItems} onValueChange={setOpenItems}>
 *   ...
 * </Accordion>
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(
    {
      value,
      defaultValue,
      onValueChange,
      type = 'multiple',
      disabled = false,
      children,
      className,
      ...props
    },
    ref
  ) {
    const handleValueChange = (newValue: string[]) => {
      if (onValueChange) {
        if (type === 'single') {
          // For single mode, only keep the last selected value
          const lastValue =
            newValue.length > 0
              ? [newValue[newValue.length - 1] as string]
              : [];
          onValueChange(lastValue);
        } else {
          onValueChange(newValue);
        }
      }
    };

    return (
      <BaseAccordion.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        className={(state) =>
          classNames(
            styles.root,
            typeof className === 'function' ? className(state) : className
          )
        }
        {...props}
      >
        {children}
      </BaseAccordion.Root>
    );
  }
);

/**
 * AccordionItem wraps a trigger and content panel.
 *
 * Must be used within an Accordion.
 */
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem({ value, disabled, children, className, ...props }, ref) {
    return (
      <BaseAccordion.Item
        ref={ref}
        value={value}
        disabled={disabled}
        className={(state) =>
          classNames(
            styles.item,
            typeof className === 'function' ? className(state) : className
          )
        }
        {...props}
      >
        {children}
      </BaseAccordion.Item>
    );
  }
);

/**
 * AccordionHeader wraps the trigger element.
 *
 * Must be used within an AccordionItem.
 */
export const AccordionHeader = React.forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  function AccordionHeader({ className, children, ...props }, ref) {
    return (
      <BaseAccordion.Header
        ref={ref}
        className={(state) =>
          classNames(
            styles.header,
            typeof className === 'function' ? className(state) : className
          )
        }
        {...props}
      >
        {children}
      </BaseAccordion.Header>
    );
  }
);

/**
 * AccordionTrigger displays the header with indicators.
 *
 * Must be used within an AccordionItem. Typically wrapped in AccordionHeader.
 */
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ children, className, ...props }, ref) {
    return (
      <BaseAccordion.Header className={styles.header}>
        <BaseAccordion.Trigger
          ref={ref}
          className={(state) =>
            classNames(
              styles.trigger,
              typeof className === 'function' ? className(state) : className
            )
          }
          {...props}
        >
          <span className={styles.indicatorOpen} aria-hidden="true">
            ▾
          </span>
          <span className={styles.indicatorClosed} aria-hidden="true">
            ▸
          </span>
          <span className={styles.triggerContent}>{children}</span>
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
    );
  }
);

/**
 * AccordionContent contains the collapsible panel content.
 *
 * Must be used within an AccordionItem.
 */
export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ children, className, ...props }, ref) {
    return (
      <BaseAccordion.Panel
        ref={ref}
        className={(state) =>
          classNames(
            styles.panel,
            typeof className === 'function' ? className(state) : className
          )
        }
        {...props}
      >
        <div className={styles.content}>{children}</div>
      </BaseAccordion.Panel>
    );
  }
);

// Export Base UI parts for advanced usage
export const AccordionRoot = BaseAccordion.Root;
export const AccordionPanel = BaseAccordion.Panel;

// Export state types for consumers
export type {
  AccordionRootState,
  AccordionItemState,
  AccordionHeaderState,
  AccordionTriggerState,
  AccordionPanelState,
};

export default Accordion;
