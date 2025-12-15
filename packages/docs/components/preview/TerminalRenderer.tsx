'use client';

import * as React from 'react';

/**
 * Mock terminal rendering components.
 * These simulate what React Ink components would produce,
 * without requiring Node.js dependencies.
 *
 * This serves as both:
 * 1. A preview system for development
 * 2. A blueprint for actual tuimorphic-ink components
 */

// ANSI color codes
const COLORS: Record<string, string> = {
  black: '#000000',
  red: '#ff5555',
  green: '#50fa7b',
  yellow: '#f1fa8c',
  blue: '#6272a4',
  magenta: '#ff79c6',
  cyan: '#8be9fd',
  white: '#f8f8f2',
  brightBlack: '#6272a4',
  brightRed: '#ff6e6e',
  brightGreen: '#69ff94',
  brightYellow: '#ffffa5',
  brightBlue: '#d6acff',
  brightMagenta: '#ff92df',
  brightCyan: '#a4ffff',
  brightWhite: '#ffffff',
  default: '#e0e0e0',
};

// Box drawing characters
const BOX = {
  single: {
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
    horizontal: '─',
    vertical: '│',
  },
  double: {
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
    horizontal: '═',
    vertical: '║',
  },
  round: {
    topLeft: '╭',
    topRight: '╮',
    bottomLeft: '╰',
    bottomRight: '╯',
    horizontal: '─',
    vertical: '│',
  },
};

interface TerminalTextProps {
  children: React.ReactNode;
  color?: keyof typeof COLORS;
  bold?: boolean;
  dim?: boolean;
  inverse?: boolean;
}

export function TerminalText({
  children,
  color = 'default',
  bold = false,
  dim = false,
  inverse = false,
}: TerminalTextProps) {
  const style: React.CSSProperties = {
    color: COLORS[color] || COLORS.default,
    fontWeight: bold ? 'bold' : 'normal',
    opacity: dim ? 0.5 : 1,
  };

  if (inverse) {
    style.backgroundColor = style.color;
    style.color = '#0a0a0a';
    style.padding = '0 2px';
  }

  return <span style={style}>{children}</span>;
}

interface TerminalBoxProps {
  children: React.ReactNode;
  borderStyle?: 'single' | 'double' | 'round' | 'none';
  borderColor?: keyof typeof COLORS;
  width?: number;
  padding?: number;
  title?: string;
}

export function TerminalBox({
  children,
  borderStyle = 'single',
  borderColor = 'default',
  width,
  padding = 1,
  title,
}: TerminalBoxProps) {
  if (borderStyle === 'none') {
    return (
      <div style={{ padding: `0 ${padding}ch` }}>
        {children}
      </div>
    );
  }

  const box = BOX[borderStyle];
  const color = COLORS[borderColor] || COLORS.default;
  const innerWidth = width ? width - 2 : undefined;
  const paddingStr = ' '.repeat(padding);

  // Convert children to string content for proper rendering
  const content = React.Children.toArray(children);

  return (
    <div style={{ fontFamily: 'monospace', whiteSpace: 'pre', color }}>
      {/* Top border with optional title */}
      <div>
        <span style={{ color }}>{box.topLeft}</span>
        {title ? (
          <>
            <span style={{ color }}>{box.horizontal}</span>
            <span style={{ color: COLORS.default }}>{title}</span>
            <span style={{ color }}>
              {box.horizontal.repeat(Math.max(0, (innerWidth || 20) - title.length - 2))}
            </span>
          </>
        ) : (
          <span style={{ color }}>
            {box.horizontal.repeat(innerWidth || 20)}
          </span>
        )}
        <span style={{ color }}>{box.topRight}</span>
      </div>

      {/* Content with side borders */}
      <div>
        <span style={{ color }}>{box.vertical}</span>
        <span>{paddingStr}</span>
        <span style={{ color: COLORS.default }}>{content}</span>
        <span>{paddingStr}</span>
        <span style={{ color }}>{box.vertical}</span>
      </div>

      {/* Bottom border */}
      <div>
        <span style={{ color }}>{box.bottomLeft}</span>
        <span style={{ color }}>
          {box.horizontal.repeat(innerWidth || 20)}
        </span>
        <span style={{ color }}>{box.bottomRight}</span>
      </div>
    </div>
  );
}

interface TerminalProgressProps {
  value: number;
  width?: number;
  showLabel?: boolean;
  color?: keyof typeof COLORS;
}

