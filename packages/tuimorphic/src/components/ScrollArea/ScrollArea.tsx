'use client';

import * as React from 'react';
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import { classNames } from '@/utils/classNames';
import styles from './ScrollArea.module.css';

export interface ScrollAreaProps {
  /** Content to display within the scrollable area */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Which scrollbars to show */
  orientation?: 'vertical' | 'horizontal' | 'both';
}

/**
 * ScrollArea component for custom-styled scrollable containers.
 * Replaces native scrollbars with terminal-aesthetic styled scrollbars.
 *
 * @example
 * <ScrollArea orientation="vertical" style={{ height: 300 }}>
 *   <div>Long scrollable content...</div>
 * </ScrollArea>
 *
 * @example
 * <ScrollArea orientation="both" style={{ height: 300, width: 400 }}>
 *   <div style={{ width: 800 }}>Wide and tall content...</div>
 * </ScrollArea>
 */
export function ScrollArea({
  children,
  className,
  orientation = 'vertical',
}: ScrollAreaProps) {
  return (
    <BaseScrollArea.Root className={classNames(styles.root, className)}>
      <BaseScrollArea.Viewport className={styles.viewport}>
        {children}
      </BaseScrollArea.Viewport>
      {(orientation === 'vertical' || orientation === 'both') && (
        <BaseScrollArea.Scrollbar
          orientation="vertical"
          className={classNames(styles.scrollbar, styles.scrollbarVertical)}
        >
          <BaseScrollArea.Thumb className={styles.thumb} />
        </BaseScrollArea.Scrollbar>
      )}
      {(orientation === 'horizontal' || orientation === 'both') && (
        <BaseScrollArea.Scrollbar
          orientation="horizontal"
          className={classNames(styles.scrollbar, styles.scrollbarHorizontal)}
        >
          <BaseScrollArea.Thumb className={styles.thumb} />
        </BaseScrollArea.Scrollbar>
      )}
      {orientation === 'both' && (
        <BaseScrollArea.Corner className={styles.corner} />
      )}
    </BaseScrollArea.Root>
  );
}

// Sub-component prop interfaces
interface ScrollAreaSubComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface ScrollAreaScrollbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  orientation?: 'vertical' | 'horizontal';
}

// Export sub-components for advanced usage
export const ScrollAreaRoot = ({
  className,
  children,
  ...props
}: ScrollAreaSubComponentProps) => (
  <BaseScrollArea.Root className={classNames(styles.root, className)} {...props}>
    {children}
  </BaseScrollArea.Root>
);

export const ScrollAreaViewport = ({
  className,
  children,
  ...props
}: ScrollAreaSubComponentProps) => (
  <BaseScrollArea.Viewport className={classNames(styles.viewport, className)} {...props}>
    {children}
  </BaseScrollArea.Viewport>
);

export const ScrollAreaScrollbar = ({
  className,
  orientation = 'vertical',
  children,
  ...props
}: ScrollAreaScrollbarProps) => (
  <BaseScrollArea.Scrollbar
    orientation={orientation}
    className={classNames(
      styles.scrollbar,
      orientation === 'vertical' ? styles.scrollbarVertical : styles.scrollbarHorizontal,
      className
    )}
    {...props}
  >
    {children}
  </BaseScrollArea.Scrollbar>
);

export const ScrollAreaThumb = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <BaseScrollArea.Thumb className={classNames(styles.thumb, className)} {...props} />
);

export const ScrollAreaCorner = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <BaseScrollArea.Corner className={classNames(styles.corner, className)} {...props} />
);

export default ScrollArea;
