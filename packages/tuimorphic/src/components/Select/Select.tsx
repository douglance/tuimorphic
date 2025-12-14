'use client';

import { forwardRef } from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { classNames } from '@/utils/classNames';
import styles from './Select.module.css';

// State types for className functions
type TriggerState = Parameters<
  Extract<BaseSelect.Trigger.Props['className'], Function>
>[0];

type PopupState = Parameters<
  Extract<BaseSelect.Popup.Props['className'], Function>
>[0];

type ItemState = Parameters<
  Extract<BaseSelect.Item.Props['className'], Function>
>[0];

type ItemIndicatorState = Parameters<
  Extract<BaseSelect.ItemIndicator.Props['className'], Function>
>[0];

type ItemTextState = Parameters<
  Extract<BaseSelect.ItemText.Props['className'], Function>
>[0];

type GroupState = Parameters<
  Extract<BaseSelect.Group.Props['className'], Function>
>[0];

type GroupLabelState = Parameters<
  Extract<BaseSelect.GroupLabel.Props['className'], Function>
>[0];

type ScrollUpArrowState = Parameters<
  Extract<BaseSelect.ScrollUpArrow.Props['className'], Function>
>[0];

type ScrollDownArrowState = Parameters<
  Extract<BaseSelect.ScrollDownArrow.Props['className'], Function>
>[0];

type IconState = Parameters<
  Extract<BaseSelect.Icon.Props['className'], Function>
>[0];

type PositionerState = Parameters<
  Extract<BaseSelect.Positioner.Props['className'], Function>
>[0];

// Prop interfaces extending Base UI
export interface SelectRootProps<Value = unknown, Multiple extends boolean | undefined = false>
  extends BaseSelect.Root.Props<Value, Multiple> {}

export interface SelectTriggerProps
  extends Omit<BaseSelect.Trigger.Props, 'className'> {
  className?: string | ((state: TriggerState) => string | undefined);
}

export interface SelectValueProps extends BaseSelect.Value.Props {}

export interface SelectIconProps
  extends Omit<BaseSelect.Icon.Props, 'className'> {
  className?: string | ((state: IconState) => string | undefined);
}

export interface SelectPortalProps extends BaseSelect.Portal.Props {}

export interface SelectPositionerProps
  extends Omit<BaseSelect.Positioner.Props, 'className'> {
  className?: string | ((state: PositionerState) => string | undefined);
}

export interface SelectPopupProps
  extends Omit<BaseSelect.Popup.Props, 'className'> {
  className?: string | ((state: PopupState) => string | undefined);
}

export interface SelectListProps extends BaseSelect.List.Props {}

export interface SelectItemProps
  extends Omit<BaseSelect.Item.Props, 'className'> {
  className?: string | ((state: ItemState) => string | undefined);
}

export interface SelectItemIndicatorProps
  extends Omit<BaseSelect.ItemIndicator.Props, 'className'> {
  className?: string | ((state: ItemIndicatorState) => string | undefined);
}

export interface SelectItemTextProps
  extends Omit<BaseSelect.ItemText.Props, 'className'> {
  className?: string | ((state: ItemTextState) => string | undefined);
}

export interface SelectGroupProps
  extends Omit<BaseSelect.Group.Props, 'className'> {
  className?: string | ((state: GroupState) => string | undefined);
}

export interface SelectGroupLabelProps
  extends Omit<BaseSelect.GroupLabel.Props, 'className'> {
  className?: string | ((state: GroupLabelState) => string | undefined);
}

export interface SelectScrollUpArrowProps
  extends Omit<BaseSelect.ScrollUpArrow.Props, 'className'> {
  className?: string | ((state: ScrollUpArrowState) => string | undefined);
}

export interface SelectScrollDownArrowProps
  extends Omit<BaseSelect.ScrollDownArrow.Props, 'className'> {
  className?: string | ((state: ScrollDownArrowState) => string | undefined);
}

