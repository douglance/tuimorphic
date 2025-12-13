'use client';

import * as React from 'react';
import { Progress as BaseProgress } from '@base-ui/react/progress';
import { classNames } from '@/utils/classNames';
import styles from './Progress.module.scss';

export interface ProgressProps {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Character used for filled portion */
  fillChar?: string;
  /** Character used for empty portion */
  emptyChar?: string;
  /** Width in characters */
  width?: number;
  /** Whether to show percentage label */
  showLabel?: boolean;
  /** Additional CSS class names */
  className?: string;
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
      value,
      max = 100,
      fillChar = '█',
      emptyChar = '░',
      width = 20,
      showLabel = false,
      className,
    },
    ref
  ) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const filledCount = Math.round((percentage / 100) * width);
    const emptyCount = width - filledCount;

    const bar =
      fillChar.repeat(filledCount) + emptyChar.repeat(emptyCount);

    return (
      <BaseProgress.Root
        ref={ref}
        value={value}
        max={max}
        className={classNames(styles.progress, className)}
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

export default Progress;
