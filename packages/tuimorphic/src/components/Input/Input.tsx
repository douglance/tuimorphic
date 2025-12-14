'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import { useCombinedRefs } from '@/hooks/useCombinedRefs';
import styles from './Input.module.css';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  /** Custom caret character(s) to display */
  caretChars?: string;
  /** Label text for the input */
  label?: string;
  /** Whether the caret should blink */
  isBlink?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Find the next focusable element in a given direction.
 */
function findNextFocusable(
  direction: 'up' | 'down'
): HTMLElement | null {
  const focusableSelectors =
    'input:not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const focusableElements = Array.from(
    document.querySelectorAll<HTMLElement>(focusableSelectors)
  ).filter((el) => el.offsetParent !== null);

  const currentIndex = focusableElements.findIndex(
    (el) => el === document.activeElement
  );

  if (currentIndex === -1) return null;

  const nextIndex =
    direction === 'down'
      ? Math.min(currentIndex + 1, focusableElements.length - 1)
      : Math.max(currentIndex - 1, 0);

  return focusableElements[nextIndex] ?? null;
}

/**
 * Mask text for password fields.
 */
function maskText(text: string): string {
  return '•'.repeat(text.length);
}

/**
 * Input component with terminal aesthetics and custom blinking caret.
 *
 * Features:
 * - Custom blinking caret
 * - Arrow key navigation between inputs
 * - Password masking
 * - Label support
 *
 * Based on SRCL (Sacred Computer).
 *
 * @example
 * <Input label="Username" placeholder="Enter username" />
 * <Input type="password" label="Password" />
 * <Input caretChars="█" isBlink={false} />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      caretChars = ' ',
      label,
      isBlink = true,
      className,
      type = 'text',
      value,
      defaultValue,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      ...props
    },
    ref
  ) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(ref, inputRef);

    const [internalValue, setInternalValue] = React.useState(
      (defaultValue as string) ?? ''
    );
    const [isFocused, setIsFocused] = React.useState(false);
    const [caretPosition, setCaretPosition] = React.useState(0);
    const [focusDirection, setFocusDirection] = React.useState<
      'start' | 'end' | null
    >(null);

    // Determine if controlled or uncontrolled
    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value) : internalValue;

    // Sync caret position with focus direction
    React.useEffect(() => {
      if (isFocused && inputRef.current && focusDirection) {
        const pos = focusDirection === 'start' ? 0 : currentValue.length;
        inputRef.current.setSelectionRange(pos, pos);
        setCaretPosition(pos);
        setFocusDirection(null);
      }
    }, [isFocused, focusDirection, currentValue.length]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      setCaretPosition(event.target.selectionStart ?? newValue.length);
      onChange?.(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // Set caret to end by default
      const pos = event.target.value.length;
      event.target.setSelectionRange(pos, pos);
      setCaretPosition(pos);
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      // Arrow key navigation between inputs
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        const nextElement = findNextFocusable('up');
        if (nextElement) {
          setFocusDirection('end');
          nextElement.focus();
        }
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        const nextElement = findNextFocusable('down');
        if (nextElement) {
          setFocusDirection('start');
          nextElement.focus();
        }
      }

      onKeyDown?.(event);
    };

    const handleSelect = () => {
      if (inputRef.current) {
        setCaretPosition(inputRef.current.selectionStart ?? 0);
      }
    };

    const handleClick = () => {
      inputRef.current?.focus();
    };

    // Display text (masked for password)
    const displayText =
      type === 'password' ? maskText(currentValue) : currentValue;

    // Text before and after caret
    const textBeforeCaret = displayText.slice(0, caretPosition);
    const textAfterCaret = displayText.slice(caretPosition);

    const showPlaceholder = !currentValue && placeholder && !isFocused;

    return (
      <div className={classNames(styles.root, className)}>
        {label && <label className={styles.label}>{label}</label>}

        <div className={styles.inputContainer} onClick={handleClick}>
          {/* Hidden real input for accessibility */}
          <input
            ref={combinedRef}
            type={type}
            value={currentValue}
            className={styles.hidden}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onSelect={handleSelect}
            {...props}
          />

          {/* Visible display with custom caret */}
          <div
            className={classNames(
              styles.displayed,
              isFocused && styles.focused
            )}
          >
            {showPlaceholder ? (
              <span className={styles.placeholder}>{placeholder}</span>
            ) : (
              <>
                <span>{textBeforeCaret}</span>
                {isFocused && (
                  <span
                    className={classNames(
                      styles.block,
                      isBlink && styles.blink
                    )}
                  >
                    {caretChars}
                  </span>
                )}
                <span>{textAfterCaret}</span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default Input;
