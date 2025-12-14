'use client';

import * as React from 'react';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { classNames } from '@/utils/classNames';
import styles from './Radio.module.scss';

export interface RadioGroupProps {
  /** Selected value (controlled) */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Name attribute for forms */
  name?: string;
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Radio items */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface RadioProps {
  /** Value of this radio option */
  value: string;
  /** Label text */
  label?: string;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/**
 * RadioGroup component for single selection from multiple options.
 *
 * @example
 * <RadioGroup defaultValue="a">
 *   <Radio value="a" label="Option A" />
 *   <Radio value="b" label="Option B" />
 * </RadioGroup>
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    { value, defaultValue, onValueChange, name, disabled, children, className },
    ref
  ) {
    const handleValueChange = (newValue: unknown) => {
      if (onValueChange && typeof newValue === 'string') {
        onValueChange(newValue);
      }
    };

    return (
      <BaseRadioGroup
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        name={name}
        disabled={disabled}
        className={classNames(styles.group, className)}
      >
        {children}
      </BaseRadioGroup>
    );
  }
);

/**
 * Radio component with terminal-style rotated square indicator.
 *
 * Must be used within a RadioGroup.
 */
export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  function Radio({ value, label, disabled, className }, ref) {
    return (
      <label
        className={classNames(
          styles.container,
          disabled && styles.disabled,
          className
        )}
      >
        <BaseRadio.Root
          ref={ref}
          value={value}
          disabled={disabled}
          className={styles.radio}
        >
          <BaseRadio.Indicator className={styles.indicator}>
            <span className={styles.dot} />
          </BaseRadio.Indicator>
        </BaseRadio.Root>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

export default RadioGroup;
