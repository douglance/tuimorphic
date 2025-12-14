'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './DatePicker.module.css';

export interface DatePickerProps {
  /** Selected date value (controlled) */
  value?: Date;
  /** Default selected date (uncontrolled) */
  defaultValue?: Date;
  /** Callback when date changes */
  onValueChange?: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Label text for the date picker */
  label?: string;
  /** Additional CSS class names */
  className?: string;
}

/** Day header labels for the calendar grid */
const DAY_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

/** Month names for the header display */
const MONTH_NAMES = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
] as const;

/**
 * Check if two dates are the same day.
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if a date is within the allowed range.
 */
function isDateInRange(
  date: Date,
  minDate: Date | undefined,
  maxDate: Date | undefined
): boolean {
  if (minDate && date < minDate) {
    // Compare dates without time
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const minOnly = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    if (dateOnly < minOnly) return false;
  }
  if (maxDate) {
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const maxOnly = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    if (dateOnly > maxOnly) return false;
  }
  return true;
}

/**
 * Get the number of days in a month.
 */
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of the week for the first day of a month (0 = Sunday).
 */
function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Generate calendar grid data for a given month.
 */
function generateCalendarGrid(year: number, month: number): (number | null)[][] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const weeks: (number | null)[][] = [];

  let currentDay = 1;
  let week: (number | null)[] = [];

  // Fill in empty cells before the first day
  for (let i = 0; i < firstDay; i++) {
    week.push(null);
  }

  // Fill in the days
  while (currentDay <= daysInMonth) {
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    week.push(currentDay);
    currentDay++;
  }

  // Fill in empty cells after the last day
  while (week.length < 7) {
    week.push(null);
  }
  weeks.push(week);

  return weeks;
}

/**
 * DatePicker component with MS-DOS inspired calendar interface.
 *
 * Features:
 * - Calendar grid with month/year header
 * - Navigation arrows for month/year
 * - 7-column week layout (Su Mo Tu We Th Fr Sa)
 * - Visual indication of today and selected date
 * - Keyboard navigation support
 * - Min/max date constraints
 *
 * Based on SRCL (Sacred Computer).
 *
 * @example
 * <DatePicker
 *   label="Start Date"
 *   onValueChange={(date) => console.log(date)}
 * />
 *
 * @example
 * <DatePicker
 *   value={selectedDate}
 *   onValueChange={setSelectedDate}
 *   minDate={new Date()}
 * />
 */
