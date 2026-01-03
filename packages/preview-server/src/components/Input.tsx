import React from 'react';
import { Box, Text } from 'ink';

export interface InputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  focused?: boolean;
  password?: boolean;
  error?: string;
  width?: number;
}

export function Input({
  label,
  value = '',
  placeholder = '',
  focused = false,
  password = false,
  error,
  width = 24,
}: InputProps) {
  const borderColor = error ? 'red' : focused ? 'cyan' : 'gray';
  const borderStyle = focused ? 'double' : 'round';
  const displayValue = password ? '•'.repeat(value.length) : value;

  return (
    <Box flexDirection="column">
      {label && (
        <Text dimColor>{label}</Text>
      )}
      <Box
        borderStyle={borderStyle}
        borderColor={borderColor}
        width={width}
      >
        <Text>
          {displayValue || <Text dimColor>{placeholder}</Text>}
          {focused && <Text color="cyan">▏</Text>}
        </Text>
      </Box>
      {error && (
        <Text color="red">⚠ {error}</Text>
      )}
    </Box>
  );
}

export default Input;
