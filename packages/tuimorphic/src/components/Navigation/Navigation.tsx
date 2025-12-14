'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './Navigation.module.css';

export interface NavItem {
  /** Display label for the navigation item */
  label: string;
  /** URL for anchor-based navigation */
  href?: string;
  /** Click handler for programmatic navigation */
  onClick?: () => void;
  /** Whether this item represents the current page */
  isActive?: boolean;
}

export interface NavigationProps {
  /** Logo or brand element displayed on the left */
  logo?: React.ReactNode;
  /** Navigation items displayed center-left */
  items?: NavItem[];
  /** Action elements (search, user menu, etc.) displayed on the right */
  actions?: React.ReactNode;
  /** Whether to show bottom border separator */
  showBorder?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Navigation component for top-level destination switching.
 *
 * Provides a horizontal bar with logo on left, nav items center-left,
 * and utility actions on the right. Styled with terminal aesthetics
 * and monospace typography.
 *
 * Based on SRCL (Sacred Computer).
 *
 * @example Basic usage
 * ```tsx
 * <Navigation
 *   logo={<span>ACME</span>}
 *   items={[
 *     { label: 'Home', href: '/', isActive: true },
 *     { label: 'About', href: '/about' },
 *     { label: 'Contact', href: '/contact' },
 *   ]}
 * />
 * ```
 *
 * @example With actions
 * ```tsx
 * <Navigation
 *   logo={<span>APP</span>}
 *   items={[
 *     { label: 'Dashboard', href: '/dashboard', isActive: true },
 *     { label: 'Settings', href: '/settings' },
 *   ]}
 *   actions={
 *     <>
 *       <Button variant="secondary">Login</Button>
 *       <Button variant="primary">Sign Up</Button>
 *     </>
 *   }
 * />
 * ```
 *
 * @example With click handlers
 * ```tsx
 * <Navigation
 *   logo={<Logo />}
 *   items={[
 *     { label: 'Home', onClick: () => navigate('/'), isActive: true },
 *     { label: 'Products', onClick: () => navigate('/products') },
 *   ]}
 * />
 * ```
 */
export const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  function Navigation(
    { logo, items = [], actions, showBorder = true, className },
    ref
  ) {
    return (
      <nav
        ref={ref}
        className={classNames(
          styles.root,
          showBorder && styles.bordered,
          className
        )}
      >
        {logo && <div className={styles.logo}>{logo}</div>}

        {items.length > 0 && (
          <ul className={styles.items} role="menubar">
            {items.map((item, index) => (
              <li key={`${item.label}-${index}`} role="none">
                <NavItemElement item={item} />
              </li>
            ))}
          </ul>
        )}

        {actions && <div className={styles.actions}>{actions}</div>}
      </nav>
    );
  }
);

interface NavItemElementProps {
  item: NavItem;
}

/**
 * Internal component for rendering individual navigation items.
 * Renders as anchor when href is provided, otherwise as button.
 */
function NavItemElement({ item }: NavItemElementProps): React.ReactElement {
  const { label, href, onClick, isActive } = item;

  const itemClassName = classNames(styles.item, isActive && styles.active);

  if (href) {
    return (
      <a
        href={href}
        className={itemClassName}
        role="menuitem"
        aria-current={isActive ? 'page' : undefined}
        onClick={onClick}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={itemClassName}
      role="menuitem"
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Navigation;
