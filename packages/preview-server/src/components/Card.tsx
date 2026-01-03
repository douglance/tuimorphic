import React from 'react';
import { Box, Text } from 'ink';

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  borderStyle?: 'single' | 'double' | 'round' | 'bold' | 'classic';
  borderColor?: string;
  width?: number;
}

export function Card({
  title,
  children,
  borderStyle = 'round',
  borderColor = 'white',
  width,
}: CardProps) {
  return (
    <Box
      flexDirection="column"
      borderStyle={borderStyle}
      borderColor={borderColor}
      width={width}
      paddingX={1}
    >
      {title && (
        <Box marginBottom={1}>
          <Text bold>── {title} ──</Text>
        </Box>
      )}
      <Box flexDirection="column">{children}</Box>
    </Box>
  );
}

export default Card;
