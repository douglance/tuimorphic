'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './Text.module.css';

type TextElement = 'p' | 'span' | 'div' | 'strong' | 'em' | 'small' | 'blockquote';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** HTML element to render */
  as?: TextElement;
  /** Visual variant */
  variant?: 'body' | 'secondary' | 'muted' | 'caption';
  /** Font size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Text transform */
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Use monospace font */
  mono?: boolean;
  /** Text content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Text component for body copy and secondary text.
 * Renders semantic HTML with terminal-aesthetic styling.
 *
 * @example
 * <Text>Default body text</Text>
 * <Text variant="secondary">Secondary text</Text>
 * <Text as="span" size="sm" transform="uppercase">Small caps</Text>
 */
export function Text({
  as: Component = 'p',
  variant = 'body',
  size,
  transform,
  align,
  truncate = false,
  mono = true,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={classNames(
        styles.text,
        styles[variant],
        size && styles[`size-${size}`],
        transform && styles[transform],
        align && styles[`align-${align}`],
        truncate && styles.truncate,
        mono && styles.mono,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Text;
