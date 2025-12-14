'use client';

import * as React from 'react';
import { forwardRef } from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { classNames } from '@/utils/classNames';
import styles from './Dialog.module.css';

type BackdropState = Parameters<
  Extract<BaseDialog.Backdrop.Props['className'], Function>
>[0];

type PopupState = Parameters<
  Extract<BaseDialog.Popup.Props['className'], Function>
>[0];

type TitleState = Parameters<
  Extract<BaseDialog.Title.Props['className'], Function>
>[0];

type DescriptionState = Parameters<
  Extract<BaseDialog.Description.Props['className'], Function>
>[0];

type CloseState = Parameters<
  Extract<BaseDialog.Close.Props['className'], Function>
>[0];

export interface DialogRootProps extends BaseDialog.Root.Props {}

export interface DialogTriggerProps extends BaseDialog.Trigger.Props {}

export interface DialogPortalProps extends BaseDialog.Portal.Props {}

export interface DialogBackdropProps
  extends Omit<BaseDialog.Backdrop.Props, 'className'> {
  className?: string | ((state: BackdropState) => string | undefined);
}

export interface DialogPopupProps
  extends Omit<BaseDialog.Popup.Props, 'className'> {
  className?: string | ((state: PopupState) => string | undefined);
}

export interface DialogTitleProps
  extends Omit<BaseDialog.Title.Props, 'className'> {
  className?: string | ((state: TitleState) => string | undefined);
}

export interface DialogDescriptionProps
  extends Omit<BaseDialog.Description.Props, 'className'> {
  className?: string | ((state: DescriptionState) => string | undefined);
}

export interface DialogCloseProps
  extends Omit<BaseDialog.Close.Props, 'className'> {
  className?: string | ((state: CloseState) => string | undefined);
}

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  trigger?: React.ReactElement;
  className?: string;
}

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

export const DialogRoot = (props: DialogRootProps) => (
  <BaseDialog.Root {...props} />
);
DialogRoot.displayName = 'DialogRoot';

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  (props, ref) => <BaseDialog.Trigger ref={ref} {...props} />
);
DialogTrigger.displayName = 'DialogTrigger';

export const DialogPortal = (props: DialogPortalProps) => (
  <BaseDialog.Portal {...props} />
);
DialogPortal.displayName = 'DialogPortal';

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(
  ({ className, ...props }, ref) => (
    <BaseDialog.Backdrop
      ref={ref}
      className={(state) =>
        classNames(
          styles.backdrop,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  )
);
DialogBackdrop.displayName = 'DialogBackdrop';

export const DialogPopup = forwardRef<HTMLDivElement, DialogPopupProps>(
  ({ className, children, ...props }, ref) => (
    <BaseDialog.Popup
      ref={ref}
      className={(state) =>
        classNames(
          styles.popup,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    >
      {children}
    </BaseDialog.Popup>
  )
);
DialogPopup.displayName = 'DialogPopup';

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <BaseDialog.Title
      ref={ref}
      className={(state) =>
        classNames(
          styles.title,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  )
);
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <BaseDialog.Description
    ref={ref}
    className={(state) =>
      classNames(
        styles.content,
        typeof className === 'function' ? className(state) : className
      )
    }
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children = '[X]', ...props }, ref) => (
    <BaseDialog.Close
      ref={ref}
      className={(state) =>
        classNames(
          styles.close,
          typeof className === 'function' ? className(state) : className
        )
      }
      aria-label="Close"
      {...props}
    >
      {children}
    </BaseDialog.Close>
  )
);
DialogClose.displayName = 'DialogClose';

export default Dialog;
