'use client';

import * as React from 'react';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { classNames } from '@/utils/classNames';
import styles from './ToggleGroup.module.css';

export interface ToggleGroupProps {
  /** Controlled value(s) - string for single, string[] for multiple */
  value?: string | string[];
  /** Default value(s) for uncontrolled usage */
  defaultValue?: string | string[];
  /** Callback fired when value changes */
  onValueChange?: (value: string | string[]) => void;
  /** Selection mode: 'single' allows one selection, 'multiple' allows many */
  type?: 'single' | 'multiple';
  /** Whether the entire group is disabled */
  disabled?: boolean;
  /** Toggle items */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface ToggleGroupItemProps {
  /** Value of this toggle item */
  value: string;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Item content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * ToggleGroup component for selecting one or multiple options from a set.
 *
 * @example
 * // Single selection
 * <ToggleGroup defaultValue="left">
 *   <ToggleGroupItem value="left">Left</ToggleGroupItem>
 *   <ToggleGroupItem value="center">Center</ToggleGroupItem>
 *   <ToggleGroupItem value="right">Right</ToggleGroupItem>
 * </ToggleGroup>
 *
 * @example
 * // Multiple selection
 * <ToggleGroup type="multiple" defaultValue={['bold', 'italic']}>
 *   <ToggleGroupItem value="bold">B</ToggleGroupItem>
 *   <ToggleGroupItem value="italic">I</ToggleGroupItem>
 *   <ToggleGroupItem value="underline">U</ToggleGroupItem>
 * </ToggleGroup>
 */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  function ToggleGroup(
    {
      value,
      defaultValue,
      onValueChange,
      type = 'single',
      disabled = false,
      children,
      className,
    },
    ref
  ) {
    // Normalize value to array format for Base UI
    const normalizedValue = React.useMemo(() => {
      if (value === undefined) return undefined;
      return Array.isArray(value) ? value : [value];
    }, [value]);

    const normalizedDefaultValue = React.useMemo(() => {
      if (defaultValue === undefined) return undefined;
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }, [defaultValue]);

    const handleValueChange = React.useCallback(
      (newValue: unknown[]) => {
        if (!onValueChange) return;

        // Convert back to string array
        const stringValue = newValue.map(String);

        if (type === 'single') {
          // For single mode, return the last selected value as string
          onValueChange(stringValue[stringValue.length - 1] ?? '');
        } else {
          // For multiple mode, return the array
          onValueChange(stringValue);
        }
      },
      [onValueChange, type]
    );

    return (
      <BaseToggleGroup
        ref={ref}
        value={normalizedValue}
        defaultValue={normalizedDefaultValue}
        onValueChange={handleValueChange}
        multiple={type === 'multiple'}
        disabled={disabled}
        className={classNames(styles.root, className)}
      >
        {children}
      </BaseToggleGroup>
    );
  }
);

/**
 * ToggleGroupItem component representing a single toggle option.
 *
 * Must be used within a ToggleGroup.
 */
export const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(function ToggleGroupItem({ value, disabled, children, className }, ref) {
  return (
    <BaseToggle
      ref={ref}
      value={value}
      disabled={disabled}
      className={classNames(styles.item, className)}
    >
      {children}
    </BaseToggle>
  );
});

export default ToggleGroup;
