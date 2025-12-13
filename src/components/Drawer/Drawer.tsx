'use client';

import * as React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { classNames } from '@/utils/classNames';
import styles from './Drawer.module.scss';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  /** Whether the drawer is open (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
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
}: DrawerProps) {
  return (
    <BaseDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger && <BaseDialog.Trigger render={trigger} />}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup
          className={classNames(
            styles.popup,
            styles[side],
            className
          )}
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
          <div className={styles.content}>
            {children}
          </div>
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
export const DrawerRoot = BaseDialog.Root;

/**
 * Trigger element that opens the drawer when clicked.
 */
export const DrawerTrigger = BaseDialog.Trigger;

/**
 * Portal for rendering drawer outside the DOM hierarchy.
 */
export const DrawerPortal = BaseDialog.Portal;

export interface DrawerBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS class names */
  className?: string;
}

/**
 * Semi-transparent backdrop behind the drawer.
 */
export const DrawerBackdrop = React.forwardRef<HTMLDivElement, DrawerBackdropProps>(
  function DrawerBackdrop({ className, ...props }, ref) {
    return (
      <BaseDialog.Backdrop
        ref={ref}
        className={classNames(styles.backdrop, className)}
        {...props}
      />
    );
  }
);

export interface DrawerPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Side the drawer slides in from */
  side?: DrawerSide;
  /** Additional CSS class names */
  className?: string;
  /** Panel content */
  children?: React.ReactNode;
}

/**
 * The main drawer panel container.
 */
export const DrawerPanel = React.forwardRef<HTMLDivElement, DrawerPanelProps>(
  function DrawerPanel({ side = 'left', className, children, ...props }, ref) {
    return (
      <BaseDialog.Popup
        ref={ref}
        className={classNames(styles.popup, styles[side], className)}
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    );
  }
);

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Additional CSS class names */
  className?: string;
  /** Header content */
  children?: React.ReactNode;
}

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
export const DrawerTitle = BaseDialog.Title;

/**
 * Description component for the drawer header.
 */
export const DrawerDescription = BaseDialog.Description;

export interface DrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Additional CSS class names */
  className?: string;
  /** Close button content (defaults to [X]) */
  children?: React.ReactNode;
}

/**
 * Close button for the drawer.
 */
export const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  function DrawerClose({ className, children = '[X]', ...props }, ref) {
    return (
      <BaseDialog.Close
        ref={ref}
        className={classNames(styles.close, className)}
        {...props}
      >
        {children}
      </BaseDialog.Close>
    );
  }
);

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS class names */
  className?: string;
  /** Content */
  children?: React.ReactNode;
}

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

export default Drawer;
