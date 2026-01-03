import React, { useState, useEffect } from 'react';
import { Text } from 'ink';

export interface SpinnerProps {
  label?: string;
  color?: string;
}

const FRAMES = ['◐', '◓', '◑', '◒'];

export function Spinner({ label, color = 'cyan' }: SpinnerProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((f) => (f + 1) % FRAMES.length);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <Text>
      <Text color={color}>{FRAMES[frame]}</Text>
      {label && <Text> {label}</Text>}
    </Text>
  );
}

export default Spinner;
