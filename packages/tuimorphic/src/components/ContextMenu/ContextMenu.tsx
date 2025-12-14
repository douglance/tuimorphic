'use client';

import * as React from 'react';
import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import { classNames } from '@/utils/classNames';
import styles from './ContextMenu.module.css';

export interface ContextMenuProps {
  /** Area that responds to right-click */
  trigger: React.ReactElement;
  /** Menu items and content */
  children?: React.ReactNode;
  /** Additional CSS class names for the popup */
  className?: string;
}

export interface ContextMenuItemProps {
  /** Callback when item is selected */
  onSelect?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Item content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface ContextMenuSeparatorProps {
  /** Additional CSS class names */
  className?: string;
}

/**
 * ContextMenu component for right-click context actions.
 *
 * @example
 * // Basic usage with a trigger area
 * <ContextMenu trigger={<div className="context-area">Right-click here</div>}>
 *   <ContextMenuItem onSelect={() => console.log('Edit')}>Edit</ContextMenuItem>
 *   <ContextMenuItem onSelect={() => console.log('Copy')}>Copy</ContextMenuItem>
 *   <ContextMenuSeparator />
 *   <ContextMenuItem onSelect={() => console.log('Delete')}>Delete</ContextMenuItem>
 * </ContextMenu>
 *
 * @example
 * // With disabled items
 * <ContextMenu trigger={<div>Right-click me</div>}>
 *   <ContextMenuItem onSelect={handleCut}>Cut</ContextMenuItem>
 *   <ContextMenuItem onSelect={handleCopy}>Copy</ContextMenuItem>
 *   <ContextMenuItem disabled>Paste</ContextMenuItem>
 * </ContextMenu>
 *
 * @example
 * // Using compound components for advanced control
 * <ContextMenuRoot>
 *   <ContextMenuTrigger render={<div>Right-click area</div>} />
 *   <ContextMenuPortal>
 *     <ContextMenuPositioner>
 *       <ContextMenuPopup>
 *         <ContextMenuItem onSelect={handleAction}>Action</ContextMenuItem>
 *       </ContextMenuPopup>
 *     </ContextMenuPositioner>
 *   </ContextMenuPortal>
 * </ContextMenuRoot>
 */
export function ContextMenu({ trigger, children, className }: ContextMenuProps) {
  return (
    <BaseContextMenu.Root>
      <BaseContextMenu.Trigger render={trigger} />
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner>
          <BaseContextMenu.Popup className={classNames(styles.popup, className)}>
            {children}
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}

/**
 * ContextMenuItem component for individual context menu actions.
 *
 * @example
 * <ContextMenuItem onSelect={() => console.log('Selected')}>
 *   Action Item
 * </ContextMenuItem>
 */
export function ContextMenuItem({
  onSelect,
  disabled,
  children,
  className,
}: ContextMenuItemProps) {
  return (
    <BaseContextMenu.Item
      className={classNames(styles.item, className)}
      disabled={disabled}
      onClick={onSelect}
    >
      <span className={styles.indicator} aria-hidden="true">
        ›
      </span>
      <span className={styles.itemContent}>{children}</span>
    </BaseContextMenu.Item>
  );
}

/**
 * ContextMenuSeparator for visual grouping of context menu items.
 *
 * @example
 * <ContextMenuItem>Item 1</ContextMenuItem>
 * <ContextMenuSeparator />
 * <ContextMenuItem>Item 2</ContextMenuItem>
 */
export function ContextMenuSeparator({ className }: ContextMenuSeparatorProps) {
  return (
    <BaseContextMenu.Separator
      className={classNames(styles.separator, className)}
    />
  );
}

// Export sub-components for advanced usage
export const ContextMenuRoot = BaseContextMenu.Root;
export const ContextMenuTrigger = BaseContextMenu.Trigger;
export const ContextMenuPortal = BaseContextMenu.Portal;

export const ContextMenuPositioner = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Positioner>) => (
  <BaseContextMenu.Positioner className={className} {...props}>
    {children}
  </BaseContextMenu.Positioner>
);

export const ContextMenuPopup = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
  <BaseContextMenu.Popup
    className={classNames(styles.popup, className)}
    {...props}
  >
    {children}
  </BaseContextMenu.Popup>
);

export default ContextMenu;
