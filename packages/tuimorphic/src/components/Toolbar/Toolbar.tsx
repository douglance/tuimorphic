'use client';

import * as React from 'react';
import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import { classNames } from '@/utils/classNames';
import styles from './Toolbar.module.css';

export interface ToolbarProps {
  /** Orientation of the toolbar */
  orientation?: 'horizontal' | 'vertical';
  /** Whether keyboard navigation loops from end to start */
  loopFocus?: boolean;
  /** Toolbar content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface ToolbarButtonProps {
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Button content */
  children?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class names */
  className?: string;
}

export interface ToolbarLinkProps {
  /** Link destination */
  href: string;
  /** Link content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface ToolbarSeparatorProps {
  /** Additional CSS class names */
  className?: string;
}

export interface ToolbarGroupProps {
  /** Group content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Toolbar component for grouping related controls.
 *
 * @example
 * <Toolbar>
 *   <ToolbarButton onClick={() => console.log('Bold')}>B</ToolbarButton>
 *   <ToolbarButton onClick={() => console.log('Italic')}>I</ToolbarButton>
 *   <ToolbarSeparator />
 *   <ToolbarLink href="/help">Help</ToolbarLink>
 * </Toolbar>
 */
export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  function Toolbar(
    { orientation = 'horizontal', loopFocus = true, children, className },
    ref
  ) {
    return (
      <BaseToolbar.Root
        ref={ref}
        orientation={orientation}
        loopFocus={loopFocus}
        className={classNames(styles.root, styles[orientation], className)}
      >
        {children}
      </BaseToolbar.Root>
    );
  }
);
Toolbar.displayName = 'Toolbar';

/**
 * ToolbarButton component for toolbar actions.
 */
export const ToolbarButton = React.forwardRef<
  HTMLButtonElement,
  ToolbarButtonProps
>(function ToolbarButton({ disabled, children, onClick, className }, ref) {
  return (
    <BaseToolbar.Button
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      className={classNames(styles.button, className)}
    >
      {children}
    </BaseToolbar.Button>
  );
});
ToolbarButton.displayName = 'ToolbarButton';

/**
 * ToolbarLink component for navigation within the toolbar.
 */
export const ToolbarLink = React.forwardRef<HTMLAnchorElement, ToolbarLinkProps>(
  function ToolbarLink({ href, children, className }, ref) {
    return (
      <BaseToolbar.Link
        ref={ref}
        href={href}
        className={classNames(styles.link, className)}
      >
        {children}
      </BaseToolbar.Link>
    );
  }
);
ToolbarLink.displayName = 'ToolbarLink';

/**
 * ToolbarSeparator component for visual separation of toolbar items.
 */
export function ToolbarSeparator({ className }: ToolbarSeparatorProps) {
  return (
    <BaseToolbar.Separator className={classNames(styles.separator, className)} />
  );
}

/**
 * ToolbarGroup component for logically grouping toolbar items.
 */
export function ToolbarGroup({ children, className }: ToolbarGroupProps) {
  return (
    <BaseToolbar.Group className={classNames(styles.group, className)}>
      {children}
    </BaseToolbar.Group>
  );
}

export default Toolbar;
