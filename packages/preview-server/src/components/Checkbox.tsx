import React from 'react';
import { Text } from 'ink';

export interface CheckboxProps {
  label: string;
  checked?: boolean;
  focused?: boolean;
}

export function Checkbox({ label, checked = false, focused = false }: CheckboxProps) {
  const box = checked ? '☑' : '☐';
  const boxColor = checked ? 'green' : 'gray';

  return (
    <Text color={focused ? 'cyan' : undefined}>
      <Text color={boxColor}>{box}</Text>
      {' '}{label}
    </Text>
  );
}

export default Checkbox;
