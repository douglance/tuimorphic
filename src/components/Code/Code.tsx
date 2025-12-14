'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './Code.module.scss';

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual variant */
  variant?: 'default' | 'subtle' | 'accent';
  /** Render as keyboard shortcut styling */
  kbd?: boolean;
  /** Code content */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Code component for inline code and keyboard shortcuts.
 * Use CodeBlock for multi-line code snippets.
 *
 * @example
 * <Code>const x = 42</Code>
 * <Code variant="accent">npm install</Code>
 * <Code kbd>Ctrl+C</Code>
 */
export const Code = React.forwardRef<HTMLElement, CodeProps>(function Code(
  { variant = 'default', kbd = false, className, children, ...props },
  ref
) {
  const Component = kbd ? 'kbd' : 'code';

  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      className={classNames(
        styles.code,
        styles[variant],
        kbd && styles.kbd,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Code;
