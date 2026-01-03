'use client';

import * as React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { classNames } from '@/utils/classNames';
import styles from './Tooltip.module.css';

// State types for className functions
type PopupState = Parameters<
  Extract<BaseTooltip.Popup.Props['className'], Function>
>[0];

type TriggerState = Parameters<
  Extract<BaseTooltip.Trigger.Props['className'], Function>
>[0];

type PositionerState = Parameters<
  Extract<BaseTooltip.Positioner.Props['className'], Function>
>[0];

type ArrowState = Parameters<
  Extract<BaseTooltip.Arrow.Props['className'], Function>
>[0];

// Prop interfaces extending Base UI
export interface TooltipProviderProps extends BaseTooltip.Provider.Props {}

export interface TooltipRootProps extends BaseTooltip.Root.Props {}

export interface TooltipTriggerProps
  extends Omit<BaseTooltip.Trigger.Props, 'className'> {
  className?: string | ((state: TriggerState) => string | undefined);
}

export interface TooltipPortalProps extends BaseTooltip.Portal.Props {}

export interface TooltipPositionerProps
  extends Omit<BaseTooltip.Positioner.Props, 'className'> {
  className?: string | ((state: PositionerState) => string | undefined);
}

export interface TooltipPopupProps
  extends Omit<BaseTooltip.Popup.Props, 'className'> {
  className?: string | ((state: PopupState) => string | undefined);
}

export interface TooltipArrowProps
  extends Omit<BaseTooltip.Arrow.Props, 'className'> {
  className?: string | ((state: ArrowState) => string | undefined);
}

// Simple convenience component (existing API)
export interface TooltipProps {
  /** Tooltip content */
  content: React.ReactNode;
  /** Element that triggers the tooltip */
  children: React.ReactElement;
  /** Preferred side of the trigger to render */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing (ms) */
  delay?: number;
  /** Additional CSS class names for the popup */
  className?: string;
}

/**
 * Tooltip component for displaying contextual information.
 *
 * @example
 * <Tooltip content="Save your work">
 *   <Button>Save</Button>
 * </Tooltip>
 */
export function Tooltip({
  content,
  children,
  side = 'top',
  delay = 200,
  className,
}: TooltipProps) {
  return (
    <BaseTooltip.Provider delay={delay}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={children} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner side={side} sideOffset={8}>
            <BaseTooltip.Popup className={classNames(styles.popup, className)}>
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}

// Compound components for advanced usage

export const TooltipProvider = (props: TooltipProviderProps) => (
  <BaseTooltip.Provider {...props} />
);
TooltipProvider.displayName = 'TooltipProvider';

export const TooltipRoot = (props: TooltipRootProps) => (
  <BaseTooltip.Root {...props} />
);
TooltipRoot.displayName = 'TooltipRoot';

export const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ className, ...props }, ref) => (
    <BaseTooltip.Trigger
      ref={ref}
      className={(state) =>
        typeof className === 'function' ? className(state) : className
      }
      {...props}
    />
  )
);
TooltipTrigger.displayName = 'TooltipTrigger';

export const TooltipPortal = (props: TooltipPortalProps) => (
  <BaseTooltip.Portal {...props} />
);
TooltipPortal.displayName = 'TooltipPortal';

export const TooltipPositioner = React.forwardRef<HTMLDivElement, TooltipPositionerProps>(
  ({ className, ...props }, ref) => (
    <BaseTooltip.Positioner
      ref={ref}
      className={(state) =>
        typeof className === 'function' ? className(state) : className
      }
      {...props}
    />
  )
);
TooltipPositioner.displayName = 'TooltipPositioner';

export const TooltipPopup = React.forwardRef<HTMLDivElement, TooltipPopupProps>(
  ({ className, ...props }, ref) => (
    <BaseTooltip.Popup
      ref={ref}
      className={(state) =>
        classNames(
          styles.popup,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  )
);
TooltipPopup.displayName = 'TooltipPopup';

export const TooltipArrow = React.forwardRef<HTMLDivElement, TooltipArrowProps>(
  ({ className, ...props }, ref) => (
    <BaseTooltip.Arrow
      ref={ref}
      className={(state) =>
        typeof className === 'function' ? className(state) : className
      }
      {...props}
    />
  )
);
TooltipArrow.displayName = 'TooltipArrow';

export default Tooltip;
