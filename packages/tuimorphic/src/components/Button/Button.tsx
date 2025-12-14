'use client';

import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { classNames } from '@/utils/classNames';
import styles from './Button.module.css';

type ButtonState = Parameters<
  Extract<BaseButton.Props['className'], Function>
>[0];

export interface ButtonProps extends Omit<BaseButton.Props, 'className'> {
  /** Visual variant */
  variant?: 'primary' | 'secondary';
  /** Additional CSS class names */
  className?: string | ((state: ButtonState) => string | undefined);
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
  function Button({ variant = 'primary', className, ...props }, ref) {
    return (
      <BaseButton
        ref={ref}
        className={(state) =>
          classNames(
            styles.root,
            styles[variant],
            typeof className === 'function' ? className(state) : className
          )
        }
        {...props}
      />
    );
  }
);

export default Button;
