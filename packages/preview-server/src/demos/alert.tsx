import React from 'react';
import { render, Box, Text } from 'ink';
import { Alert, Heading } from '../components/index.js';

function AlertDemo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Heading level={2}>Alert Components</Heading>

      <Alert variant="info" title="Information">
        Helpful information here.
      </Alert>

      <Alert variant="success" title="Success">
        Operation completed.
      </Alert>

      <Alert variant="warning" title="Warning">
        Proceed with caution.
      </Alert>

      <Alert variant="error" title="Error">
        Something went wrong.
      </Alert>
    </Box>
  );
}

render(<AlertDemo />);
