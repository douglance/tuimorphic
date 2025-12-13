'use client';

import * as React from 'react';
import { classNames } from '@/utils/classNames';
import styles from './CodeBlock.module.scss';

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'onCopy'> {
  /** The code string to display */
  code: string;
  /** Programming language for semantic purposes (does not affect rendering) */
  language?: string;
  /** Whether to show line numbers on the left side */
  showLineNumbers?: boolean;
  /** Starting line number (default: 1) */
  startLineNumber?: number;
  /** Whether to show the copy button */
  showCopyButton?: boolean;
  /** Callback fired when code is copied */
  onCopy?: (code: string) => void;
  /** Additional CSS class names */
  className?: string;
}

/**
 * CodeBlock component for displaying code with terminal aesthetics.
 *
 * Features line numbers (non-selectable), monospace font, and optional
 * copy-to-clipboard functionality. Designed with MS-DOS/terminal aesthetics
 * using box-shadow borders.
 *
 * Based on SRCL (Sacred Computer).
 *
 * @example
 * // Basic code block with line numbers
 * <CodeBlock code="const x = 1;\nconst y = 2;" language="typescript" />
 *
 * @example
 * // Code block without line numbers
 * <CodeBlock code="npm install tuimorphic" showLineNumbers={false} />
 *
 * @example
 * // Code block with copy button and custom start line
 * <CodeBlock
 *   code={codeSnippet}
 *   language="javascript"
 *   showCopyButton
 *   startLineNumber={42}
 *   onCopy={(code) => console.log('Copied:', code)}
 * />
 */
export const CodeBlock = React.forwardRef<HTMLElement, CodeBlockProps>(function CodeBlock(
  {
    code,
    language,
    showLineNumbers = true,
    startLineNumber = 1,
    showCopyButton = false,
    onCopy,
    className,
    ...props
  },
  ref
) {
  const [copyState, setCopyState] = React.useState<'idle' | 'copied' | 'error'>('idle');

  const lines = React.useMemo(() => code.split('\n'), [code]);

  const maxLineNumberWidth = React.useMemo(() => {
    const maxLineNumber = startLineNumber + lines.length - 1;
    return String(maxLineNumber).length;
  }, [lines.length, startLineNumber]);

  const formatLineNumber = React.useCallback(
    (lineIndex: number): string => {
      const lineNumber = startLineNumber + lineIndex;
      return String(lineNumber).padStart(maxLineNumberWidth, '0');
    },
    [startLineNumber, maxLineNumberWidth]
  );

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
      onCopy?.(code);

      // Reset state after 2 seconds
      setTimeout(() => {
        setCopyState('idle');
      }, 2000);
    } catch {
      setCopyState('error');

      // Reset state after 2 seconds
      setTimeout(() => {
        setCopyState('idle');
      }, 2000);
    }
  }, [code, onCopy]);

  const getCopyButtonLabel = (): string => {
    switch (copyState) {
      case 'copied':
        return 'COPIED';
      case 'error':
        return 'ERROR';
      default:
        return 'COPY';
    }
  };

  return (
    <figure ref={ref} className={classNames(styles.root, className)} {...props}>
      {showCopyButton && (
        <div className={styles.toolbar}>
          {language && <span className={styles.language}>{language.toUpperCase()}</span>}
          <button
            type="button"
            className={classNames(
              styles.copyButton,
              copyState === 'copied' && styles.copied,
              copyState === 'error' && styles.error
            )}
            onClick={handleCopy}
            aria-label={`Copy code to clipboard${copyState === 'copied' ? ' - copied!' : ''}`}
          >
            {getCopyButtonLabel()}
          </button>
        </div>
      )}

      <div className={styles.container}>
        {showLineNumbers && (
          <div className={styles.lineNumbers} aria-hidden="true">
            {lines.map((_, index) => (
              <span key={index} className={styles.lineNumber}>
                {formatLineNumber(index)}
              </span>
            ))}
          </div>
        )}

        <pre className={styles.pre}>
          <code className={styles.code} data-language={language}>
            {lines.map((line, index) => (
              <span key={index} className={styles.line}>
                {line}
                {index < lines.length - 1 && '\n'}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </figure>
  );
});

export default CodeBlock;
