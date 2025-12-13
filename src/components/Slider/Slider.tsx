'use client';

import * as React from 'react';
import { Slider as BaseSlider } from '@base-ui/react/slider';
import { classNames } from '@/utils/classNames';
import styles from './Slider.module.scss';

export interface SliderProps {
  /** Current value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Callback when value changes */
  onValueChange?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Label text */
  label?: string;
  /** Whether to show current value */
  showValue?: boolean;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/** Character used for track segments */
const TRACK_CHAR = '─';
/** Character used for the handle */
const HANDLE_CHAR = '●';
/** Default track width in characters */
const DEFAULT_WIDTH = 20;

/**
 * Calculate handle position index based on value and range.
 */
function calculateHandlePosition(
  value: number,
  min: number,
  max: number,
  trackWidth: number
): number {
  const percentage = (value - min) / (max - min);
  return Math.round(percentage * (trackWidth - 1));
}

/**
 * Build the ASCII track string with handle at position.
 */
function buildTrackDisplay(handlePosition: number, trackWidth: number): string {
  const beforeHandle = TRACK_CHAR.repeat(handlePosition);
  const afterHandle = TRACK_CHAR.repeat(trackWidth - handlePosition - 1);
  return `${beforeHandle}${HANDLE_CHAR}${afterHandle}`;
}

/**
 * Slider component with terminal-style ASCII track display.
 *
 * Features:
 * - Horizontal track with draggable handle
 * - Click-to-position and drag interaction
 * - Keyboard support: Arrow keys, Home, End, Page Up/Down
 * - Configurable min/max/step values
 *
 * Based on SRCL (Sacred Computer) design system.
 *
 * @example
 * <Slider label="Volume" showValue />
 * <Slider min={0} max={100} step={5} defaultValue={50} />
 * <Slider value={value} onValueChange={setValue} />
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(
    {
      value,
      defaultValue = 0,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      label,
      showValue = false,
      disabled = false,
      className,
    },
    ref
  ) {
    const [internalValue, setInternalValue] = React.useState(defaultValue);

    // Determine controlled vs uncontrolled
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    // Clamp value to valid range
    const clampedValue = Math.min(max, Math.max(min, currentValue));

    // Handle value changes from Base UI (provides array for range sliders)
    const handleValueChange = React.useCallback(
      (newValue: number | readonly number[]) => {
        const numericValue = Array.isArray(newValue) ? newValue[0] : newValue;
        const safeValue = numericValue ?? min;

        if (!isControlled) {
          setInternalValue(safeValue);
        }

        onValueChange?.(safeValue);
      },
      [isControlled, min, onValueChange]
    );

    // Calculate ASCII track display
    const handlePosition = calculateHandlePosition(
      clampedValue,
      min,
      max,
      DEFAULT_WIDTH
    );
    const trackDisplay = buildTrackDisplay(handlePosition, DEFAULT_WIDTH);

    return (
      <BaseSlider.Root
        ref={ref}
        value={[clampedValue]}
        defaultValue={[defaultValue]}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={classNames(
          styles.root,
          disabled && styles.disabled,
          className
        )}
      >
        {label && <span className={styles.label}>{label}</span>}

        <div className={styles.sliderContainer}>
          <BaseSlider.Control className={styles.control}>
            <BaseSlider.Track className={styles.track}>
              {/* ASCII track visualization (visual only) */}
              <span className={styles.trackDisplay} aria-hidden="true">
                [{trackDisplay}]
              </span>

              {/* Invisible overlay for pointer interaction */}
              <span className={styles.trackOverlay} />

              <BaseSlider.Thumb className={styles.thumb} />
            </BaseSlider.Track>
          </BaseSlider.Control>

          {showValue && (
            <span className={styles.value}>{clampedValue}</span>
          )}
        </div>
      </BaseSlider.Root>
    );
  }
);

export default Slider;
