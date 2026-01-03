import React from 'react';
import { render, Box, Text } from 'ink';
import { Progress, Card, Spinner, Heading } from '../components/index.js';

function ProgressDemo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Heading level={2}>Progress Components</Heading>

      <Box flexDirection="column">
        <Text dimColor>Standard Progress:</Text>
        <Box marginLeft={2}>
          <Progress value={75} width={20} color="cyan" />
        </Box>
      </Box>

      <Box flexDirection="column">
        <Text dimColor>Completion States:</Text>
        <Box marginLeft={2} flexDirection="column">
          <Box>
            <Text color="green">✓</Text>
            <Text> Complete   </Text>
            <Progress value={100} width={12} color="green" />
          </Box>
          <Box>
            <Spinner />
            <Text> Loading    </Text>
            <Progress value={45} width={12} color="blue" />
          </Box>
          <Box>
            <Text color="yellow">⚠</Text>
            <Text> Warning    </Text>
            <Progress value={90} width={12} color="yellow" />
          </Box>
        </Box>
      </Box>

      <Card title="Downloads">
        <Box flexDirection="column" gap={1}>
          <Box flexDirection="column">
            <Text dimColor>package.tar.gz</Text>
            <Box>
              <Progress value={100} width={18} color="green" />
              <Text color="green"> ✓</Text>
            </Box>
          </Box>

          <Box flexDirection="column">
            <Text dimColor>assets.zip</Text>
            <Box>
              <Progress value={67} width={18} color="cyan" />
              <Text> </Text>
              <Spinner />
            </Box>
          </Box>

          <Box flexDirection="column">
            <Text dimColor>backup.sql</Text>
            <Box>
              <Progress value={23} width={18} color="yellow" />
              <Text dimColor> ◌</Text>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

render(<ProgressDemo />);
