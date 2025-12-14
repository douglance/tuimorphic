'use client';

import * as React from 'react';
import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import { classNames } from '@/utils/classNames';
import styles from './Fieldset.module.css';

export interface FieldsetProps {
  /** Whether the fieldset and all its fields are disabled */
  disabled?: boolean;
  /** Fieldset content (typically form fields and legend) */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface FieldsetLegendProps {
  /** Legend content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Fieldset component for grouping related form fields.
 * Uses terminal-style box-drawing aesthetics.
 *
 * @example
 * <Fieldset>
 *   <FieldsetLegend>Account Details</FieldsetLegend>
 *   <Input placeholder="Username" />
 *   <Input placeholder="Email" />
 * </Fieldset>
 */
export const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function Fieldset({ disabled, children, className }, ref) {
    return (
      <BaseFieldset.Root
        ref={ref}
        disabled={disabled}
        className={classNames(styles.root, className)}
      >
        {children}
      </BaseFieldset.Root>
    );
  }
);

/**
 * Legend component for Fieldset.
 * Displays the fieldset title with terminal-style uppercase formatting.
 *
 * @example
 * <Fieldset>
 *   <FieldsetLegend>User Information</FieldsetLegend>
 *   ...
 * </Fieldset>
 */
export const FieldsetLegend = React.forwardRef<HTMLLegendElement, FieldsetLegendProps>(
  function FieldsetLegend({ children, className }, ref) {
    return (
      <BaseFieldset.Legend
        ref={ref}
        className={classNames(styles.legend, className)}
      >
        {children}
      </BaseFieldset.Legend>
    );
  }
);

export default Fieldset;
