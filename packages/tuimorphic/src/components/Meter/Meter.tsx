'use client';

import * as React from 'react';
import { Meter as BaseMeter } from '@base-ui/react/meter';
import { classNames } from '@/utils/classNames';
import styles from './Meter.module.css';

export interface MeterProps {
  /** Current value */
  value: number;
  /** Minimum value (default 0) */
  min?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Low threshold - below this is considered low */
  low?: number;
  /** High threshold - above this is considered high */
  high?: number;
  /** Optimum value - ideal target value */
  optimum?: number;
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
 * Determines the threshold state based on value and threshold props.
 * Returns the appropriate data attribute state for styling.
 */
function getThresholdState(
  value: number,
  min: number,
  max: number,
  low?: number,
  high?: number,
  optimum?: number
): 'low' | 'high' | 'optimum' | undefined {
  const normalizedValue = Math.min(max, Math.max(min, value));

  // If no thresholds defined, return undefined
  if (low === undefined && high === undefined) {
    return undefined;
  }

  const effectiveLow = low ?? min;
  const effectiveHigh = high ?? max;

  // Determine where optimum lies to understand the "good" direction
  // If optimum is in low region: low is good, high is bad
  // If optimum is in high region: high is good, low is bad
  // If optimum is in middle: both extremes are bad
  const optimumValue = optimum ?? (effectiveLow + effectiveHigh) / 2;

  if (normalizedValue <= effectiveLow) {
    // Value is in low region
    if (optimumValue <= effectiveLow) {
      return 'optimum'; // Low is the good state
    }
    return 'low';
  }

  if (normalizedValue >= effectiveHigh) {
    // Value is in high region
    if (optimumValue >= effectiveHigh) {
      return 'optimum'; // High is the good state
    }
    return 'high';
  }

  // Value is in middle region
  if (optimumValue > effectiveLow && optimumValue < effectiveHigh) {
    return 'optimum'; // Middle is the good state
  }

  return undefined;
}

/**
 * Meter component for displaying a known value within a range.
 * Unlike Progress (indeterminate/loading), Meter is for static measurements
 * like battery level, disk usage, or capacity.
 *
 * @example
 * <Meter value={75} />
 * <Meter value={30} low={25} high={75} optimum={50} showLabel />
 * <Meter value={90} fillChar="=" emptyChar="-" />
 */
export const Meter = React.forwardRef<HTMLDivElement, MeterProps>(
  function Meter(
    {
      value,
      min = 0,
      max = 100,
      low,
      high,
      optimum,
      fillChar = '█',
      emptyChar = '░',
      width = 20,
      showLabel = false,
      className,
    },
    ref
  ) {
    const clampedValue = Math.min(max, Math.max(min, value));
    const percentage = ((clampedValue - min) / (max - min)) * 100;
    const filledCount = Math.round((percentage / 100) * width);
    const emptyCount = width - filledCount;

    const bar = fillChar.repeat(filledCount) + emptyChar.repeat(emptyCount);
    const thresholdState = getThresholdState(value, min, max, low, high, optimum);

    const dataAttributes: Record<string, boolean> = {};
    if (thresholdState === 'low') {
      dataAttributes['data-low'] = true;
    } else if (thresholdState === 'high') {
      dataAttributes['data-high'] = true;
    } else if (thresholdState === 'optimum') {
      dataAttributes['data-optimum'] = true;
    }

    return (
      <BaseMeter.Root
        ref={ref}
        value={value}
        min={min}
        max={max}
        className={classNames(styles.meter, className)}
        {...dataAttributes}
      >
        <span className={styles.bar} aria-hidden="true">
          [{bar}]
        </span>
        {showLabel && (
          <BaseMeter.Label className={styles.label}>
            {Math.round(percentage)}%
          </BaseMeter.Label>
        )}
      </BaseMeter.Root>
    );
  }
);

export default Meter;
