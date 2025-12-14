'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './Heading.module.scss';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (1-6), maps to h1-h6 */
  level?: HeadingLevel;
  /** Add terminal-style box-drawing decorations */
  decorated?: boolean;
  /** Decoration style */
  decorationStyle?: 'double' | 'single' | 'arrow';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Text transform */
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  /** Use hero styling with wide letter spacing */
  hero?: boolean;
  /** Heading content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

const DECORATIONS = {
  double: { left: '═══', right: '═══' },
  single: { left: '───', right: '───' },
  arrow: { left: '>>>', right: '<<<' },
} as const;

/**
 * Heading component for titles and section headers.
 * Supports terminal-style decorations with box-drawing characters.
 *
 * @example
 * <Heading level={1}>Main Title</Heading>
 * <Heading level={2} decorated>Section Title</Heading>
 * <Heading level={3} decorated decorationStyle="arrow">Subsection</Heading>
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(
    {
      level = 2,
      decorated = false,
      decorationStyle = 'double',
      align,
      transform = 'uppercase',
      hero = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    const Component = `h${level}` as const;
    const decoration = DECORATIONS[decorationStyle];

    const content = decorated ? (
      <>
        <span className={styles.decoration} aria-hidden="true">
          {decoration.left}
        </span>
        <span className={styles.content}>{children}</span>
        <span className={styles.decoration} aria-hidden="true">
          {decoration.right}
        </span>
      </>
    ) : (
      children
    );

    return (
      <Component
        ref={ref}
        className={classNames(
          styles.heading,
          styles[`level-${level}`],
          decorated && styles.decorated,
          align && styles[`align-${align}`],
          transform && transform !== 'none' && styles[transform],
          hero && styles.hero,
          className
        )}
        {...props}
      >
        {content}
      </Component>
    );
  }
);

export default Heading;
