'use client';

import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { classNames } from '@/utils/classNames';
import styles from './Button.module.scss';

export interface ButtonProps
  extends Omit<React.ComponentProps<typeof BaseButton>, 'className'> {
  /** Visual variant */
  variant?: 'primary' | 'secondary';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Button content */
  children?: React.ReactNode;
}

/**
 * Button component with terminal aesthetics.
 *
 * Built on Base UI for accessibility, styled with SRCL aesthetics.
 *
 * @example
 * <Button variant="primary">Submit</Button>
 * <Button variant="secondary">Cancel</Button>
 * <Button disabled>Disabled</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = 'primary', disabled = false, className, children, ...props },
    ref
  ) {
    return (
      <BaseButton
        ref={ref}
        disabled={disabled}
        className={classNames(
          styles.root,
          styles[variant],
          disabled && styles.disabled,
          className
        )}
        {...props}
      >
        {children}
      </BaseButton>
    );
  }
);

export default Button;
