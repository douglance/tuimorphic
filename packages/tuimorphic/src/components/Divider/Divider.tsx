'use client';

import * as React from 'react';
import { Separator } from '@base-ui/react/separator';
import { classNames } from '@/utils/classNames';
import styles from './Divider.module.css';

type DividerState = Parameters<
  Extract<Separator.Props['className'], Function>
>[0];

export interface DividerProps extends Omit<Separator.Props, 'className'> {
  className?: string | ((state: DividerState) => string | undefined);
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  function Divider({ orientation = 'horizontal', className, ...props }, ref) {
    return (
      <Separator
        ref={ref}
        orientation={orientation}
        className={(state) =>
          classNames(
            styles.divider,
            orientation === 'vertical' ? styles.vertical : styles.horizontal,
            typeof className === 'function' ? className(state) : className
          )
        }
        {...props}
      />
    );
  }
);

export default Divider;
