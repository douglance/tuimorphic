import React from 'react';
import { render, Box, Text } from 'ink';
import { Card, Input, Toggle, Button, Heading } from '../components/index.js';

function InteractiveDemo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Heading level={1}>TUIMORPHIC</Heading>
      <Text dimColor>Interactive Demo</Text>

      <Card title="Sign In">
        <Box flexDirection="column" gap={1}>
          <Input
            label="Username"
            placeholder="Enter username"
            focused
          />

          <Input
            label="Password"
            placeholder="Enter password"
            password
          />

          <Toggle label="Remember me" />

          <Box gap={1} marginTop={1}>
            <Button variant="primary" focused>Sign In</Button>
            <Button variant="secondary">Cancel</Button>
          </Box>

          <Box flexDirection="column" marginTop={1}>
            <Text dimColor>◇ Forgot password?</Text>
            <Text color="blue">◆ Create account</Text>
          </Box>
        </Box>
      </Card>

      <Text dimColor>Focus: <Text color="cyan">username</Text> │ Tab to navigate</Text>
    </Box>
  );
}

render(<InteractiveDemo />);
