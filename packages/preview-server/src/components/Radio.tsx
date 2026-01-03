import React from 'react';
import { Text } from 'ink';

export interface RadioProps {
  label: string;
  selected?: boolean;
  focused?: boolean;
}

export function Radio({ label, selected = false, focused = false }: RadioProps) {
  const radio = selected ? '◉' : '○';
  const radioColor = selected ? 'cyan' : 'gray';

  return (
    <Text color={focused ? 'cyan' : undefined}>
      <Text color={radioColor}>{radio}</Text>
      {' '}{label}
    </Text>
  );
}

export default Radio;
