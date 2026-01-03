'use client';

import * as React from 'react';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { classNames } from '@/utils/classNames';
import styles from './CheckboxGroup.module.css';

export interface CheckboxGroupProps {
  /** Controlled selected values */
  value?: string[];
  /** Default selected values (uncontrolled) */
  defaultValue?: string[];
  /** Callback when selection changes */
  onValueChange?: (value: string[]) => void;
  /** All possible values (for "all selected" state) */
  allValues?: string[];
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Children checkbox components */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * CheckboxGroup groups multiple Checkbox components with shared state.
 *
 * Use with the existing Checkbox component - just ensure checkboxes have
 * a `value` prop that corresponds to values in the group.
 *
 * @example
 * <CheckboxGroup defaultValue={['option1']}>
 *   <Checkbox value="option1" label="Option 1" />
 *   <Checkbox value="option2" label="Option 2" />
 *   <Checkbox value="option3" label="Option 3" />
 * </CheckboxGroup>
 *
 * @example
 * // Controlled
 * const [selected, setSelected] = useState<string[]>([]);
 * <CheckboxGroup value={selected} onValueChange={setSelected}>
 *   <Checkbox value="a" label="A" />
 *   <Checkbox value="b" label="B" />
 * </CheckboxGroup>
 */
export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  function CheckboxGroup(
    { value, defaultValue, onValueChange, allValues, disabled, children, className },
    ref
  ) {
    return (
      <BaseCheckboxGroup
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        allValues={allValues}
        disabled={disabled}
        className={classNames(styles.root, className)}
      >
        {children}
      </BaseCheckboxGroup>
    );
  }
);
CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup;
