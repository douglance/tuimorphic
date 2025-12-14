'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import { classNames } from '@/utils/classNames';
import styles from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Selected value (controlled) */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Options to display */
  options: SelectOption[];
  /** Label text */
  label?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Name attribute for forms */
  name?: string;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Select component for choosing from a list of options.
 *
 * @example
 * <Select
 *   label="Country"
 *   placeholder="Select a country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *   ]}
 * />
 */
export function Select({
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select...',
  options,
  label,
  disabled,
  name,
  className,
}: SelectProps) {
  // Transform options to the format Base UI expects
  const items = options.map((opt) => ({ value: opt.value, label: opt.label }));

  const handleValueChange = (
    newValue: string | null,
    _eventDetails: BaseSelect.Root.ChangeEventDetails
  ) => {
    if (onValueChange && newValue !== null) {
      onValueChange(newValue);
    }
  };

  return (
    <div className={classNames(styles.root, className)}>
      {label && <span className={styles.label}>{label}</span>}
      <BaseSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        name={name}
        items={items}
      >
        <BaseSelect.Trigger className={styles.trigger}>
          <BaseSelect.Value>
            {(selectedValue) => {
              if (!selectedValue) return placeholder;
              const selectedOption = options.find((opt) => opt.value === selectedValue);
              return selectedOption?.label || selectedValue;
            }}
          </BaseSelect.Value>
          <span className={styles.icon} aria-hidden="true">
            ▼
          </span>
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner sideOffset={4}>
            <BaseSelect.Popup className={styles.popup}>
              <BaseSelect.List>
                {options.map((option) => (
                  <BaseSelect.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={styles.option}
                  >
                    <BaseSelect.ItemIndicator className={styles.indicator}>
                      ›
                    </BaseSelect.ItemIndicator>
                    <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </div>
  );
}

export default Select;
