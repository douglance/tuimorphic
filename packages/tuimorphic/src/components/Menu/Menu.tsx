'use client';

import * as React from 'react';
import { forwardRef } from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { classNames } from '@/utils/classNames';
import styles from './Menu.module.css';

type PopupState = Parameters<
  Extract<BaseMenu.Popup.Props['className'], Function>
>[0];

type ItemState = Parameters<
  Extract<BaseMenu.Item.Props['className'], Function>
>[0];

type SeparatorState = Parameters<
  Extract<BaseMenu.Separator.Props['className'], Function>
>[0];

export interface MenuRootProps extends BaseMenu.Root.Props {}

export interface MenuTriggerProps extends BaseMenu.Trigger.Props {}

export interface MenuPortalProps extends BaseMenu.Portal.Props {}

export interface MenuPositionerProps extends BaseMenu.Positioner.Props {}

export interface MenuPopupProps
  extends Omit<BaseMenu.Popup.Props, 'className'> {
  className?: string | ((state: PopupState) => string | undefined);
}

export interface MenuItemProps extends Omit<BaseMenu.Item.Props, 'className'> {
  className?: string | ((state: ItemState) => string | undefined);
  onSelect?: () => void;
}

export interface MenuSeparatorProps
  extends Omit<BaseMenu.Separator.Props, 'className'> {
  className?: string | ((state: SeparatorState) => string | undefined);
}

export interface MenuProps {
  trigger?: React.ReactElement;
  children?: React.ReactNode;
  className?: string;
}

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

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ onSelect, className, children, ...props }, ref) => (
    <BaseMenu.Item
      ref={ref}
      className={(state) =>
        classNames(
          styles.item,
          typeof className === 'function' ? className(state) : className
        )
      }
      onClick={onSelect}
      {...props}
    >
      <span className={styles.indicator} aria-hidden="true">
        ›
      </span>
      <span className={styles.itemContent}>{children}</span>
    </BaseMenu.Item>
  )
);
MenuItem.displayName = 'MenuItem';

export const MenuSeparator = forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <BaseMenu.Separator
      ref={ref}
      className={(state) =>
        classNames(
          styles.separator,
          typeof className === 'function' ? className(state) : className
        )
      }
      {...props}
    />
  )
);
MenuSeparator.displayName = 'MenuSeparator';

export const MenuRoot = (props: MenuRootProps) => <BaseMenu.Root {...props} />;
MenuRoot.displayName = 'MenuRoot';

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  (props, ref) => <BaseMenu.Trigger ref={ref} {...props} />
);
MenuTrigger.displayName = 'MenuTrigger';

export const MenuPortal = (props: MenuPortalProps) => (
  <BaseMenu.Portal {...props} />
);
MenuPortal.displayName = 'MenuPortal';

export const MenuPositioner = forwardRef<HTMLDivElement, MenuPositionerProps>(
  ({ className, children, ...props }, ref) => (
    <BaseMenu.Positioner ref={ref} className={className} {...props}>
      {children}
    </BaseMenu.Positioner>
  )
);
MenuPositioner.displayName = 'MenuPositioner';

export const MenuPopup = forwardRef<HTMLDivElement, MenuPopupProps>(
  ({ className, children, ...props }, ref) => (
    <BaseMenu.Popup
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
    </BaseMenu.Popup>
  )
);
MenuPopup.displayName = 'MenuPopup';

export default Menu;
