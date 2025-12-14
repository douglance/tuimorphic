'use client';

import * as React from 'react';
import { Toast as BaseToast } from '@base-ui/react/toast';
import { classNames } from '@/utils/classNames';
import styles from './Toast.module.css';

/** Toast type variants for visual indication */
export type ToastType = 'info' | 'success' | 'warning' | 'error';

/** Props for the ToastProvider component */
export interface ToastProviderProps {
  /** Child elements to wrap with toast context */
  children?: React.ReactNode;
  /** Maximum number of visible toasts. Defaults to 3 */
  limit?: number;
  /** Default timeout in ms before auto-dismiss. Defaults to 5000 */
  timeout?: number;
}

/** Props for individual toast display */
export interface ToastProps {
  /** Visual type indicator for the toast */
  type?: ToastType;
  /** Toast title content */
  title?: React.ReactNode;
  /** Toast description content */
  description?: React.ReactNode;
  /** Optional action element */
  action?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/** Type indicators displayed in terminal aesthetic */
const TYPE_INDICATORS: Record<ToastType, string> = {
  info: '[i]',
  success: '[OK]',
  warning: '[!]',
  error: '[ERR]',
};

/**
 * Internal component that renders the list of active toasts.
 * Maps toast objects from the manager to styled toast elements.
 */
function Toasts() {
  const { toasts } = BaseToast.useToastManager();

  return toasts.map((toast) => {
    const toastType = (toast.type as ToastType) || 'info';
    const indicator = TYPE_INDICATORS[toastType] || TYPE_INDICATORS.info;

    return (
      <BaseToast.Root
        key={toast.id}
        toast={toast}
        className={classNames(styles.root, styles[toastType])}
      >
        <span className={styles.indicator} aria-hidden="true">
          {indicator}
        </span>
        <BaseToast.Content className={styles.content}>
          <BaseToast.Title className={styles.title} />
          <BaseToast.Description className={styles.description} />
          {toast.actionProps && (
            <BaseToast.Action className={styles.action} />
          )}
        </BaseToast.Content>
        <BaseToast.Close className={styles.close} aria-label="Dismiss">
          [X]
        </BaseToast.Close>
      </BaseToast.Root>
    );
  });
}

/**
 * ToastProvider component that wraps the application and provides toast context.
 * Includes the viewport for rendering toast notifications.
 *
 * @example
 * ```tsx
 * // Wrap your app with the provider
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // Use the hook to show toasts
 * function MyComponent() {
 *   const { toastManager } = useToast();
 *
 *   const showToast = () => {
 *     toastManager.add({
 *       type: 'success',
 *       title: 'Success',
 *       description: 'Operation completed successfully.',
 *     });
 *   };
 *
 *   return <button onClick={showToast}>Show Toast</button>;
 * }
 * ```
 */
export function ToastProvider({
  children,
  limit = 3,
  timeout = 5000,
}: ToastProviderProps) {
  return (
    <BaseToast.Provider limit={limit} timeout={timeout}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className={styles.viewport}>
          <Toasts />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

/**
 * Toast component for rendering individual toast notifications.
 * Primarily used internally by ToastProvider, but exported for custom implementations.
 *
 * @example
 * ```tsx
 * <Toast
 *   type="success"
 *   title="Operation Complete"
 *   description="Your changes have been saved."
 * />
 * ```
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  function Toast(
    {
      type = 'info',
      title,
      description,
      action,
      className,
    },
    ref
  ) {
    const indicator = TYPE_INDICATORS[type];

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={classNames(styles.root, styles[type], className)}
      >
        <span className={styles.indicator} aria-hidden="true">
          {indicator}
        </span>
        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {action && <div className={styles.action}>{action}</div>}
      </div>
    );
  }
);

/**
 * Hook for imperatively managing toasts.
 * Returns the toast manager with methods to add, update, and close toasts.
 *
 * @example
 * ```tsx
 * const { toastManager } = useToast();
 *
 * // Add a toast
 * const toastId = toastManager.add({
 *   type: 'info',
 *   title: 'Notification',
 *   description: 'You have a new message.',
 * });
 *
 * // Update a toast
 * toastManager.update(toastId, {
 *   type: 'success',
 *   description: 'Message delivered!',
 * });
 *
 * // Close a toast
 * toastManager.close(toastId);
 *
 * // Promise-based toast
 * toastManager.promise(fetchData(), {
 *   loading: { title: 'Loading...', description: 'Fetching data' },
 *   success: { title: 'Success', description: 'Data loaded' },
 *   error: { title: 'Error', description: 'Failed to load data' },
 * });
 * ```
 */
export const useToast = BaseToast.useToastManager;

/**
 * Creates a global toast manager instance for use outside React components.
 *
 * @example
 * ```tsx
 * // Create a global manager
 * const globalToastManager = createToastManager();
 *
 * // Pass to provider
 * <ToastProvider toastManager={globalToastManager}>
 *   <App />
 * </ToastProvider>
 *
 * // Use anywhere
 * globalToastManager.add({ title: 'Hello!' });
 * ```
 */
export const createToastManager = BaseToast.createToastManager;

// Re-export Base UI sub-components for advanced usage
export const ToastRoot = BaseToast.Root;
export const ToastTitle = BaseToast.Title;
export const ToastDescription = BaseToast.Description;
export const ToastAction = BaseToast.Action;
export const ToastClose = BaseToast.Close;
export const ToastContent = BaseToast.Content;
export const ToastViewport = BaseToast.Viewport;
export const ToastPortal = BaseToast.Portal;

export default Toast;
