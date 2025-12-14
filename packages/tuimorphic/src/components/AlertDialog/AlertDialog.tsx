'use client';

import * as React from 'react';
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import { classNames } from '@/utils/classNames';
import styles from './AlertDialog.module.css';

export interface AlertDialogProps {
  /** Whether the alert dialog is open (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Alert dialog title */
  title?: React.ReactNode;
  /** Alert dialog description */
  description?: React.ReactNode;
  /** Action buttons (typically confirm/cancel) */
  children?: React.ReactNode;
  /** Trigger element */
  trigger?: React.ReactElement;
  /** Additional CSS class names */
  className?: string;
}

/**
 * AlertDialog component for critical confirmations that require user action.
 * Unlike Dialog, AlertDialog cannot be dismissed with Escape key - users must
 * explicitly confirm or cancel.
 *
 * @example
 * <AlertDialog
 *   trigger={<Button>Delete Item</Button>}
 *   title="Confirm Deletion"
 *   description="Are you sure you want to delete this item? This action cannot be undone."
 * >
 *   <AlertDialogClose render={<Button>Cancel</Button>} />
 *   <Button onClick={handleDelete}>Delete</Button>
 * </AlertDialog>
 */
export function AlertDialog({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  children,
  trigger,
  className,
}: AlertDialogProps) {
  return (
    <BaseAlertDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger && <BaseAlertDialog.Trigger render={trigger} />}
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className={styles.backdrop} />
        <BaseAlertDialog.Popup className={classNames(styles.popup, className)}>
          <div className={styles.header}>
            <span className={styles.icon} aria-hidden="true">
              [!]
            </span>
            {title && (
              <BaseAlertDialog.Title className={styles.title}>
                {title}
              </BaseAlertDialog.Title>
            )}
          </div>
          {description && (
            <BaseAlertDialog.Description className={styles.description}>
              {description}
            </BaseAlertDialog.Description>
          )}
          <div className={styles.actions}>{children}</div>
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}

// Export sub-components for advanced usage
export const AlertDialogRoot = BaseAlertDialog.Root;
export const AlertDialogTrigger = BaseAlertDialog.Trigger;
export const AlertDialogPortal = BaseAlertDialog.Portal;
export const AlertDialogBackdrop = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <BaseAlertDialog.Backdrop
    className={classNames(styles.backdrop, className)}
    {...props}
  />
);
export const AlertDialogPopup = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
  <BaseAlertDialog.Popup
    className={classNames(styles.popup, className)}
    {...props}
  >
    {children}
  </BaseAlertDialog.Popup>
);
export const AlertDialogTitle = BaseAlertDialog.Title;
export const AlertDialogDescription = BaseAlertDialog.Description;
export const AlertDialogClose = BaseAlertDialog.Close;

export default AlertDialog;