// Simple convenience types (existing API)
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

// Compound components for advanced usage

export function SelectRoot<Value = unknown, Multiple extends boolean | undefined = false>(
  props: SelectRootProps<Value, Multiple>
) {
  return <BaseSelect.Root {...props} />;
}
SelectRoot.displayName = 'SelectRoot';

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.Trigger
      ref={ref}
      className={(state) =>
        classNames(
          styles.trigger,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  )
);
SelectTrigger.displayName = 'SelectTrigger';

export const SelectValue = (props: SelectValueProps) => (
  <BaseSelect.Value {...props} />
);
SelectValue.displayName = 'SelectValue';

export const SelectIcon = forwardRef<HTMLSpanElement, SelectIconProps>(
  ({ className, children = '▼', ...props }, ref) => (
    <BaseSelect.Icon
      ref={ref}
      className={(state) =>
        classNames(
          styles.icon,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    >
      {children}
    </BaseSelect.Icon>
  )
);
SelectIcon.displayName = 'SelectIcon';

export const SelectPortal = (props: SelectPortalProps) => (
  <BaseSelect.Portal {...props} />
);
SelectPortal.displayName = 'SelectPortal';

export const SelectPositioner = forwardRef<HTMLDivElement, SelectPositionerProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.Positioner
      ref={ref}
      className={(state) =>
        typeof className === 'function' ? className(state) : className
      }
      {...props}
    />
  )
);
SelectPositioner.displayName = 'SelectPositioner';

export const SelectPopup = forwardRef<HTMLDivElement, SelectPopupProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.Popup
      ref={ref}
      className={(state) =>
        classNames(
          styles.popup,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  )
);
SelectPopup.displayName = 'SelectPopup';

export const SelectList = (props: SelectListProps) => (
  <BaseSelect.List {...props} />
);
SelectList.displayName = 'SelectList';

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.Item
      ref={ref}
      className={(state) =>
        classNames(
          styles.option,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  )
);
SelectItem.displayName = 'SelectItem';

export const SelectItemIndicator = forwardRef<HTMLSpanElement, SelectItemIndicatorProps>(
  ({ className, children = '›', ...props }, ref) => (
    <BaseSelect.ItemIndicator
      ref={ref}
      className={(state) =>
        classNames(
          styles.indicator,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    >
      {children}
    </BaseSelect.ItemIndicator>
  )
);
SelectItemIndicator.displayName = 'SelectItemIndicator';

export const SelectItemText = forwardRef<HTMLDivElement, SelectItemTextProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.ItemText
      ref={ref}
      className={(state) =>
        typeof className === 'function' ? className(state) : className
      }
      {...props}
    />
  )
);
SelectItemText.displayName = 'SelectItemText';

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.Group
      ref={ref}
      className={(state) =>
        typeof className === 'function' ? className(state) : className
      }
      {...props}
    />
  )
);
SelectGroup.displayName = 'SelectGroup';

export const SelectGroupLabel = forwardRef<HTMLDivElement, SelectGroupLabelProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.GroupLabel
      ref={ref}
      className={(state) =>
        typeof className === 'function' ? className(state) : className
      }
      {...props}
    />
  )
);
SelectGroupLabel.displayName = 'SelectGroupLabel';

export const SelectScrollUpArrow = forwardRef<HTMLDivElement, SelectScrollUpArrowProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.ScrollUpArrow
      ref={ref}
      className={(state) =>
        typeof className === 'function' ? className(state) : className
      }
      {...props}
    />
  )
);
SelectScrollUpArrow.displayName = 'SelectScrollUpArrow';

export const SelectScrollDownArrow = forwardRef<HTMLDivElement, SelectScrollDownArrowProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.ScrollDownArrow
      ref={ref}
      className={(state) =>
        typeof className === 'function' ? className(state) : className
      }
      {...props}
    />
  )
);
SelectScrollDownArrow.displayName = 'SelectScrollDownArrow';

export default Select;
