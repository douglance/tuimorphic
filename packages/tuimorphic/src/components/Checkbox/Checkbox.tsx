'use client';

import * as React from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { classNames } from '@/utils/classNames';
import styles from './Checkbox.module.css';

type CheckboxRootState = Parameters<
  Extract<BaseCheckbox.Root.Props['className'], Function>
>[0];

export interface CheckboxProps
  extends Omit<BaseCheckbox.Root.Props, 'className'> {
  /** Label text */
  label?: string;
  /** Additional CSS class names */
  className?: string | ((state: CheckboxRootState) => string | undefined);
}

/**
 * Checkbox component with terminal-style indicator.
 *
 * @example
 * <Checkbox label="Accept terms" />
 * <Checkbox checked={true} label="Selected" />
 * <Checkbox disabled label="Disabled" />
 */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox({ label, className, ...props }, ref) {
    return (
      <label className={styles.container}>
        <BaseCheckbox.Root
          ref={ref}
          className={(state) =>
            classNames(
              styles.checkbox,
              typeof className === 'function' ? className(state) : className
            )
          }
          {...props}
        >
          <BaseCheckbox.Indicator className={styles.indicator}>
            &#x2573;
          </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export default Checkbox;
