'use client';

import * as React from 'react';
import { Switch } from '@base-ui/react/switch';
import { classNames } from '@/utils/classNames';
import styles from './Toggle.module.scss';

export interface ToggleProps {
  /** Whether the toggle is on (controlled) */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Name attribute for forms */
  name?: string;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Toggle (switch) component with terminal-style [ON]/[OFF] display.
 *
 * @example
 * <Toggle label="Enable notifications" />
 * <Toggle checked={true} label="Active" />
 */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle(
    {
      checked,
      defaultChecked,
      onCheckedChange,
      label,
      disabled = false,
      name,
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
        <Switch.Root
          ref={ref}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          name={name}
          className={styles.toggle}
        >
          <Switch.Thumb className={styles.thumb} />
        </Switch.Root>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

export default Toggle;
