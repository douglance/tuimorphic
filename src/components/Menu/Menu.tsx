'use client';

import * as React from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { classNames } from '@/utils/classNames';
import styles from './Menu.module.scss';

export interface MenuProps {
  /** Element that triggers the menu to open */
  trigger?: React.ReactElement;
  /** Menu items and content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface MenuItemProps {
  /** Callback when item is selected */
  onSelect?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Item content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface MenuSeparatorProps {
  /** Additional CSS class names */
  className?: string;
}

/**
 * Menu component for dropdown actions and navigation.
 *
 * @example
 * // Simple usage
 * <Menu trigger={<Button>Actions</Button>}>
 *   <MenuItem onSelect={() => console.log('Edit')}>Edit</MenuItem>
 *   <MenuItem onSelect={() => console.log('Delete')}>Delete</MenuItem>
 * </Menu>
 *
 * @example
 * // With separator and disabled item
 * <Menu trigger={<Button>File</Button>}>
 *   <MenuItem onSelect={handleNew}>New</MenuItem>
 *   <MenuItem onSelect={handleOpen}>Open</MenuItem>
 *   <MenuSeparator />
 *   <MenuItem onSelect={handleSave}>Save</MenuItem>
 *   <MenuItem disabled>Save As...</MenuItem>
 * </Menu>
 *
 * @example
 * // Using compound components for advanced control
 * <MenuRoot>
 *   <MenuTrigger render={<Button>Options</Button>} />
 *   <MenuPortal>
 *     <MenuPositioner sideOffset={4}>
 *       <MenuPopup>
 *         <MenuItem onSelect={handleAction}>Action</MenuItem>
 *       </MenuPopup>
 *     </MenuPositioner>
 *   </MenuPortal>
 * </MenuRoot>
 */
export function Menu({ trigger, children, className }: MenuProps) {
  return (
    <BaseMenu.Root>
      {trigger && <BaseMenu.Trigger render={trigger} />}
      <BaseMenu.Portal>
        <BaseMenu.Positioner sideOffset={4}>
          <BaseMenu.Popup className={classNames(styles.popup, className)}>
            {children}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}

/**
 * Menu item component for individual menu actions.
 *
 * @example
 * <MenuItem onSelect={() => console.log('Selected')}>
 *   Action Item
 * </MenuItem>
 */
export function MenuItem({
  onSelect,
  disabled,
  children,
  className,
}: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={classNames(styles.item, className)}
      disabled={disabled}
      onClick={onSelect}
    >
      <span className={styles.indicator} aria-hidden="true">
        ›
      </span>
      <span className={styles.itemContent}>{children}</span>
    </BaseMenu.Item>
  );
}

/**
 * Menu separator for visual grouping of menu items.
 *
 * @example
 * <MenuItem>Item 1</MenuItem>
 * <MenuSeparator />
 * <MenuItem>Item 2</MenuItem>
 */
export function MenuSeparator({ className }: MenuSeparatorProps) {
  return (
    <BaseMenu.Separator className={classNames(styles.separator, className)} />
  );
}

// Export sub-components for advanced usage
export const MenuRoot = BaseMenu.Root;
export const MenuTrigger = BaseMenu.Trigger;
export const MenuPortal = BaseMenu.Portal;

export const MenuPositioner = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.Positioner>) => (
  <BaseMenu.Positioner className={className} {...props}>
    {children}
  </BaseMenu.Positioner>
);

export const MenuPopup = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
  <BaseMenu.Popup className={classNames(styles.popup, className)} {...props}>
    {children}
  </BaseMenu.Popup>
);

export default Menu;
