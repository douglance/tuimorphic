import React from 'react';
import { Box, Text } from 'ink';

export interface ButtonProps {
  children: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  focused?: boolean;
}

export function Button({ children, variant = 'secondary', focused = false }: ButtonProps) {
  if (variant === 'ghost') {
    return (
      <Text dimColor={!focused} color={focused ? 'cyan' : undefined}>
        {'‹ '}{children}{' ›'}
      </Text>
    );
  }

  const isPrimary = variant === 'primary';
  const borderColor = focused ? 'cyan' : isPrimary ? 'cyan' : 'gray';

  return (
    <Box borderStyle="round" borderColor={borderColor}>
      <Text inverse={isPrimary || focused} bold={isPrimary || focused}>
        {' '}{children}{' '}
      </Text>
    </Box>
  );
}

export default Button;
