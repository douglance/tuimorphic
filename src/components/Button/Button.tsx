'use client';

import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { classNames } from '@/utils/classNames';
import styles from './Button.module.scss';

export interface ButtonProps
  extends Omit<React.ComponentProps<typeof BaseButton>, 'className'> {
  /** Visual theme variant */
  theme?: 'PRIMARY' | 'SECONDARY';
  /** Whether the button is disabled */
  isDisabled?: boolean;
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
 * <Button theme="PRIMARY">Submit</Button>
 * <Button theme="SECONDARY">Cancel</Button>
 * <Button isDisabled>Disabled</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { theme = 'PRIMARY', isDisabled = false, className, children, ...props },
    ref
  ) {
    // When disabled, render as a div to match SRCL behavior
    if (isDisabled) {
      return (
        <div
          className={classNames(styles.root, styles.disabled, className)}
          aria-disabled="true"
          role="button"
        >
          {children}
        </div>
      );
    }

    return (
      <BaseButton
        ref={ref}
        className={classNames(
          styles.root,
          theme === 'PRIMARY' ? styles.primary : styles.secondary,
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
