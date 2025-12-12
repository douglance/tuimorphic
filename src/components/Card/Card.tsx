'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './Card.module.scss';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Title displayed in the card header */
  title?: React.ReactNode;
  /** Title alignment mode */
  mode?: 'left' | 'right' | 'center';
  /** Card content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Card component with MS-DOS terminal aesthetics.
 *
 * Features box-shadow borders and configurable title positioning.
 *
 * Based on SRCL (Sacred Computer).
 *
 * @example
 * <Card title="LOGIN">
 *   <Input label="Username" />
 *   <Button>Submit</Button>
 * </Card>
 *
 * @example
 * <Card title="SETTINGS" mode="left">
 *   <p>Content here</p>
 * </Card>
 */
export const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  { title, mode = 'center', children, className, style, ...props },
  ref
) {
  const renderHeader = () => {
    if (!title) return null;

    if (mode === 'left') {
      return (
        <header className={styles.action}>
          <div className={styles.leftCorner} aria-hidden="true">
            ┌
          </div>
          <div className={styles.left}>
            <span className={styles.title}>{title}</span>
          </div>
        </header>
      );
    }

    if (mode === 'right') {
      return (
        <header className={styles.action}>
          <div className={styles.right}>
            <span className={styles.title}>{title}</span>
          </div>
          <div className={styles.rightCorner} aria-hidden="true">
            ┐
          </div>
        </header>
      );
    }

    // Center mode (default)
    return (
      <header className={styles.action}>
        <div className={styles.left} aria-hidden="true" />
        <span className={styles.title}>{title}</span>
        <div className={styles.right} aria-hidden="true" />
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
      <div className={styles.children}>{children}</div>
    </article>
  );
});

export default Card;
