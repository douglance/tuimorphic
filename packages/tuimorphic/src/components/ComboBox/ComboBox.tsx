'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import { useCombinedRefs } from '@/hooks/useCombinedRefs';
import styles from './ComboBox.module.css';

export interface ComboBoxOption {
  value: string;
  label: string;
  description?: string;
}

export interface ComboBoxProps {
  /** Options to display in the dropdown */
  options: ComboBoxOption[];
  /** Selected value (controlled) */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Highlights matching text within a string.
 * Returns an array of React elements with matching portions wrapped in a highlight span.
 */
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) {
    return text;
  }

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const isMatch = part.toLowerCase() === query.toLowerCase();
    if (isMatch) {
      return (
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      );
    }
    return part;
  });
}

/**
 * ComboBox component combining text input with dropdown selection.
 *
 * Features:
 * - Autocomplete/filter functionality
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Highlights matching text in filtered results
 * - Supports both manual text entry and selection from list
 *
 * Based on SRCL (Sacred Computer).
 *
 * @example
 * <ComboBox
 *   label="Country"
 *   placeholder="Search countries..."
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *     { value: 'ca', label: 'Canada' },
 *   ]}
 *   onValueChange={(value) => console.log(value)}
 * />
 */
export const ComboBox = React.forwardRef<HTMLInputElement, ComboBoxProps>(
  function ComboBox(
    {
      options,
      value,
      defaultValue = '',
      onValueChange,
      placeholder = 'Search...',
      label,
      disabled = false,
      className,
    },
    ref
  ) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLUListElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRefs(ref, inputRef);

    // Internal state for uncontrolled mode
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [isOpen, setIsOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const [isFocused, setIsFocused] = React.useState(false);

    // Determine if controlled or uncontrolled
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    // Filter options based on current input value
    const filteredOptions = React.useMemo(() => {
      if (!currentValue.trim()) {
        return options;
      }
      const lowerQuery = currentValue.toLowerCase();
      return options.filter(
        (option) =>
          option.label.toLowerCase().includes(lowerQuery) ||
          option.value.toLowerCase().includes(lowerQuery) ||
          option.description?.toLowerCase().includes(lowerQuery)
      );
    }, [options, currentValue]);

    // Reset highlighted index when filtered options change
    React.useEffect(() => {
      setHighlightedIndex(filteredOptions.length > 0 ? 0 : -1);
    }, [filteredOptions.length]);

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    // Scroll highlighted option into view
    React.useEffect(() => {
      if (isOpen && highlightedIndex >= 0 && listRef.current) {
        const highlightedElement = listRef.current.children[
          highlightedIndex
        ] as HTMLElement;
        if (highlightedElement) {
          highlightedElement.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [highlightedIndex, isOpen]);

    const updateValue = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      updateValue(newValue);
      setIsOpen(true);
    };

    const handleInputFocus = () => {
      setIsFocused(true);
      setIsOpen(true);
    };

    const handleInputBlur = () => {
      setIsFocused(false);
      // Delay closing to allow click on option
      setTimeout(() => {
        if (!containerRef.current?.contains(document.activeElement)) {
          setIsOpen(false);
        }
      }, 150);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : prev
            );
          }
          break;

        case 'ArrowUp':
          event.preventDefault();
          if (isOpen) {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          }
          break;

        case 'Enter':
          event.preventDefault();
          if (isOpen && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            const selectedOption = filteredOptions[highlightedIndex];
            updateValue(selectedOption.label);
            setIsOpen(false);
            inputRef.current?.focus();
          }
          break;

        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          break;

        case 'Tab':
          setIsOpen(false);
          break;
      }
    };

    const handleOptionClick = (option: ComboBoxOption) => {
      updateValue(option.label);
      setIsOpen(false);
      inputRef.current?.focus();
    };

    const handleOptionMouseEnter = (index: number) => {
      setHighlightedIndex(index);
    };

    const handleTriggerClick = () => {
      if (!disabled) {
        inputRef.current?.focus();
        setIsOpen(!isOpen);
      }
    };

    return (
      <div
        ref={containerRef}
        className={classNames(styles.root, className)}
      >
        {label && <label className={styles.label}>{label}</label>}

        <div className={styles.inputWrapper}>
          <input
            ref={combinedRef}
            type="text"
            value={currentValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={classNames(
              styles.input,
              isFocused && styles.focused,
              disabled && styles.disabled
            )}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-controls="combobox-listbox"
            autoComplete="off"
          />
          <button
            type="button"
            className={styles.trigger}
            onClick={handleTriggerClick}
            disabled={disabled}
            tabIndex={-1}
            aria-label={isOpen ? 'Close dropdown' : 'Open dropdown'}
          >
            <span className={styles.icon} aria-hidden="true">
              {isOpen ? '▲' : '▼'}
            </span>
          </button>
        </div>

        {isOpen && filteredOptions.length > 0 && (
          <ul
            ref={listRef}
            id="combobox-listbox"
            role="listbox"
            className={styles.dropdown}
          >
            {filteredOptions.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={highlightedIndex === index}
                className={classNames(
                  styles.option,
                  highlightedIndex === index && styles.highlighted
                )}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => handleOptionMouseEnter(index)}
              >
                <span className={styles.optionLabel}>
                  {highlightMatch(option.label, currentValue)}
                </span>
                {option.description && (
                  <span className={styles.optionDescription}>
                    {highlightMatch(option.description, currentValue)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        {isOpen && filteredOptions.length === 0 && currentValue.trim() && (
          <div className={styles.dropdown}>
            <div className={styles.noResults}>No results found</div>
          </div>
        )}
      </div>
    );
  }
);

export default ComboBox;
