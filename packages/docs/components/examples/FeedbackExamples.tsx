'use client';

import { useState, useEffect } from 'react';
import {
  Alert,
  Badge,
  Progress,
  BarLoader,
  BlockLoader,
  Tooltip,
  Button,
  Message,
  MessageList,
} from 'tuimorphic';

// =============================================================================
// Alert Examples
// =============================================================================

export function AlertBasic() {
  return <Alert>This is a default alert message.</Alert>;
}

export function AlertVariants() {
  return (
    <div className="flex flex-col gap-4">
      <Alert variant="default">Default alert message</Alert>
      <Alert variant="success">Success! Operation completed.</Alert>
      <Alert variant="warning">Warning: Please review before continuing.</Alert>
      <Alert variant="error">Error: Something went wrong.</Alert>
      <Alert variant="info">Info: Here is some useful information.</Alert>
    </div>
  );
}

export function AlertWithTitle() {
  return (
    <div className="flex flex-col gap-4">
      <Alert variant="success" title="Success">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="error" title="Error">
        Failed to connect to the server. Please try again.
      </Alert>
      <Alert variant="warning" title="Warning">
        Your session will expire in 5 minutes.
      </Alert>
    </div>
  );
}

export function AlertDismissible() {
  const [alerts, setAlerts] = useState({
    success: true,
    warning: true,
    error: true,
  });

  const resetAlerts = () => {
    setAlerts({ success: true, warning: true, error: true });
  };

  return (
    <div className="flex flex-col gap-4">
      {alerts.success && (
        <Alert
          variant="success"
          title="Success"
          dismissible
          onDismiss={() => setAlerts((prev) => ({ ...prev, success: false }))}
        >
          Click the X to dismiss this alert.
        </Alert>
      )}
      {alerts.warning && (
        <Alert
          variant="warning"
          title="Warning"
          dismissible
          onDismiss={() => setAlerts((prev) => ({ ...prev, warning: false }))}
        >
          This warning can also be dismissed.
        </Alert>
      )}
      {alerts.error && (
        <Alert
          variant="error"
          title="Error"
          dismissible
          onDismiss={() => setAlerts((prev) => ({ ...prev, error: false }))}
        >
          Errors can be dismissed too.
        </Alert>
      )}
      {!alerts.success && !alerts.warning && !alerts.error && (
        <Button onClick={resetAlerts}>Reset Alerts</Button>
      )}
    </div>
  );
}

// =============================================================================
// Badge Examples
// =============================================================================

export function BadgeBasic() {
  return <Badge>Default</Badge>;
}

export function BadgeVariants() {
  return (
    <div className="flex gap-4 flex-wrap items-center">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  );
}

// =============================================================================
// Progress Examples
// =============================================================================

export function ProgressBasic() {
  return <Progress value={50} />;
}

export function ProgressWithLabel() {
  return (
    <div className="flex flex-col gap-4">
      <Progress value={25} showLabel />
      <Progress value={50} showLabel />
      <Progress value={75} showLabel />
      <Progress value={100} showLabel />
    </div>
  );
}

export function ProgressAnimated() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <Progress value={progress} showLabel />;
}

export function ProgressCustomChars() {
  return (
    <div className="flex flex-col gap-4">
      <Progress value={60} fillChar="=" emptyChar="-" />
      <Progress value={60} fillChar="#" emptyChar="." />
      <Progress value={60} fillChar="*" emptyChar="_" />
      <Progress value={60} fillChar=">" emptyChar=" " />
    </div>
  );
}

// =============================================================================
// Loader Examples
// =============================================================================

export function LoaderBar() {
  return <BarLoader />;
}

export function LoaderBarDeterminate() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return <BarLoader progress={progress} />;
}

export function LoaderBlock() {
  return <BlockLoader />;
}

export function LoaderBlockModes() {
  return (
    <div className="flex gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <BlockLoader mode={1} />
        <span className="text-xs">Mode 1</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BlockLoader mode={5} />
        <span className="text-xs">Mode 5</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BlockLoader mode={11} />
        <span className="text-xs">Mode 11</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BlockLoader mode={3} />
        <span className="text-xs">Mode 3</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BlockLoader mode={10} />
        <span className="text-xs">Mode 10</span>
      </div>
    </div>
  );
}

// =============================================================================
// Tooltip Examples
// =============================================================================

export function TooltipBasic() {
  return (
    <Tooltip content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  );
}

export function TooltipPositions() {
  return (
    <div className="flex gap-4 flex-wrap items-center justify-center py-8">
      <Tooltip content="Tooltip on top" side="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" side="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip on left" side="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Tooltip on right" side="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  );
}

export function TooltipDelay() {
  return (
    <div className="flex gap-4 flex-wrap items-center">
      <Tooltip content="Instant tooltip" delay={0}>
        <Button>No delay</Button>
      </Tooltip>
      <Tooltip content="Default delay (200ms)" delay={200}>
        <Button>Default</Button>
      </Tooltip>
      <Tooltip content="Slow tooltip" delay={500}>
        <Button>500ms delay</Button>
      </Tooltip>
    </div>
  );
}

// =============================================================================
// Message Examples
// =============================================================================

export function MessageBasic() {
  return (
    <Message position="left" author="System">
      Welcome to the terminal interface.
    </Message>
  );
}

export function MessageConversation() {
  return (
    <MessageList>
      <Message position="left" author="Alice" timestamp="10:30 AM">
        Hello! How are you today?
      </Message>
      <Message position="right" author="Bob" timestamp="10:31 AM">
        I&apos;m doing great, thanks for asking!
      </Message>
      <Message position="left" author="Alice" timestamp="10:32 AM">
        Wonderful! Have you seen the new terminal UI components?
      </Message>
      <Message position="right" author="Bob" timestamp="10:33 AM">
        Yes! They look amazing. The retro aesthetic is perfect.
      </Message>
      <Message position="left" author="Alice" timestamp="10:34 AM">
        Agreed! The box-drawing characters add a nice touch.
      </Message>
    </MessageList>
  );
}
