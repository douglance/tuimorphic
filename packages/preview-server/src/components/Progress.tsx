import React from 'react';
import { Box, Text } from 'ink';

export interface ProgressProps {
  value: number; // 0-100
  width?: number;
  color?: string;
  showPercent?: boolean;
  label?: string;
}

export function Progress({
  value,
  width = 20,
  color = 'green',
  showPercent = true,
  label,
}: ProgressProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const filled = Math.floor((clampedValue / 100) * width);
  const empty = width - filled;

  const filledBar = '█'.repeat(filled);
  const emptyBar = '░'.repeat(empty);

  return (
    <Box>
      {label && (
        <Box marginRight={1}>
          <Text dimColor>{label}</Text>
        </Box>
      )}
      <Text color={color}>{filledBar}</Text>
      <Text color="gray">{emptyBar}</Text>
      {showPercent && (
        <Text> {clampedValue.toString().padStart(3)}%</Text>
      )}
    </Box>
  );
}

export default Progress;
