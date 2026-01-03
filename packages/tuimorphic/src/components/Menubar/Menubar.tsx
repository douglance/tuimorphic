'use client';

import * as React from 'react';
import {
  Menubar as BaseMenubar,
  type MenubarProps as BaseMenubarProps,
} from '@base-ui/react/menubar';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { classNames } from '@/utils/classNames';
import styles from './Menubar.module.css';

export interface MenubarProps {
  /** MenubarMenu components */
  children?: React.ReactNode;
  /** Loop keyboard navigation (default true) */
  loop?: boolean;
  /** Additional CSS class */
  className?: string;
}

export interface MenubarMenuProps {
  /** Menu trigger label (e.g., "File", "Edit") */
  label: string;
  /** Menu items */
  children?: React.ReactNode;
  /** Whether the menu is disabled */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

export interface MenubarItemProps {
  /** Callback when item is selected */
  onSelect?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Item content */
  children?: React.ReactNode;
  /** Keyboard shortcut hint (e.g., "Ctrl+S") */
  shortcut?: string;
  /** Additional CSS class */
  className?: string;
}

export interface MenubarSeparatorProps {
  /** Additional CSS class */
  className?: string;
}

export const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  function Menubar({ children, loop = true, className }, ref) {
    return (
      <BaseMenubar
        ref={ref}
        loopFocus={loop}
        className={classNames(styles.root, className)}
      >
        {children}
      </BaseMenubar>
    );
  }
);
Menubar.displayName = 'Menubar';

export function MenubarMenu({
  label,
  children,
  disabled,
  className,
}: MenubarMenuProps) {
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger
        disabled={disabled}
        className={classNames(styles.trigger, className)}
      >
        {label}
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner sideOffset={0}>
          <BaseMenu.Popup className={styles.popup}>{children}</BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
MenubarMenu.displayName = 'MenubarMenu';

export function MenubarItem({
  onSelect,
  disabled,
  children,
  shortcut,
  className,
}: MenubarItemProps) {
  return (
    <BaseMenu.Item
      className={classNames(styles.item, className)}
      disabled={disabled}
      onClick={onSelect}
    >
      <span className={styles.itemContent}>{children}</span>
      {shortcut && <span className={styles.shortcut}>{shortcut}</span>}
    </BaseMenu.Item>
  );
}
MenubarItem.displayName = 'MenubarItem';

export function MenubarSeparator({ className }: MenubarSeparatorProps) {
  return (
    <BaseMenu.Separator className={classNames(styles.separator, className)} />
  );
}
MenubarSeparator.displayName = 'MenubarSeparator';

// Compound components for advanced usage
export interface MenubarRootProps
  extends Omit<BaseMenubarProps, 'className'> {
  className?: string;
}

export const MenubarRoot = React.forwardRef<HTMLDivElement, MenubarRootProps>(
  ({ className, ...props }, ref) => (
    <BaseMenubar
      ref={ref}
      className={classNames(styles.root, className)}
      {...props}
    />
  )
);
MenubarRoot.displayName = 'MenubarRoot';

export default Menubar;
