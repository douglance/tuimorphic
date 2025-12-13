'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './ActionButton.module.scss';

export interface ActionButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  /** Button text content */
  children: React.ReactNode;
  /** Keyboard shortcut to display (e.g., "⌘+S") */
  hotkey?: string;
  /** Optional icon element to display before text */
  icon?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Visual variant */
  variant?: 'primary' | 'secondary';
  /** Additional class name */
  className?: string;
}

/**
 * ActionButton component for task-based options within a workflow.
 *
 * Features keyboard shortcut display, icon support, and loading states.
 * Built with SRCL terminal aesthetics.
 *
 * @example
 * <ActionButton hotkey="⌘+S">Save</ActionButton>
 * <ActionButton icon={<SaveIcon />} hotkey="⌘+S">Save Document</ActionButton>
 * <ActionButton loading>Saving...</ActionButton>
 */
export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  function ActionButton(
    {
      children,
      hotkey,
      icon,
      loading = false,
      disabled = false,
      variant = 'primary',
      className,
      ...props
    },
    ref
  ) {
    const isInteractionDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type="button"
        className={classNames(
          styles.root,
          styles[variant],
          disabled && styles.disabled,
          loading && styles.loading,
          className
        )}
        disabled={isInteractionDisabled}
        aria-busy={loading}
        {...props}
      >
        <span className={styles.content}>
          {loading ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              <span className={styles.label}>Loading</span>
            </>
          ) : (
            <>
              {icon && <span className={styles.icon}>{icon}</span>}
              <span className={styles.label}>{children}</span>
            </>
          )}
        </span>
        {!loading && hotkey && <span className={styles.hotkey}>{hotkey}</span>}
      </button>
    );
  }
);

export default ActionButton;
