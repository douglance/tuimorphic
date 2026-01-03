import React from 'react';
import { Box, Text } from 'ink';

export interface HeadingProps {
  children: string;
  level?: 1 | 2 | 3;
  color?: string;
}

export function Heading({ children, level = 1, color = 'cyan' }: HeadingProps) {
  if (level === 1) {
    return (
      <Box borderStyle="double" borderColor={color} paddingX={2}>
        <Text bold color={color}>{children}</Text>
      </Box>
    );
  }

  if (level === 2) {
    return (
      <Text bold color={color}>┌─ {children} ─┐</Text>
    );
  }

  return (
    <Text bold color={color}>── {children} ──</Text>
  );
}

export default Heading;