export function DatePicker({
  value,
  defaultValue,
  onValueChange,
  minDate,
  maxDate,
  label,
  className,
}: DatePickerProps) {
  const today = React.useMemo(() => new Date(), []);
  const gridRef = React.useRef<HTMLDivElement>(null);

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(
    defaultValue
  );

  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined;
  const selectedDate = isControlled ? value : internalValue;

  // State for the currently displayed month/year
  const [viewDate, setViewDate] = React.useState<Date>(() => {
    if (selectedDate) return new Date(selectedDate);
    if (defaultValue) return new Date(defaultValue);
    return new Date();
  });

  // State for keyboard-focused day
  const [focusedDay, setFocusedDay] = React.useState<number | null>(null);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  // Generate the calendar grid
  const calendarWeeks = React.useMemo(
    () => generateCalendarGrid(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  /**
   * Navigate to the previous month.
   */
  const handlePreviousMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setFocusedDay(null);
  };

  /**
   * Navigate to the next month.
   */
  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setFocusedDay(null);
  };

  /**
   * Navigate to the previous year.
   */
  const handlePreviousYear = () => {
    setViewDate((prev) => new Date(prev.getFullYear() - 1, prev.getMonth(), 1));
    setFocusedDay(null);
  };

  /**
   * Navigate to the next year.
   */
  const handleNextYear = () => {
    setViewDate((prev) => new Date(prev.getFullYear() + 1, prev.getMonth(), 1));
    setFocusedDay(null);
  };

  /**
   * Select a day.
   */
  const handleDaySelect = (day: number) => {
    const newDate = new Date(viewYear, viewMonth, day);

    if (!isDateInRange(newDate, minDate, maxDate)) {
      return;
    }

    if (!isControlled) {
      setInternalValue(newDate);
    }
    onValueChange?.(newDate);
  };

  /**
   * Check if a day is disabled (outside min/max range).
   */
  const isDayDisabled = (day: number): boolean => {
    const date = new Date(viewYear, viewMonth, day);
    return !isDateInRange(date, minDate, maxDate);
  };

  /**
   * Check if a day is today.
   */
  const isDayToday = (day: number): boolean => {
    return isSameDay(new Date(viewYear, viewMonth, day), today);
  };

  /**
   * Check if a day is currently selected.
   */
  const isDaySelected = (day: number): boolean => {
    if (!selectedDate) return false;
    return isSameDay(new Date(viewYear, viewMonth, day), selectedDate);
  };

  /**
   * Handle keyboard navigation within the calendar grid.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);

    // Initialize focused day if not set
    if (focusedDay === null) {
      if (selectedDate && selectedDate.getMonth() === viewMonth && selectedDate.getFullYear() === viewYear) {
        setFocusedDay(selectedDate.getDate());
      } else if (isDayToday(today.getDate()) && today.getMonth() === viewMonth && today.getFullYear() === viewYear) {
        setFocusedDay(today.getDate());
      } else {
        setFocusedDay(1);
      }
      return;
    }

    switch (event.key) {
      case 'ArrowLeft': {
        event.preventDefault();
        if (focusedDay > 1) {
          setFocusedDay(focusedDay - 1);
        } else {
          // Move to previous month
          const prevMonthDays = getDaysInMonth(viewYear, viewMonth - 1);
          handlePreviousMonth();
          setFocusedDay(prevMonthDays);
        }
        break;
      }
      case 'ArrowRight': {
        event.preventDefault();
        if (focusedDay < daysInMonth) {
          setFocusedDay(focusedDay + 1);
        } else {
          // Move to next month
          handleNextMonth();
          setFocusedDay(1);
        }
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const newDay = focusedDay - 7;
        if (newDay > 0) {
          setFocusedDay(newDay);
        } else {
          // Move to previous month
          const prevMonthDays = getDaysInMonth(viewYear, viewMonth - 1);
          handlePreviousMonth();
          setFocusedDay(prevMonthDays + newDay);
        }
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        const newDay = focusedDay + 7;
        if (newDay <= daysInMonth) {
          setFocusedDay(newDay);
        } else {
          // Move to next month
          handleNextMonth();
          setFocusedDay(newDay - daysInMonth);
        }
        break;
      }
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (focusedDay && !isDayDisabled(focusedDay)) {
          handleDaySelect(focusedDay);
        }
        break;
      }
      case 'Home': {
        event.preventDefault();
        setFocusedDay(1);
        break;
      }
      case 'End': {
        event.preventDefault();
        setFocusedDay(daysInMonth);
        break;
      }
      case 'PageUp': {
        event.preventDefault();
        if (event.shiftKey) {
          handlePreviousYear();
        } else {
          handlePreviousMonth();
        }
        break;
      }
      case 'PageDown': {
        event.preventDefault();
        if (event.shiftKey) {
          handleNextYear();
        } else {
          handleNextMonth();
        }
        break;
      }
    }
  };

  /**
   * Handle focus on the grid.
   */
  const handleGridFocus = () => {
    if (focusedDay === null) {
      if (selectedDate && selectedDate.getMonth() === viewMonth && selectedDate.getFullYear() === viewYear) {
        setFocusedDay(selectedDate.getDate());
      } else if (today.getMonth() === viewMonth && today.getFullYear() === viewYear) {
        setFocusedDay(today.getDate());
      } else {
        setFocusedDay(1);
      }
    }
  };

  /**
   * Handle blur on the grid.
   */
  const handleGridBlur = () => {
    setFocusedDay(null);
  };

  /**
   * Format day with leading zero.
   */
  const formatDay = (day: number): string => {
    return day.toString().padStart(2, '0');
  };

  return (
    <div className={classNames(styles.root, className)}>
      {label && <div className={styles.label}>{label}</div>}

      <div className={styles.calendar}>
        {/* Header with year navigation */}
        <div className={styles.header}>
          <button
            type="button"
            className={styles.navButton}
            onClick={handlePreviousYear}
            aria-label="Previous year"
          >
            {'<<'}
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={handlePreviousMonth}
            aria-label="Previous month"
          >
            {'<'}
          </button>
          <span className={styles.monthYear}>
            {viewYear} {MONTH_NAMES[viewMonth]}
          </span>
          <button
            type="button"
            className={styles.navButton}
            onClick={handleNextMonth}
            aria-label="Next month"
          >
            {'>'}
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={handleNextYear}
            aria-label="Next year"
          >
            {'>>'}
          </button>
        </div>

        {/* Day headers */}
        <div className={styles.dayHeaders} role="row">
          {DAY_HEADERS.map((day) => (
            <div key={day} className={styles.dayHeader} role="columnheader">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div
          ref={gridRef}
          className={styles.grid}
          role="grid"
          aria-label="Calendar"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onFocus={handleGridFocus}
          onBlur={handleGridBlur}
        >
          {calendarWeeks.map((week, weekIndex) => (
            <div key={weekIndex} className={styles.week} role="row">
              {week.map((day, dayIndex) => {
                if (day === null) {
                  return (
                    <div
                      key={`empty-${dayIndex}`}
                      className={styles.emptyDay}
                      role="gridcell"
                    />
                  );
                }

                const isToday = isDayToday(day);
                const isSelected = isDaySelected(day);
                const isDisabled = isDayDisabled(day);
                const isFocused = focusedDay === day;

                return (
                  <button
                    key={day}
                    type="button"
                    role="gridcell"
                    aria-selected={isSelected}
                    aria-disabled={isDisabled}
                    tabIndex={-1}
                    className={classNames(
                      styles.day,
                      isToday && styles.today,
                      isSelected && styles.selected,
                      isDisabled && styles.disabled,
                      isFocused && styles.focused
                    )}
                    onClick={() => !isDisabled && handleDaySelect(day)}
                  >
                    {formatDay(day)}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
