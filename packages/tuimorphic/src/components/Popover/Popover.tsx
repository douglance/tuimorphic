'use client';

import * as React from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { classNames } from '@/utils/classNames';
import styles from './Popover.module.scss';

export interface PopoverProps {
  /** Element that triggers the popover to open */
  trigger?: React.ReactElement;
  /** Popover content */
  children?: React.ReactNode;
  /** Placement relative to trigger */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Alignment along the side */
  align?: 'start' | 'center' | 'end';
  /** Distance from the trigger element in pixels */
  sideOffset?: number;
  /** Whether the popover is open (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Additional CSS class names for the popup */
  className?: string;
}

export interface PopoverTitleProps {
  /** Title content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface PopoverDescriptionProps {
  /** Description content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface PopoverCloseProps {
  /** Close button content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Popover component for displaying transient overlay content.
 *
 * @example
 * // Simple usage
 * <Popover trigger={<Button>Open</Button>}>
 *   <p>Popover content goes here</p>
 * </Popover>
 *
 * @example
 * // With positioning
 * <Popover
 *   trigger={<Button>Info</Button>}
 *   side="bottom"
 *   align="start"
 *   sideOffset={8}
 * >
 *   <PopoverTitle>Information</PopoverTitle>
 *   <PopoverDescription>
 *     Additional details about this item.
 *   </PopoverDescription>
 * </Popover>
 *
 * @example
 * // Controlled usage
 * const [open, setOpen] = useState(false);
 * <Popover
 *   open={open}
 *   onOpenChange={setOpen}
 *   trigger={<Button>Toggle</Button>}
 * >
 *   <p>Controlled popover content</p>
 *   <PopoverClose>Close</PopoverClose>
 * </Popover>
 *
 * @example
 * // Using compound components for advanced control
 * <PopoverRoot>
 *   <PopoverTrigger render={<Button>Options</Button>} />
 *   <PopoverPortal>
 *     <PopoverPositioner side="bottom" sideOffset={8}>
 *       <PopoverPopup>
 *         <PopoverTitle>Settings</PopoverTitle>
 *         <PopoverDescription>Configure your preferences</PopoverDescription>
 *         <PopoverClose>[X]</PopoverClose>
 *       </PopoverPopup>
 *     </PopoverPositioner>
 *   </PopoverPortal>
 * </PopoverRoot>
 */
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

/**
 * Popover title component for labeling popover content.
 *
 * @example
 * <PopoverTitle>Settings</PopoverTitle>
 */
export function PopoverTitle({ children, className }: PopoverTitleProps) {
  return (
    <BasePopover.Title className={classNames(styles.title, className)}>
      {children}
    </BasePopover.Title>
  );
}

/**
 * Popover description component for additional context.
 *
 * @example
 * <PopoverDescription>
 *   Configure your preferences here.
 * </PopoverDescription>
 */
export function PopoverDescription({ children, className }: PopoverDescriptionProps) {
  return (
    <BasePopover.Description className={classNames(styles.description, className)}>
      {children}
    </BasePopover.Description>
  );
}

/**
 * Popover close button component.
 *
 * @example
 * <PopoverClose>[X]</PopoverClose>
 */
export function PopoverClose({ children = '[X]', className }: PopoverCloseProps) {
  return (
    <BasePopover.Close className={classNames(styles.close, className)}>
      {children}
    </BasePopover.Close>
  );
}

// Export sub-components for advanced usage
export const PopoverRoot = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;
export const PopoverPortal = BasePopover.Portal;
export const PopoverBackdrop = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <BasePopover.Backdrop className={classNames(styles.backdrop, className)} {...props} />
);

export const PopoverPositioner = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BasePopover.Positioner>) => (
  <BasePopover.Positioner className={className} {...props}>
    {children}
  </BasePopover.Positioner>
);

export const PopoverPopup = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
  <BasePopover.Popup className={classNames(styles.popup, className)} {...props}>
    {children}
  </BasePopover.Popup>
);

export const PopoverArrow = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
  <BasePopover.Arrow className={classNames(styles.arrow, className)} {...props}>
    {children}
  </BasePopover.Arrow>
);

export default Popover;
