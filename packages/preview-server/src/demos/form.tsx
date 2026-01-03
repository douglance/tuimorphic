import React from 'react';
import { render, Box, Text } from 'ink';
import { Card, Input, Checkbox, Radio, Button, Heading } from '../components/index.js';

function FormDemo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Heading level={2}>Form Components</Heading>

      <Card title="Create Account">
        <Box flexDirection="column" gap={1}>
          <Input
            label="Full Name"
            value="Jane Doe"
            focused
          />

          <Input
            label="Email"
            placeholder="Enter email..."
          />

          <Input
            label="Password"
            value="password"
            password
            error="Too weak"
          />

          <Box flexDirection="column">
            <Text dimColor>Notification Preferences:</Text>
            <Checkbox label="Email updates" checked />
            <Checkbox label="SMS alerts" />
          </Box>

          <Box flexDirection="column">
            <Text dimColor>Account Type:</Text>
            <Radio label="Personal" selected />
            <Radio label="Business" />
          </Box>

          <Box gap={1} marginTop={1}>
            <Button variant="primary">Submit</Button>
            <Button variant="secondary">Cancel</Button>
          </Box>
        </Box>
      </Card>

      <Text dimColor>Tab to navigate • Enter to submit</Text>
    </Box>
  );
}

render(<FormDemo />);
