'use client';

import * as React from 'react';
import { Slider as BaseSlider } from '@base-ui/react/slider';
import { classNames } from '@/utils/classNames';
import styles from './Slider.module.css';

type SliderState = Parameters<
  Extract<BaseSlider.Root.Props['className'], Function>
>[0];

export interface SliderProps extends Omit<BaseSlider.Root.Props, 'className'> {
  label?: string;
  showValue?: boolean;
  className?: string | ((state: SliderState) => string | undefined);
}

const TRACK_CHAR = '─';
const HANDLE_CHAR = '●';
const DEFAULT_WIDTH = 20;

function calculateHandlePosition(
  value: number,
  min: number,
  max: number,
  trackWidth: number
): number {
  const percentage = (value - min) / (max - min);
  return Math.round(percentage * (trackWidth - 1));
}

function buildTrackDisplay(handlePosition: number, trackWidth: number): string {
  const beforeHandle = TRACK_CHAR.repeat(handlePosition);
  const afterHandle = TRACK_CHAR.repeat(trackWidth - handlePosition - 1);
  return `${beforeHandle}${HANDLE_CHAR}${afterHandle}`;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(
    {
      label,
      showValue = false,
      className,
      min = 0,
      max = 100,
      defaultValue,
      value,
      disabled,
      ...props
    },
    ref
  ) {
    const normalizedValue = value ?? defaultValue ?? [min];
    const valueArray = Array.isArray(normalizedValue)
      ? normalizedValue
      : [normalizedValue];
    const currentValue = valueArray[0] ?? min;
    const clampedValue = Math.min(max, Math.max(min, currentValue));

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
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        disabled={disabled}
        className={(state) =>
          classNames(
            styles.root,
            typeof className === 'function' ? className(state) : className
          )
        }
        {...props}
      >
        {label && <span className={styles.label}>{label}</span>}

        <div className={styles.sliderContainer}>
          <BaseSlider.Control className={styles.control}>
            <BaseSlider.Track className={styles.track}>
              <span className={styles.trackDisplay} aria-hidden="true">
                [{trackDisplay}]
              </span>
              <span className={styles.trackOverlay} />
              <BaseSlider.Thumb className={styles.thumb} />
            </BaseSlider.Track>
          </BaseSlider.Control>

          {showValue && <span className={styles.value}>{clampedValue}</span>}
        </div>
      </BaseSlider.Root>
    );
  }
);

export default Slider;
