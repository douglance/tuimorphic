'use client';

import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { classNames } from '@/utils/classNames';
import styles from './NumberField.module.css';

export interface NumberFieldProps {
  /** Controlled value */
  value?: number | null;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Callback when value changes */
  onValueChange?: (value: number | null) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment (default 1) */
  step?: number;
  /** Step for Shift+Arrow (smaller step) */
  smallStep?: number;
  /** Step for Page Up/Down (larger step) */
  largeStep?: number;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is read-only */
  readOnly?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Name attribute for form submission */
  name?: string;
  /** Label text for the field */
  label?: string;
  /** Additional CSS class names */
  className?: string;
}

/**
 * NumberField component with terminal-aesthetic increment/decrement buttons.
 *
 * Features:
 * - Increment/decrement buttons with keyboard support
 * - Arrow keys, Page Up/Down, Home/End navigation
 * - Configurable min/max/step values
 * - Optional label
 *
 * Based on SRCL (Sacred Computer) design system.
 *
 * @example
 * <NumberField label="Quantity" defaultValue={1} min={0} max={100} />
 * <NumberField value={value} onValueChange={setValue} step={5} />
 */
export const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
  function NumberField(
    {
      value,
      defaultValue,
      onValueChange,
      min,
      max,
      step = 1,
      smallStep,
      largeStep,
      disabled,
      readOnly,
      required,
      name,
      label,
      className,
    },
    ref
  ) {
    return (
      <BaseNumberField.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        smallStep={smallStep}
        largeStep={largeStep}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        name={name}
        className={classNames(styles.root, className)}
      >
        {label && (
          <BaseNumberField.ScrubArea className={styles.scrubArea}>
            <NumberFieldLabel className={styles.label}>{label}</NumberFieldLabel>
          </BaseNumberField.ScrubArea>
        )}
        <BaseNumberField.Group className={styles.group}>
          <BaseNumberField.Decrement className={styles.button}>
            [-]
          </BaseNumberField.Decrement>
          <BaseNumberField.Input className={styles.input} />
          <BaseNumberField.Increment className={styles.button}>
            [+]
          </BaseNumberField.Increment>
        </BaseNumberField.Group>
      </BaseNumberField.Root>
    );
  }
);
NumberField.displayName = 'NumberField';

// Compound components for advanced usage

export interface NumberFieldRootProps
  extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Root> {
  /** Additional CSS class names */
  className?: string;
}

/**
 * Root component for NumberField. Use for custom compositions.
 */
export const NumberFieldRoot = React.forwardRef<HTMLDivElement, NumberFieldRootProps>(
  function NumberFieldRoot({ className, ...props }, ref) {
    return (
      <BaseNumberField.Root
        ref={ref}
        className={classNames(styles.root, className)}
        {...props}
      />
    );
  }
);
NumberFieldRoot.displayName = 'NumberFieldRoot';

export interface NumberFieldGroupProps
  extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Group> {
  /** Additional CSS class names */
  className?: string;
}

/**
 * Group component that wraps decrement, input, and increment.
 */
export const NumberFieldGroup = React.forwardRef<HTMLDivElement, NumberFieldGroupProps>(
  function NumberFieldGroup({ className, ...props }, ref) {
    return (
      <BaseNumberField.Group
        ref={ref}
        className={classNames(styles.group, className)}
        {...props}
      />
    );
  }
);
NumberFieldGroup.displayName = 'NumberFieldGroup';

export interface NumberFieldDecrementProps
  extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Decrement> {
  /** Additional CSS class names */
  className?: string;
  /** Custom button content */
  children?: React.ReactNode;
}

/**
 * Decrement button for the number field.
 */
export const NumberFieldDecrement = React.forwardRef<
  HTMLButtonElement,
  NumberFieldDecrementProps
>(function NumberFieldDecrement({ className, children = '[-]', ...props }, ref) {
  return (
    <BaseNumberField.Decrement
      ref={ref}
      className={classNames(styles.button, className)}
      {...props}
    >
      {children}
    </BaseNumberField.Decrement>
  );
});
NumberFieldDecrement.displayName = 'NumberFieldDecrement';

export interface NumberFieldInputProps
  extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Input> {
  /** Additional CSS class names */
  className?: string;
}

/**
 * Input element for the number field.
 */
export const NumberFieldInput = React.forwardRef<HTMLInputElement, NumberFieldInputProps>(
  function NumberFieldInput({ className, ...props }, ref) {
    return (
      <BaseNumberField.Input
        ref={ref}
        className={classNames(styles.input, className)}
        {...props}
      />
    );
  }
);
NumberFieldInput.displayName = 'NumberFieldInput';

export interface NumberFieldIncrementProps
  extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Increment> {
  /** Additional CSS class names */
  className?: string;
  /** Custom button content */
  children?: React.ReactNode;
}

/**
 * Increment button for the number field.
 */
export const NumberFieldIncrement = React.forwardRef<
  HTMLButtonElement,
  NumberFieldIncrementProps
>(function NumberFieldIncrement({ className, children = '[+]', ...props }, ref) {
  return (
    <BaseNumberField.Increment
      ref={ref}
      className={classNames(styles.button, className)}
      {...props}
    >
      {children}
    </BaseNumberField.Increment>
  );
});
NumberFieldIncrement.displayName = 'NumberFieldIncrement';

export interface NumberFieldLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  /** Additional CSS class names */
  className?: string;
  /** Label content */
  children?: React.ReactNode;
}

/**
 * Label element for the number field.
 */
export const NumberFieldLabel = React.forwardRef<HTMLLabelElement, NumberFieldLabelProps>(
  function NumberFieldLabel({ className, ...props }, ref) {
    return (
      <label ref={ref} className={classNames(styles.label, className)} {...props} />
    );
  }
);
NumberFieldLabel.displayName = 'NumberFieldLabel';

export interface NumberFieldScrubAreaProps
  extends React.ComponentPropsWithoutRef<typeof BaseNumberField.ScrubArea> {
  /** Additional CSS class names */
  className?: string;
}

/**
 * Scrub area that enables click-and-drag to change the value.
 */
export const NumberFieldScrubArea = React.forwardRef<
  HTMLSpanElement,
  NumberFieldScrubAreaProps
>(function NumberFieldScrubArea({ className, ...props }, ref) {
  return (
    <BaseNumberField.ScrubArea
      ref={ref}
      className={classNames(styles.scrubArea, className)}
      {...props}
    />
  );
});
NumberFieldScrubArea.displayName = 'NumberFieldScrubArea';

export default NumberField;
