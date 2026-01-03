import React from 'react';
import { render, Box, Text } from 'ink';
import { Button, Heading } from '../components/index.js';

function ButtonDemo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Heading level={2}>Button Components</Heading>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Primary:</Text>
        <Button variant="primary">Click Me</Button>
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Secondary:</Text>
        <Button variant="secondary">Cancel</Button>
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Ghost:</Text>
        <Button variant="ghost">Learn More</Button>
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Button Group:</Text>
        <Box gap={1}>
          <Button variant="primary" focused>Save</Button>
          <Button variant="secondary">Reset</Button>
          <Button variant="secondary">Cancel</Button>
        </Box>
      </Box>

      <Text dimColor>Clicks: <Text color="cyan">0</Text></Text>
    </Box>
  );
}

render(<ButtonDemo />);