export function TerminalProgress({
  value,
  width = 20,
  showLabel = true,
  color = 'green',
}: TerminalProgressProps) {
  const filled = Math.floor((value / 100) * width);
  const empty = width - filled;

  return (
    <span style={{ fontFamily: 'monospace' }}>
      <span style={{ color: COLORS.default }}>[</span>
      <span style={{ color: COLORS[color] }}>{'█'.repeat(filled)}</span>
      <span style={{ color: COLORS.brightBlack }}>{'░'.repeat(empty)}</span>
      <span style={{ color: COLORS.default }}>]</span>
      {showLabel && (
        <span style={{ color: COLORS.default }}> {value}%</span>
      )}
    </span>
  );
}

interface TerminalBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export function TerminalBadge({
  children,
  variant = 'default',
}: TerminalBadgeProps) {
  const colorMap: Record<string, keyof typeof COLORS> = {
    default: 'default',
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'blue',
  };

  const color = colorMap[variant] || 'default';

  return (
    <span style={{ color: COLORS[color], fontFamily: 'monospace' }}>
      [{children}]
    </span>
  );
}

interface TerminalAlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
}

export function TerminalAlert({
  children,
  variant = 'info',
  title,
}: TerminalAlertProps) {
  const colorMap: Record<string, keyof typeof COLORS> = {
    info: 'blue',
    success: 'green',
    warning: 'yellow',
    error: 'red',
  };

  const iconMap: Record<string, string> = {
    info: 'ℹ',
    success: '✓',
    warning: '⚠',
    error: '✗',
  };

  const color = colorMap[variant];
  const icon = iconMap[variant];

  return (
    <TerminalBox borderStyle="single" borderColor={color} width={40}>
      <div style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
        <TerminalText color={color} bold>
          {icon} {title || variant.toUpperCase()}
        </TerminalText>
        <br />
        <TerminalText>{children}</TerminalText>
      </div>
    </TerminalBox>
  );
}

interface TerminalButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  focused?: boolean;
}

export function TerminalButton({
  children,
  variant = 'default',
  focused = false,
}: TerminalButtonProps) {
  if (variant === 'ghost') {
    return (
      <span style={{ fontFamily: 'monospace' }}>
        <TerminalText inverse={focused}>
          {focused ? '> ' : '  '}{children}{focused ? ' <' : '  '}
        </TerminalText>
      </span>
    );
  }

  return (
    <TerminalBox
      borderStyle="single"
      borderColor={focused ? 'cyan' : 'default'}
      padding={1}
    >
      <TerminalText bold={focused} inverse={focused && variant === 'default'}>
        {children}
      </TerminalText>
    </TerminalBox>
  );
}

interface TerminalInputProps {
  value?: string;
  placeholder?: string;
  label?: string;
  focused?: boolean;
}

export function TerminalInput({
  value = '',
  placeholder = '',
  label,
  focused = false,
}: TerminalInputProps) {
  const displayValue = value || placeholder;
  const isPlaceholder = !value && placeholder;

  return (
    <div style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
      {label && (
        <div>
          <TerminalText>{label}</TerminalText>
        </div>
      )}
      <TerminalBox
        borderStyle="single"
        borderColor={focused ? 'cyan' : 'default'}
        padding={1}
      >
        <TerminalText dim={isPlaceholder}>
          {displayValue}
          {focused && <span style={{ animation: 'blink 1s infinite' }}>▌</span>}
        </TerminalText>
      </TerminalBox>
    </div>
  );
}

interface TerminalCheckboxProps {
  checked?: boolean;
  label?: string;
  focused?: boolean;
}

export function TerminalCheckbox({
  checked = false,
  label,
  focused = false,
}: TerminalCheckboxProps) {
  return (
    <span style={{ fontFamily: 'monospace' }}>
      <TerminalText color={focused ? 'cyan' : 'default'}>
        [{checked ? 'x' : ' '}]
      </TerminalText>
      {label && (
        <TerminalText> {label}</TerminalText>
      )}
    </span>
  );
}

// Export all components
export const Terminal = {
  Text: TerminalText,
  Box: TerminalBox,
  Progress: TerminalProgress,
  Badge: TerminalBadge,
  Alert: TerminalAlert,
  Button: TerminalButton,
  Input: TerminalInput,
  Checkbox: TerminalCheckbox,
};

export default Terminal;
