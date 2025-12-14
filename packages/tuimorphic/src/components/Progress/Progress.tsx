'use client';

import * as React from 'react';
import { Progress as BaseProgress } from '@base-ui/react/progress';
import { classNames } from '@/utils/classNames';
import styles from './Progress.module.css';

// State types for state-based className functions
type ProgressRootState = Parameters<
  Extract<BaseProgress.Root.Props['className'], Function>
>[0];

type ProgressTrackState = Parameters<
  Extract<BaseProgress.Track.Props['className'], Function>
>[0];

type ProgressIndicatorState = Parameters<
  Extract<BaseProgress.Indicator.Props['className'], Function>
>[0];

export interface ProgressProps
  extends Omit<BaseProgress.Root.Props, 'className'> {
  /** Character used for filled portion */
  fillChar?: string;
  /** Character used for empty portion */
  emptyChar?: string;
  /** Width in characters */
  width?: number;
  /** Whether to show percentage label */
  showLabel?: boolean;
  /** Additional CSS class names */
  className?: string | ((state: ProgressRootState) => string | undefined);
}

export interface ProgressTrackProps
  extends Omit<BaseProgress.Track.Props, 'className'> {
  /** Additional CSS class names */
  className?: string | ((state: ProgressTrackState) => string | undefined);
}

export interface ProgressIndicatorProps
  extends Omit<BaseProgress.Indicator.Props, 'className'> {
  /** Additional CSS class names */
  className?: string | ((state: ProgressIndicatorState) => string | undefined);
}

/**
 * Progress bar component with terminal-style character display.
 *
 * @example
 * <Progress value={50} />
 * <Progress value={75} showLabel />
 * <Progress value={30} fillChar="=" emptyChar="-" />
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    {
      value = 0,
      max = 100,
      fillChar = '\u2588',
      emptyChar = '\u2591',
      width = 20,
      showLabel = false,
      className,
      ...props
    },
    ref
  ) {
    const safeValue = value ?? 0;
    const percentage = Math.min(100, Math.max(0, (safeValue / max) * 100));
    const filledCount = Math.round((percentage / 100) * width);
    const emptyCount = width - filledCount;

    const bar = fillChar.repeat(filledCount) + emptyChar.repeat(emptyCount);

    return (
      <BaseProgress.Root
        ref={ref}
        value={value}
        max={max}
        className={(state) =>
          classNames(
            styles.progress,
            typeof className === 'function' ? className(state) : className
          )
        }
        {...props}
      >
        <span className={styles.bar} aria-hidden="true">
          [{bar}]
        </span>
        {showLabel && (
          <BaseProgress.Track className={styles.label}>
            {Math.round(percentage)}%
          </BaseProgress.Track>
        )}
      </BaseProgress.Root>
    );
  }
);

// Export sub-components for advanced usage
export const ProgressRoot = BaseProgress.Root;
export const ProgressTrack = React.forwardRef<HTMLDivElement, ProgressTrackProps>(
  function ProgressTrack({ className, ...props }, ref) {
    return (
      <BaseProgress.Track
        ref={ref}
        className={(state) =>
          classNames(
            styles.label,
            typeof className === 'function' ? className(state) : className
          )
        }
        {...props}
      />
    );
  }
);

export const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  function ProgressIndicator({ className, ...props }, ref) {
    return (
      <BaseProgress.Indicator
        ref={ref}
        className={(state) =>
          classNames(
            typeof className === 'function' ? className(state) : className
          )
        }
        {...props}
      />
    );
  }
);

// Export state types for consumers
export type {
  ProgressRootState,
  ProgressTrackState,
  ProgressIndicatorState,
};

export default Progress;
