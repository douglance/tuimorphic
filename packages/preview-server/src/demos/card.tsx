import React from 'react';
import { render, Box, Text } from 'ink';
import { Card, Badge, Progress, Heading } from '../components/index.js';

function CardDemo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Heading level={2}>Card Components</Heading>

      <Card title="Basic Card">
        <Text>This is a simple card with a</Text>
        <Text>rounded border and title.</Text>
        <Text> </Text>
        <Text dimColor>Cards group related content.</Text>
      </Card>

      <Card title="Status Badges">
        <Box gap={2}>
          <Badge color="green">Online</Badge>
          <Badge color="yellow">Away</Badge>
          <Badge color="red">Offline</Badge>
        </Box>
        <Text> </Text>
        <Box gap={2}>
          <Badge color="blue">New</Badge>
          <Badge color="cyan">Updated</Badge>
          <Badge color="gray" variant="outline">Draft</Badge>
        </Box>
      </Card>

      <Card title="Stats" borderStyle="double">
        <Box flexDirection="column" gap={1}>
          <Box>
            <Text>Downloads  </Text>
            <Progress value={80} width={10} color="cyan" showPercent={false} />
            <Text color="cyan">  12,453</Text>
          </Box>
          <Box>
            <Text>Stars      </Text>
            <Text color="yellow">★★★★☆</Text>
            <Text>      </Text>
            <Text color="yellow">847</Text>
          </Box>
          <Box>
            <Text>Forks      </Text>
            <Progress value={50} width={10} color="green" showPercent={false} />
            <Text color="green">  234</Text>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

render(<CardDemo />);
