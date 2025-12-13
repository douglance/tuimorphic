'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './BreadCrumbs.module.scss';

export interface BreadCrumbItem {
  /** Display label for the breadcrumb */
  label: string;
  /** URL to navigate to when clicked */
  href?: string;
  /** Click handler for custom navigation logic */
  onClick?: () => void;
}

export interface BreadCrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of breadcrumb items to display */
  items: BreadCrumbItem[];
  /** Separator element between breadcrumb items (default: "❯") */
  separator?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * BreadCrumbs component for hierarchical navigation paths.
 *
 * Displays a navigation path as linked text segments separated by chevron symbols.
 * The last item represents the current page and is non-clickable.
 * Built with SRCL terminal aesthetics and monospace font.
 *
 * @example
 * <BreadCrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Widget' }
 *   ]}
 * />
 *
 * @example
 * // With custom separator
 * <BreadCrumbs
 *   items={[
 *     { label: 'Root', onClick: () => navigate('/') },
 *     { label: 'Section', onClick: () => navigate('/section') },
 *     { label: 'Current' }
 *   ]}
 *   separator="/"
 * />
 */
export const BreadCrumbs = React.forwardRef<HTMLElement, BreadCrumbsProps>(
  function BreadCrumbs(
    { items, separator = '❯', className, ...props },
    ref
  ) {
    if (items.length === 0) {
      return null;
    }

    const renderBreadcrumbItem = (
      item: BreadCrumbItem,
      index: number,
      isLast: boolean
    ): React.ReactNode => {
      const { label, href, onClick } = item;
      const isClickable = !isLast && (href !== undefined || onClick !== undefined);

      if (isClickable) {
        if (href !== undefined) {
          return (
            <a
              key={index}
              href={href}
              className={styles.link}
              onClick={onClick}
            >
              {label}
            </a>
          );
        }

        return (
          <button
            key={index}
            type="button"
            className={styles.link}
            onClick={onClick}
          >
            {label}
          </button>
        );
      }

      return (
        <span
          key={index}
          className={classNames(styles.item, isLast && styles.current)}
          aria-current={isLast ? 'page' : undefined}
        >
          {label}
        </span>
      );
    };

    return (
      <nav
        ref={ref}
        className={classNames(styles.root, className)}
        aria-label="Breadcrumb"
        {...props}
      >
        <ol className={styles.list}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className={styles.listItem}>
                {renderBreadcrumbItem(item, index, isLast)}
                {!isLast && (
                  <span className={styles.separator} aria-hidden="true">
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

export default BreadCrumbs;
