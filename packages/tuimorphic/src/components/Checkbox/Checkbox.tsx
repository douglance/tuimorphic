'use client';

import * as React from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { classNames } from '@/utils/classNames';
import styles from './Checkbox.module.scss';

export interface CheckboxProps {
  /** Whether the checkbox is checked (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Name attribute for forms */
  name?: string;
  /** Value attribute for forms */
  value?: string;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Checkbox component with terminal-style [╳] indicator.
 *
 * @example
 * <Checkbox label="Accept terms" />
 * <Checkbox checked={true} label="Selected" />
 * <Checkbox disabled label="Disabled" />
 */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox(
    {
      checked,
      defaultChecked,
      onCheckedChange,
      label,
      disabled = false,
      name,
      value,
      className,
    },
    ref
  ) {
    return (
      <label
        className={classNames(
          styles.container,
          disabled && styles.disabled,
          className
        )}
      >
        <BaseCheckbox.Root
          ref={ref}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          name={name}
          value={value}
          className={styles.checkbox}
        >
          <BaseCheckbox.Indicator className={styles.indicator}>
            ╳
          </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

export default Checkbox;
