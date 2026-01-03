import React from 'react';
import { Text } from 'ink';

export interface BadgeProps {
  children: string;
  color?: string;
  variant?: 'filled' | 'outline';
}

export function Badge({ children, color = 'gray', variant = 'filled' }: BadgeProps) {
  if (variant === 'outline') {
    return <Text color={color}>◇ {children}</Text>;
  }

  return <Text color={color}>● {children}</Text>;
}

export default Badge;
