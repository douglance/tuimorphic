'use client';

import * as React from 'react';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { classNames } from '@/utils/classNames';
import styles from './Accordion.module.scss';

export interface AccordionProps {
  /** Selected value(s) for controlled mode */
  value?: string[];
  /** Default open item value(s) for uncontrolled mode */
  defaultValue?: string[];
  /** Callback when open items change */
  onValueChange?: (value: string[]) => void;
  /** Whether multiple items can be open at once */
  type?: 'single' | 'multiple';
  /** Whether the accordion is disabled */
  disabled?: boolean;
  /** Accordion items */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface AccordionItemProps {
  /** Unique value identifying this item */
  value: string;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Item content (AccordionTrigger and AccordionContent) */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface AccordionTriggerProps {
  /** Trigger content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface AccordionContentProps {
  /** Panel content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
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
    },
    ref
  ) {
    const handleValueChange = (newValue: string[]) => {
      if (onValueChange) {
        if (type === 'single') {
          // For single mode, only keep the last selected value
          const lastValue = newValue.length > 0 ? [newValue[newValue.length - 1] as string] : [];
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
        className={classNames(styles.root, className)}
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
  function AccordionItem({ value, disabled, children, className }, ref) {
    return (
      <BaseAccordion.Item
        ref={ref}
        value={value}
        disabled={disabled}
        className={classNames(styles.item, className)}
      >
        {children}
      </BaseAccordion.Item>
    );
  }
);

/**
 * AccordionTrigger displays the header with ▾/▸ indicators.
 *
 * Must be used within an AccordionItem.
 */
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ children, className }, ref) {
    return (
      <BaseAccordion.Header className={styles.header}>
        <BaseAccordion.Trigger
          ref={ref}
          className={classNames(styles.trigger, className)}
        >
          <span className={styles.indicatorOpen} aria-hidden="true">▾</span>
          <span className={styles.indicatorClosed} aria-hidden="true">▸</span>
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
  function AccordionContent({ children, className }, ref) {
    return (
      <BaseAccordion.Panel
        ref={ref}
        className={classNames(styles.panel, className)}
      >
        <div className={styles.content}>{children}</div>
      </BaseAccordion.Panel>
    );
  }
);

// Export sub-components for advanced usage
export const AccordionRoot = BaseAccordion.Root;
export const AccordionHeader = BaseAccordion.Header;

export default Accordion;
