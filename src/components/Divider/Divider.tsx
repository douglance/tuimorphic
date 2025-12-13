'use client';

import * as React from 'react';
import { Separator } from '@base-ui/react/separator';
import { classNames } from '@/utils/classNames';
import styles from './Divider.module.scss';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Additional CSS class names */
  className?: string;
}

/**
 * Divider component for separating content sections.
 *
 * @example
 * <Divider />
 * <Divider orientation="vertical" />
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  function Divider({ orientation = 'horizontal', className, ...props }, ref) {
    return (
      <Separator
        ref={ref}
        orientation={orientation}
        className={classNames(
          styles.divider,
          orientation === 'vertical' ? styles.vertical : styles.horizontal,
          className
        )}
        {...props}
      />
    );
  }
);

export default Divider;
