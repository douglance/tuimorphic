'use client';

import * as React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { classNames } from '@/utils/classNames';
import styles from './Drawer.module.css';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

// State types for state-based className functions
type DialogBackdropState = Parameters<
  Extract<BaseDialog.Backdrop.Props['className'], Function>
>[0];

type DialogPopupState = Parameters<
  Extract<BaseDialog.Popup.Props['className'], Function>
>[0];

type DialogTitleState = Parameters<
  Extract<BaseDialog.Title.Props['className'], Function>
>[0];

type DialogDescriptionState = Parameters<
  Extract<BaseDialog.Description.Props['className'], Function>
>[0];

type DialogCloseState = Parameters<
  Extract<BaseDialog.Close.Props['className'], Function>
>[0];

export interface DrawerProps
  extends Omit<BaseDialog.Root.Props, 'children'> {
  /** Side the drawer slides in from */
  side?: DrawerSide;
  /** Drawer title displayed in the header */
  title?: React.ReactNode;
  /** Drawer description (optional subtitle) */
  description?: React.ReactNode;
  /** Drawer content */
  children?: React.ReactNode;
  /** Trigger element for uncontrolled usage */
  trigger?: React.ReactElement;
  /** Additional CSS class names for the drawer panel */
  className?: string;
}

export interface DrawerRootProps extends BaseDialog.Root.Props {}

export interface DrawerTriggerProps extends BaseDialog.Trigger.Props {}

export interface DrawerPortalProps extends BaseDialog.Portal.Props {}

export interface DrawerBackdropProps
  extends Omit<BaseDialog.Backdrop.Props, 'className'> {
  /** Additional CSS class names */
  className?: string | ((state: DialogBackdropState) => string | undefined);
}

export interface DrawerPanelProps
  extends Omit<BaseDialog.Popup.Props, 'className'> {
  /** Side the drawer slides in from */
  side?: DrawerSide;
  /** Additional CSS class names */
  className?: string | ((state: DialogPopupState) => string | undefined);
}

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Additional CSS class names */
  className?: string;
  /** Header content */
  children?: React.ReactNode;
}

export interface DrawerTitleProps
  extends Omit<BaseDialog.Title.Props, 'className'> {
  /** Additional CSS class names */
  className?: string | ((state: DialogTitleState) => string | undefined);
}

export interface DrawerDescriptionProps
  extends Omit<BaseDialog.Description.Props, 'className'> {
  /** Additional CSS class names */
  className?: string | ((state: DialogDescriptionState) => string | undefined);
}

export interface DrawerCloseProps
  extends Omit<BaseDialog.Close.Props, 'className'> {
  /** Additional CSS class names */
  className?: string | ((state: DialogCloseState) => string | undefined);
}

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS class names */
  className?: string;
  /** Content */
  children?: React.ReactNode;
}

/**
 * Drawer component for slide-in panels from screen edges.
 *
 * Provides space for secondary content, actions, or navigation links
 * while maintaining main content visibility through an overlay.
 *
 * Uses the Dialog primitive from Base UI for accessibility and focus management.
 *
 * @example
 * // Uncontrolled with trigger
 * <Drawer
 *   trigger={<Button>Open Menu</Button>}
 *   title="NAVIGATION"
 *   side="left"
 * >
 *   <nav>Navigation links here</nav>
 * </Drawer>
 *
 * @example
 * // Controlled usage
 * const [isOpen, setIsOpen] = useState(false);
 * <Drawer
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="SETTINGS"
 *   side="right"
 * >
 *   <p>Settings content here</p>
 * </Drawer>
 *
 * @example
 * // Bottom sheet style
 * <Drawer
 *   trigger={<Button>Show Details</Button>}
 *   title="DETAILS"
 *   side="bottom"
 * >
 *   <p>Detail content here</p>
 * </Drawer>
 */
