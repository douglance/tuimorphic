'use client';

import * as React from 'react';
import { Switch } from '@base-ui/react/switch';
import { classNames } from '@/utils/classNames';
import styles from './Toggle.module.css';

type ToggleState = Parameters<
  Extract<Switch.Root.Props['className'], Function>
>[0];

export interface ToggleProps extends Omit<Switch.Root.Props, 'className'> {
  label?: string;
  className?: string | ((state: ToggleState) => string | undefined);
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle({ label, className, disabled, ...props }, ref) {
    return (
      <label
        className={classNames(styles.container, disabled && styles.disabled)}
      >
        <Switch.Root
          ref={ref}
          disabled={disabled}
          className={(state) =>
            classNames(
              styles.toggle,
              typeof className === 'function' ? className(state) : className
            )
          }
          {...props}
        >
          <Switch.Thumb className={styles.thumb} />
        </Switch.Root>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

export default Toggle;
