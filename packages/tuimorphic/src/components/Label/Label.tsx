'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './Label.module.css';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Visual variant */
  variant?: 'default' | 'required' | 'optional' | 'disabled';
  /** Label size */
  size?: 'sm' | 'md' | 'lg';
  /** Show required indicator (*) */
  required?: boolean;
  /** Show optional indicator */
  optional?: boolean;
  /** Label content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Label component for form fields and annotations.
 * Follows terminal aesthetic with uppercase styling.
 *
 * @example
 * <Label>USERNAME</Label>
 * <Label required>EMAIL ADDRESS</Label>
 * <Label optional>NICKNAME</Label>
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  function Label(
    {
      variant = 'default',
      size = 'md',
      required = false,
      optional = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <label
        ref={ref}
        className={classNames(
          styles.label,
          styles[variant],
          styles[`size-${size}`],
          className
        )}
        {...props}
      >
        <span className={styles.content}>{children}</span>
        {required && (
          <span className={styles.indicator} aria-hidden="true">
            *
          </span>
        )}
        {optional && !required && (
          <span className={styles.optionalText}>(optional)</span>
        )}
      </label>
    );
  }
);

export default Label;