export function Drawer({
  open,
  defaultOpen,
  onOpenChange,
  side = 'left',
  title,
  description,
  children,
  trigger,
  className,
  ...props
}: DrawerProps) {
  return (
    <BaseDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      {...props}
    >
      {trigger && <BaseDialog.Trigger render={trigger} />}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup
          className={classNames(styles.popup, styles[side], className)}
        >
          {(title || description) && (
            <header className={styles.header}>
              <div className={styles.headerContent}>
                {title && (
                  <BaseDialog.Title className={styles.title}>
                    {title}
                  </BaseDialog.Title>
                )}
                {description && (
                  <BaseDialog.Description className={styles.description}>
                    {description}
                  </BaseDialog.Description>
                )}
              </div>
              <BaseDialog.Close className={styles.close} aria-label="Close drawer">
                [X]
              </BaseDialog.Close>
            </header>
          )}
          {!title && !description && (
            <BaseDialog.Close
              className={classNames(styles.close, styles.closeStandalone)}
              aria-label="Close drawer"
            >
              [X]
            </BaseDialog.Close>
          )}
          <div className={styles.content}>{children}</div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

// ============================================================================
// Sub-components for advanced/compound usage
// ============================================================================

/**
 * Root component for compound drawer pattern.
 * Provides controlled/uncontrolled state management.
 */
export const DrawerRoot = (props: DrawerRootProps) => (
  <BaseDialog.Root {...props} />
);
DrawerRoot.displayName = 'DrawerRoot';

/**
 * Trigger element that opens the drawer when clicked.
 */
export const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  (props, ref) => <BaseDialog.Trigger ref={ref} {...props} />
);
DrawerTrigger.displayName = 'DrawerTrigger';

/**
 * Portal for rendering drawer outside the DOM hierarchy.
 */
export const DrawerPortal = (props: DrawerPortalProps) => (
  <BaseDialog.Portal {...props} />
);
DrawerPortal.displayName = 'DrawerPortal';

/**
 * Semi-transparent backdrop behind the drawer.
 */
export const DrawerBackdrop = React.forwardRef<HTMLDivElement, DrawerBackdropProps>(
  function DrawerBackdrop({ className, ...props }, ref) {
    return (
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
    );
  }
);

/**
 * The main drawer panel container.
 */
export const DrawerPanel = React.forwardRef<HTMLDivElement, DrawerPanelProps>(
  function DrawerPanel({ side = 'left', className, children, ...props }, ref) {
    return (
      <BaseDialog.Popup
        ref={ref}
        className={(state) =>
          classNames(
            styles.popup,
            styles[side],
            typeof className === 'function' ? className(state) : className
          )
        }
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    );
  }
);

/**
 * Header section for the drawer with title and close button.
 */
export const DrawerHeader = React.forwardRef<HTMLElement, DrawerHeaderProps>(
  function DrawerHeader({ className, children, ...props }, ref) {
    return (
      <header ref={ref} className={classNames(styles.header, className)} {...props}>
        {children}
      </header>
    );
  }
);

/**
 * Title component for the drawer header.
 */
export const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  function DrawerTitle({ className, ...props }, ref) {
    return (
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
    );
  }
);

/**
 * Description component for the drawer header.
 */
export const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(function DrawerDescription({ className, ...props }, ref) {
  return (
    <BaseDialog.Description
      ref={ref}
      className={(state) =>
        classNames(
          styles.description,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  );
});

/**
 * Close button for the drawer.
 */
export const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  function DrawerClose({ className, children = '[X]', ...props }, ref) {
    return (
      <BaseDialog.Close
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
      </BaseDialog.Close>
    );
  }
);

/**
 * Main content area of the drawer.
 */
export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={classNames(styles.content, className)} {...props}>
        {children}
      </div>
    );
  }
);

// Export state types for consumers
export type {
  DialogBackdropState as DrawerBackdropState,
  DialogPopupState as DrawerPanelState,
  DialogTitleState as DrawerTitleState,
  DialogDescriptionState as DrawerDescriptionState,
  DialogCloseState as DrawerCloseState,
};

export default Drawer;
