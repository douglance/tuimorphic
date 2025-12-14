'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './CardDouble.module.css';

export interface CardDoubleProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Title displayed in the card header */
  title?: string;
  /** Left corner label text */
  leftCorner?: string;
  /** Right corner label text */
  rightCorner?: string;
  /** Card content */
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface CardDoubleInnerProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Title displayed in the inner card header */
  title?: string;
  /** Inner card content */
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * CardDouble component with MS-DOS terminal aesthetics and double-line borders.
 *
 * Features double-border styling and configurable corner labels for a nested
 * appearance. Use CardDoubleInner for multi-level nesting.
 *
 * Based on SRCL (Sacred Computer).
 *
 * @example
 * <CardDouble title="SYSTEM INFO" leftCorner="[1]" rightCorner="[X]">
 *   <p>System status: OK</p>
 * </CardDouble>
 *
 * @example
 * <CardDouble title="MAIN WINDOW">
 *   <CardDoubleInner title="NESTED SECTION">
 *     <p>Nested content</p>
 *   </CardDoubleInner>
 * </CardDouble>
 */
export const CardDouble = React.forwardRef<HTMLElement, CardDoubleProps>(function CardDouble(
  { title, leftCorner, rightCorner, children, className, style, ...props },
  ref
) {
  const renderHeader = () => {
    if (!title && !leftCorner && !rightCorner) return null;

    const hasLeftCornerLabel = Boolean(leftCorner);
    const hasRightCornerLabel = Boolean(rightCorner);

    return (
      <header className={styles.action}>
        <div
          className={hasLeftCornerLabel ? styles.leftCorner : styles.left}
          aria-hidden={!hasLeftCornerLabel}
        >
          {hasLeftCornerLabel && <span className={styles.cornerLabel}>{leftCorner}</span>}
        </div>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div
          className={hasRightCornerLabel ? styles.rightCorner : styles.right}
          aria-hidden={!hasRightCornerLabel}
        >
          {hasRightCornerLabel && <span className={styles.cornerLabel}>{rightCorner}</span>}
        </div>
      </header>
    );
  };

  return (
    <article
      ref={ref}
      className={classNames(styles.card, className)}
      style={style}
      {...props}
    >
      {renderHeader()}
      <section className={styles.children}>
        <div className={styles.borderChildren}>{children}</div>
      </section>
    </article>
  );
});

/**
 * CardDoubleInner component for nesting inside CardDouble.
 *
 * Provides an additional level of nesting with its own title and content area.
 *
 * Based on SRCL (Sacred Computer).
 *
 * @example
 * <CardDouble title="OUTER">
 *   <CardDoubleInner title="INNER">
 *     <p>Nested content</p>
 *   </CardDoubleInner>
 * </CardDouble>
 */
export const CardDoubleInner = React.forwardRef<HTMLElement, CardDoubleInnerProps>(
  function CardDoubleInner({ title, children, className, style, ...props }, ref) {
    return (
      <article
        ref={ref}
        className={classNames(styles.innerCard, className)}
        style={style}
        {...props}
      >
        {title && (
          <header className={styles.innerAction}>
            <div className={styles.innerLeft} aria-hidden="true" />
            <h3 className={styles.innerTitle}>{title}</h3>
            <div className={styles.innerRight} aria-hidden="true" />
          </header>
        )}
        <section className={styles.innerChildren}>{children}</section>
      </article>
    );
  }
);

export default CardDouble;
