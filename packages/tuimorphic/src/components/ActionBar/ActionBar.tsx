'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './ActionBar.module.css';

export interface ActionBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  /** ActionBar content (typically ActionButtons, text, or other controls) */
  children: React.ReactNode;
  /** Position of the bar */
  position?: 'top' | 'bottom';
  /** Alignment of children */
  align?: 'start' | 'center' | 'end' | 'between';
  /** Additional class name */
  className?: string;
}

/**
 * ActionBar component for containing primary and secondary actions.
 *
 * Provides a horizontal container for menu options, navigation buttons,
 * titles, search fields, or ActionButtons with keyboard shortcuts.
 *
 * Based on SRCL (Sacred Computer).
 *
 * @example
 * <ActionBar position="top">
 *   <ActionButton hotkey="^+1">File</ActionButton>
 *   <ActionButton hotkey="^+2">Edit</ActionButton>
 *   <ActionButton hotkey="^+3">View</ActionButton>
 * </ActionBar>
 *
 * @example
 * <ActionBar position="bottom" align="between">
 *   <span>Status: Ready</span>
 *   <ActionButton hotkey="^+S">Save</ActionButton>
 * </ActionBar>
 */
export const ActionBar = React.forwardRef<HTMLDivElement, ActionBarProps>(
  function ActionBar(
    { children, position = 'top', align = 'start', className, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        role="toolbar"
        className={classNames(
          styles.root,
          styles[position],
          styles[`align-${align}`],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ActionBar.displayName = 'ActionBar';

export default ActionBar;
