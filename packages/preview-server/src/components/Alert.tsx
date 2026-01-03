import React from 'react';
import { Box, Text } from 'ink';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children?: React.ReactNode;
}

const ALERT_CONFIG = {
  info: { color: 'blue', icon: 'ℹ' },
  success: { color: 'green', icon: '✓' },
  warning: { color: 'yellow', icon: '⚠' },
  error: { color: 'red', icon: '✗' },
} as const;

export function Alert({ variant = 'info', title, children }: AlertProps) {
  const config = ALERT_CONFIG[variant];
  const displayTitle = title || variant.charAt(0).toUpperCase() + variant.slice(1);

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={config.color}
      paddingX={1}
    >
      <Box>
        <Text color={config.color} bold>
          {config.icon} {displayTitle}
        </Text>
      </Box>
      {children && (
        <Box>
          <Text dimColor>{children}</Text>
        </Box>
      )}
    </Box>
  );
}

export default Alert;
