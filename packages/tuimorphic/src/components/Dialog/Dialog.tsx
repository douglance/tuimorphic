'use client';

import * as React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { classNames } from '@/utils/classNames';
import styles from './Dialog.module.scss';

export interface DialogProps {
  /** Whether the dialog is open (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Dialog title */
  title?: React.ReactNode;
  /** Dialog content */
  children?: React.ReactNode;
  /** Trigger element */
  trigger?: React.ReactElement;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Dialog component for modal interactions.
 *
 * @example
 * <Dialog
 *   trigger={<Button>Open Dialog</Button>}
 *   title="Confirm Action"
 * >
 *   <p>Are you sure you want to proceed?</p>
 * </Dialog>
 */
export function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  title,
  children,
  trigger,
  className,
}: DialogProps) {
  return (
    <BaseDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger && <BaseDialog.Trigger render={trigger} />}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup className={classNames(styles.popup, className)}>
          {title && (
            <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
          )}
          <BaseDialog.Description className={styles.content}>
            {children}
          </BaseDialog.Description>
          <BaseDialog.Close className={styles.close} aria-label="Close">
            [X]
          </BaseDialog.Close>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

// Export sub-components for advanced usage
export const DialogRoot = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogPortal = BaseDialog.Portal;
export const DialogBackdrop = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <BaseDialog.Backdrop className={classNames(styles.backdrop, className)} {...props} />
);
export const DialogPopup = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
  <BaseDialog.Popup className={classNames(styles.popup, className)} {...props}>
    {children}
  </BaseDialog.Popup>
);
export const DialogTitle = BaseDialog.Title;
export const DialogDescription = BaseDialog.Description;
export const DialogClose = BaseDialog.Close;

export default Dialog;
