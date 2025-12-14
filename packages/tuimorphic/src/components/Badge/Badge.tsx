'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './Badge.module.scss';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Badge content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Badge component for status indicators and labels.
 *
 * @example
 * <Badge>Default</Badge>
 * <Badge variant="success">Online</Badge>
 * <Badge variant="error">Offline</Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge({ variant = 'default', className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={classNames(styles.badge, styles[variant], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

export default Badge;
