'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './Alert.module.css';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Visual variant indicating alert severity */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Optional title displayed in the alert header */
  title?: React.ReactNode;
  /** Alert message content */
  children?: React.ReactNode;
  /** Whether to show a dismiss button */
  dismissible?: boolean;
  /** Callback when the alert is dismissed */
  onDismiss?: () => void;
  /** Additional CSS class names */
  className?: string;
}

// Icons matching React Ink terminal version
const VARIANT_ICONS: Record<NonNullable<AlertProps['variant']>, string> = {
  default: '•',
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✗',
};

/**
 * Alert component for displaying important messages to users.
 *
 * Features terminal aesthetics with solid single-line borders
 * and variant-based color coding for different severity levels.
 * Designed for visual parity with React Ink terminal version.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(
    {
      variant = 'default',
      title,
      children,
      dismissible = false,
      onDismiss,
      className,
      ...props
    },
    ref
  ) {
    const handleDismiss = React.useCallback(() => {
      onDismiss?.();
    }, [onDismiss]);

    const hasTitle = Boolean(title);
    const showTitleRow = hasTitle || dismissible;
    const icon = VARIANT_ICONS[variant] || VARIANT_ICONS.default;

    return (
      <div
        ref={ref}
        role="alert"
        className={classNames(styles.alert, styles[variant], className)}
        {...props}
      >
        <div className={styles.box}>
          {showTitleRow && (
            <div className={styles.titleRow}>
              {hasTitle && <span className={styles.icon}>{icon}</span>}
              {hasTitle && <span className={styles.title}>{title}</span>}
              {dismissible && (
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={handleDismiss}
                  aria-label="Dismiss alert"
                >
                  [X]
                </button>
              )}
            </div>
          )}
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export default Alert;
