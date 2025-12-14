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

/**
 * Alert component for displaying important messages to users.
 *
 * Features MS-DOS terminal aesthetics with box-shadow borders
 * and variant-based color coding for different severity levels.
 *
 * @example
 * <Alert>Default alert message</Alert>
 *
 * @example
 * <Alert variant="success" title="Success">
 *   Operation completed successfully.
 * </Alert>
 *
 * @example
 * <Alert variant="error" title="Error" dismissible onDismiss={() => setVisible(false)}>
 *   An error occurred while processing your request.
 * </Alert>
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

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onDismiss?.();
        }
      },
      [onDismiss]
    );

    return (
      <div
        ref={ref}
        role="alert"
        className={classNames(styles.alert, styles[variant], className)}
        {...props}
      >
        {(title || dismissible) && (
          <div className={styles.header}>
            <div className={styles.leftBorder} aria-hidden="true">
              ┌─
            </div>
            {title && <span className={styles.title}>{title}</span>}
            <div className={styles.headerLine} aria-hidden="true" />
            {dismissible && (
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleDismiss}
                onKeyDown={handleKeyDown}
                aria-label="Dismiss alert"
              >
                [X]
              </button>
            )}
            <div className={styles.rightBorder} aria-hidden="true">
              ┐
            </div>
          </div>
        )}
        {!title && !dismissible && (
          <div className={styles.headerSimple} aria-hidden="true">
            ┌────────────────────────────────────────┐
          </div>
        )}
        <div className={styles.content}>{children}</div>
        <div className={styles.footer} aria-hidden="true">
          └────────────────────────────────────────┘
        </div>
      </div>
    );
  }
);

export default Alert;
