import React from 'react';
import { Text } from 'ink';

export interface ToggleProps {
  label: string;
  checked?: boolean;
  focused?: boolean;
}

export function Toggle({ label, checked = false, focused = false }: ToggleProps) {
  const toggle = checked ? '◉──●' : '●──○';
  const toggleColor = checked ? 'green' : 'gray';

  return (
    <Text color={focused ? 'cyan' : undefined}>
      <Text color={toggleColor}>{toggle}</Text>
      {' '}{label}
    </Text>
  );
}

export default Toggle;
