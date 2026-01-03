'use client';

import { Text, Heading, Code, Label } from 'tuimorphic';

export function TextBasic() {
  return <Text>This is default body text with monospace styling.</Text>;
}

export function TextVariants() {
  return (
    <div className="space-y-4">
      <Text variant="body">Body: Primary text for main content.</Text>
      <Text variant="secondary">Secondary: Supporting text with reduced emphasis.</Text>
      <Text variant="muted">Muted: Subdued text for tertiary information.</Text>
      <Text variant="caption">Caption: Small text for labels and annotations.</Text>
    </div>
  );
}

export function TextSizes() {
  return (
    <div className="space-y-4">
      <Text size="xs">Extra Small (xs)</Text>
      <Text size="sm">Small (sm)</Text>
      <Text size="md">Medium (md) - Default</Text>
      <Text size="lg">Large (lg)</Text>
      <Text size="xl">Extra Large (xl)</Text>
    </div>
  );
}

export function TextElements() {
  return (
    <div className="space-y-4">
      <Text as="p">Paragraph element (default)</Text>
      <Text as="span">Span element for inline text</Text>
      <Text as="strong">Strong element for emphasis</Text>
      <Text as="em">Em element for italicized text</Text>
      <Text as="small">Small element for fine print</Text>
      <Text as="blockquote">Blockquote element for citations</Text>
    </div>
  );
}

export function TextTransforms() {
  return (
    <div className="space-y-4">
      <Text transform="uppercase">Uppercase text transform</Text>
      <Text transform="lowercase">LOWERCASE TEXT TRANSFORM</Text>
      <Text transform="capitalize">capitalize each word</Text>
    </div>
  );
}

export function TextTruncate() {
  return (
    <div className="max-w-xs">
      <Text truncate>
        This is a very long piece of text that will be truncated with an ellipsis when it exceeds the container width.
      </Text>
    </div>
  );
}

export function HeadingBasic() {
  return <Heading level={2}>Section Heading</Heading>;
}

export function HeadingLevels() {
  return (
    <div className="space-y-4">
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  );
}

export function HeadingDecorated() {
  return (
    <div className="space-y-4">
      <Heading level={2} decorated decorationStyle="double">
        Double Decoration
      </Heading>
      <Heading level={2} decorated decorationStyle="single">
        Single Decoration
      </Heading>
      <Heading level={2} decorated decorationStyle="arrow">
        Arrow Decoration
      </Heading>
    </div>
  );
}

export function HeadingHero() {
  return (
    <Heading level={1} hero>
      Hero Title
    </Heading>
  );
}

export function HeadingAlignment() {
  return (
    <div className="space-y-4">
      <Heading level={3} align="left">
        Left Aligned
      </Heading>
      <Heading level={3} align="center">
        Center Aligned
      </Heading>
      <Heading level={3} align="right">
        Right Aligned
      </Heading>
    </div>
  );
}

export function CodeBasic() {
  return (
    <Text>
      Run <Code>npm install tuimorphic</Code> to install.
    </Text>
  );
}

export function CodeInline() {
  return (
    <Text>
      The <Code>useState</Code> hook returns a stateful value and a function to update it.
    </Text>
  );
}

export function CodeVariants() {
  return (
    <div className="space-y-4">
      <Text>
        Default: <Code variant="default">const x = 42</Code>
      </Text>
      <Text>
        Subtle: <Code variant="subtle">config.json</Code>
      </Text>
      <Text>
        Accent: <Code variant="accent">npm run build</Code>
      </Text>
    </div>
  );
}

export function CodeKeyboard() {
  return (
    <Text>
      Press <Code kbd>Ctrl</Code> + <Code kbd>C</Code> to copy,{' '}
      <Code kbd>Ctrl</Code> + <Code kbd>V</Code> to paste.
    </Text>
  );
}

export function LabelBasic() {
  return <Label>Username</Label>;
}

export function LabelRequired() {
  return <Label required>Email Address</Label>;
}

export function LabelOptional() {
  return <Label optional>Nickname</Label>;
}

export function LabelSizes() {
  return (
    <div className="space-y-4">
      <Label size="sm">Small Label</Label>
      <Label size="md">Medium Label (Default)</Label>
      <Label size="lg">Large Label</Label>
    </div>
  );
}

export function LabelVariants() {
  return (
    <div className="space-y-4">
      <Label variant="default">Default Label</Label>
      <Label variant="required">Required Label</Label>
      <Label variant="optional">Optional Label</Label>
      <Label variant="disabled">Disabled Label</Label>
    </div>
  );
}
