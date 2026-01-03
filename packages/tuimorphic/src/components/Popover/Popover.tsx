'use client';

import * as React from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { classNames } from '@/utils/classNames';
import styles from './Popover.module.css';

type BackdropState = Parameters<
  Extract<BasePopover.Backdrop.Props['className'], Function>
>[0];

type PopupState = Parameters<
  Extract<BasePopover.Popup.Props['className'], Function>
>[0];

type TitleState = Parameters<
  Extract<BasePopover.Title.Props['className'], Function>
>[0];

type DescriptionState = Parameters<
  Extract<BasePopover.Description.Props['className'], Function>
>[0];

type CloseState = Parameters<
  Extract<BasePopover.Close.Props['className'], Function>
>[0];

type ArrowState = Parameters<
  Extract<BasePopover.Arrow.Props['className'], Function>
>[0];

export interface PopoverRootProps extends BasePopover.Root.Props {}

export interface PopoverTriggerProps extends BasePopover.Trigger.Props {}

export interface PopoverPortalProps extends BasePopover.Portal.Props {}

export interface PopoverBackdropProps
  extends Omit<BasePopover.Backdrop.Props, 'className'> {
  className?: string | ((state: BackdropState) => string | undefined);
}

export interface PopoverPositionerProps extends BasePopover.Positioner.Props {}

export interface PopoverPopupProps
  extends Omit<BasePopover.Popup.Props, 'className'> {
  className?: string | ((state: PopupState) => string | undefined);
}

export interface PopoverArrowProps
  extends Omit<BasePopover.Arrow.Props, 'className'> {
  className?: string | ((state: ArrowState) => string | undefined);
}

export interface PopoverTitleProps
  extends Omit<BasePopover.Title.Props, 'className'> {
  className?: string | ((state: TitleState) => string | undefined);
}

export interface PopoverDescriptionProps
  extends Omit<BasePopover.Description.Props, 'className'> {
  className?: string | ((state: DescriptionState) => string | undefined);
}

export interface PopoverCloseProps
  extends Omit<BasePopover.Close.Props, 'className'> {
  className?: string | ((state: CloseState) => string | undefined);
}

export interface PopoverProps {
  trigger?: React.ReactElement;
  children?: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Popover({
  trigger,
  children,
  side = 'bottom',
  align = 'center',
  sideOffset = 4,
  open,
  defaultOpen,
  onOpenChange,
  className,
}: PopoverProps) {
  return (
    <BasePopover.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger && <BasePopover.Trigger render={trigger} />}
      <BasePopover.Portal>
        <BasePopover.Positioner side={side} align={align} sideOffset={sideOffset}>
          <BasePopover.Popup className={classNames(styles.popup, className)}>
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}

export const PopoverTitle = React.forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  ({ className, children, ...props }, ref) => (
    <BasePopover.Title
      ref={ref}
      className={(state) =>
        classNames(
          styles.title,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    >
      {children}
    </BasePopover.Title>
  )
);
PopoverTitle.displayName = 'PopoverTitle';

export const PopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  PopoverDescriptionProps
>(({ className, children, ...props }, ref) => (
  <BasePopover.Description
    ref={ref}
    className={(state) =>
      classNames(
        styles.description,
        typeof className === 'function' ? className(state) : className
      )
    }
    {...props}
  >
    {children}
  </BasePopover.Description>
));
PopoverDescription.displayName = 'PopoverDescription';

export const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ className, children = '[X]', ...props }, ref) => (
    <BasePopover.Close
      ref={ref}
      className={(state) =>
        classNames(
          styles.close,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    >
      {children}
    </BasePopover.Close>
  )
);
PopoverClose.displayName = 'PopoverClose';

export const PopoverRoot = (props: PopoverRootProps) => (
  <BasePopover.Root {...props} />
);
PopoverRoot.displayName = 'PopoverRoot';

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  (props, ref) => <BasePopover.Trigger ref={ref} {...props} />
);
PopoverTrigger.displayName = 'PopoverTrigger';

export const PopoverPortal = (props: PopoverPortalProps) => (
  <BasePopover.Portal {...props} />
);
PopoverPortal.displayName = 'PopoverPortal';

export const PopoverBackdrop = React.forwardRef<HTMLDivElement, PopoverBackdropProps>(
  ({ className, ...props }, ref) => (
    <BasePopover.Backdrop
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
PopoverBackdrop.displayName = 'PopoverBackdrop';

export const PopoverPositioner = React.forwardRef<
  HTMLDivElement,
  PopoverPositionerProps
>(({ className, children, ...props }, ref) => (
  <BasePopover.Positioner ref={ref} className={className} {...props}>
    {children}
  </BasePopover.Positioner>
));
PopoverPositioner.displayName = 'PopoverPositioner';

export const PopoverPopup = React.forwardRef<HTMLDivElement, PopoverPopupProps>(
  ({ className, children, ...props }, ref) => (
    <BasePopover.Popup
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
    </BasePopover.Popup>
  )
);
PopoverPopup.displayName = 'PopoverPopup';

export const PopoverArrow = React.forwardRef<HTMLDivElement, PopoverArrowProps>(
  ({ className, children, ...props }, ref) => (
    <BasePopover.Arrow
      ref={ref}
      className={(state) =>
        classNames(
          styles.arrow,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    >
      {children}
    </BasePopover.Arrow>
  )
);
PopoverArrow.displayName = 'PopoverArrow';

export default Popover;
