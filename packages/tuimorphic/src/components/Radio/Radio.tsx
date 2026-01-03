'use client';

import * as React from 'react';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { classNames } from '@/utils/classNames';
import styles from './Radio.module.css';

type RadioGroupState = Parameters<
  Extract<BaseRadioGroup.Props['className'], Function>
>[0];

type RadioRootState = Parameters<
  Extract<BaseRadio.Root.Props['className'], Function>
>[0];

export interface RadioGroupProps
  extends Omit<BaseRadioGroup.Props, 'className'> {
  /** Additional CSS class names */
  className?: string | ((state: RadioGroupState) => string | undefined);
}

export interface RadioProps extends Omit<BaseRadio.Root.Props, 'className'> {
  /** Label text */
  label?: string;
  /** Additional CSS class names */
  className?: string | ((state: RadioRootState) => string | undefined);
}

/**
 * RadioGroup component for single selection from multiple options.
 *
 * @example
 * <RadioGroup defaultValue="a">
 *   <Radio value="a" label="Option A" />
 *   <Radio value="b" label="Option B" />
 * </RadioGroup>
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup({ className, ...props }, ref) {
    return (
      <BaseRadioGroup
        ref={ref}
        className={(state) =>
          classNames(
            styles.group,
            typeof className === 'function' ? className(state) : className
          )
        }
        {...props}
      />
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

/**
 * Radio component with terminal-style rotated square indicator.
 *
 * Must be used within a RadioGroup.
 */
export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  function Radio({ label, className, ...props }, ref) {
    return (
      <label className={styles.container}>
        <BaseRadio.Root
          ref={ref}
          className={(state) =>
            classNames(
              styles.radio,
              typeof className === 'function' ? className(state) : className
            )
          }
          {...props}
        >
          <BaseRadio.Indicator className={styles.indicator}>
            <span className={styles.dot} />
          </BaseRadio.Indicator>
        </BaseRadio.Root>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);
Radio.displayName = 'Radio';

export default RadioGroup;
