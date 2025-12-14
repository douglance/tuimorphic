'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import { useCombinedRefs } from '@/hooks/useCombinedRefs';
import styles from './TextArea.module.scss';

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  /** Label text for the textarea */
  label?: string;
  /** Number of visible rows */
  rows?: number;
  /** Custom caret character */
  caretChars?: string;
  /** Whether the caret should blink */
  isBlink?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/**
 * TextArea component with terminal aesthetics.
 *
 * @example
 * <TextArea label="Description" rows={5} />
 * <TextArea placeholder="Enter your message..." />
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      rows = 4,
      caretChars = ' ',
      isBlink = true,
      className,
      value,
      defaultValue,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const combinedRef = useCombinedRefs(ref, textareaRef);

    const [internalValue, setInternalValue] = React.useState(
      (defaultValue as string) ?? ''
    );
    const [isFocused, setIsFocused] = React.useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value) : internalValue;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(event.target.value);
      }
      onChange?.(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const handleClick = () => {
      textareaRef.current?.focus();
    };

    const showPlaceholder = !currentValue && placeholder && !isFocused;

    return (
      <div className={classNames(styles.root, className)}>
        {label && <label className={styles.label}>{label}</label>}

        <div className={styles.inputContainer} onClick={handleClick}>
          <textarea
            ref={combinedRef}
            value={currentValue}
            rows={rows}
            className={styles.textarea}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            {...props}
          />

          {/* Caret indicator when focused */}
          {isFocused && (
            <span
              className={classNames(styles.caret, isBlink && styles.blink)}
              aria-hidden="true"
            >
              {caretChars}
            </span>
          )}
        </div>

        {showPlaceholder && (
          <div className={styles.placeholderOverlay} aria-hidden="true">
            {placeholder}
          </div>
        )}
      </div>
    );
  }
);

export default TextArea;
