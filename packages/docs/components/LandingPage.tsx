'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Badge,
  Card,
  CardDouble,
  CardDoubleInner,
  Divider,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  ActionBar,
  ActionButton,
  Avatar,
  Input,
  Select,
  Checkbox,
  Toggle,
  Progress,
  Tooltip,
  Dialog,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  CodeBlock,
  TreeView,
  BarLoader,
  BlockLoader,
  BreadCrumbs,
  ComboBox,
  DatePicker,
  Drawer,
  Grid,
  GridItem,
  Heading,
  Text,
  Code,
  Label,
  Message,
  MessageList,
  Navigation,
  Popover,
  PopoverTitle,
  RadioGroup,
  Radio,
  Slider,
  TextArea,
} from 'tuimorphic';

const COMPONENT_DOCS: Record<string, string> = {
  accordion: '/docs/components/layout/accordion',
  'action-bar': '/docs/components/actions/action-bar',
  'action-button': '/docs/components/actions/action-button',
  avatar: '/docs/components/misc/avatar',
  badge: '/docs/components/data-display/badge',
  'bar-loader': '/docs/components/feedback/loader',
  'block-loader': '/docs/components/feedback/loader',
  breadcrumbs: '/docs/components/navigation/breadcrumbs',
  button: '/docs/components/actions/button',
  card: '/docs/components/layout/card',
  'card-double': '/docs/components/layout/card-double',
  checkbox: '/docs/components/forms/checkbox',
  'code-block': '/docs/components/data-display/code-block',
  code: '/docs/components/typography/code',
  combobox: '/docs/components/forms/combo-box',
  'data-table': '/docs/components/data-display/table',
  'date-picker': '/docs/components/forms/date-picker',
  dialog: '/docs/components/overlays/dialog',
  drawer: '/docs/components/overlays/drawer',
  grid: '/docs/components/layout/grid',
  heading: '/docs/components/typography/heading',
  input: '/docs/components/forms/input',
  label: '/docs/components/typography/label',
  loader: '/docs/components/feedback/loader',
  messages: '/docs/components/data-display/message',
  navigation: '/docs/components/navigation/navigation',
  popover: '/docs/components/overlays/popover',
  progress: '/docs/components/feedback/progress',
  radio: '/docs/components/forms/radio',
  select: '/docs/components/forms/select',
  slider: '/docs/components/forms/slider',
  text: '/docs/components/typography/text',
  textarea: '/docs/components/forms/text-area',
  toggle: '/docs/components/forms/toggle',
  tooltip: '/docs/components/overlays/tooltip',
  treeview: '/docs/components/navigation/tree-view',
};

const DocsLink = ({ docsKey }: { docsKey: string }) => {
  const href = COMPONENT_DOCS[docsKey];
  if (!href) return null;
  return (
    <Link href={href} className="docs-link">
      Docs →
    </Link>
  );
};

export function LandingPage() {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [comboValue, setComboValue] = useState('');
  const [radioValue, setRadioValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState(50);
  const [progressValue, setProgressValue] = useState(45);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12 pb-8 border-b border-fd-border">
        <h1 className="text-3xl tracking-[0.5em] mb-2">TUIMORPHIC</h1>
        <p className="text-fd-muted-foreground mb-6">
          Terminal-aesthetic React components built on Base UI
        </p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Badge variant="info">v0.2.0</Badge>
          <Link href="/docs">
            <Button variant="primary">Get Started →</Button>
          </Link>
          <Link href="/docs/components/actions/button">
            <Button variant="secondary">Components</Button>
          </Link>
        </div>
      </header>

      <main className="space-y-8">
        {/* Accordion */}
        <Card title="ACCORDION" actions={<DocsLink docsKey="accordion" />}>
          <Accordion defaultValue={['faq-1']}>
            <AccordionItem value="faq-1">
              <AccordionTrigger>What is Tuimorphic?</AccordionTrigger>
              <AccordionContent>
                Tuimorphic is a terminal-aesthetic React component library
                built on Base UI with SRCL styling.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>How do I install it?</AccordionTrigger>
              <AccordionContent>
                Install via npm: npm install tuimorphic
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes! Built on Base UI with full WAI-ARIA compliance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        <Divider />

        {/* Action Bar */}
        <Card title="ACTION BAR" actions={<DocsLink docsKey="action-bar" />}>
          <ActionBar align="start">
            <ActionButton hotkey="⌘S" variant="primary">Save</ActionButton>
            <ActionButton hotkey="⌘Z">Undo</ActionButton>
            <ActionButton hotkey="⌘Y">Redo</ActionButton>
            <ActionButton hotkey="⌘C">Copy</ActionButton>
            <ActionButton hotkey="⌘V">Paste</ActionButton>
          </ActionBar>
        </Card>

        <Divider />

        {/* Action Buttons */}
        <Card title="ACTION BUTTONS" actions={<DocsLink docsKey="action-button" />}>
          <div className="flex flex-wrap gap-2">
            <ActionButton variant="primary" hotkey="⌘1">Primary</ActionButton>
            <ActionButton variant="secondary" hotkey="⌘2">Secondary</ActionButton>
            <ActionButton loading>Loading</ActionButton>
            <ActionButton disabled hotkey="⌘D">Disabled</ActionButton>
            <ActionButton icon="►">With Icon</ActionButton>
          </div>
        </Card>

        <Divider />

        {/* Avatars */}
        <Card title="AVATARS" actions={<DocsLink docsKey="avatar" />}>
          <div className="flex flex-wrap gap-2 items-end">
            <Avatar initials="JD" />
            <Avatar initials="JS" size="large" />
            <Avatar initials="B" size="small" />
            <Avatar src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix" alt="Felix" />
          </div>
        </Card>

        <Divider />

        {/* Badges */}
        <Card title="BADGES" actions={<DocsLink docsKey="badge" />}>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="success">Online</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="error">Offline</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </Card>

        <Divider />

        {/* Bar Loader */}
        <Card title="BAR LOADER" actions={<DocsLink docsKey="bar-loader" />}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-fd-muted-foreground w-28">Determinate:</span>
              <BarLoader progress={65} />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-fd-muted-foreground w-28">Indeterminate:</span>
              <BarLoader />
            </div>
          </div>
        </Card>

        <Divider />

        {/* Block Loader */}
        <Card title="BLOCK LOADER" actions={<DocsLink docsKey="block-loader" />}>
          <div className="flex flex-wrap gap-4">
            <BlockLoader mode={0} />
            <BlockLoader mode={1} />
            <BlockLoader mode={5} />
            <BlockLoader mode={11} />
          </div>
        </Card>

        <Divider />

        {/* Breadcrumbs */}
        <Card title="BREADCRUMBS" actions={<DocsLink docsKey="breadcrumbs" />}>
          <BreadCrumbs
            items={[
              { label: 'Home', href: '#' },
              { label: 'Components', href: '#' },
              { label: 'Navigation' },
            ]}
          />
        </Card>

        <Divider />

        {/* Buttons */}
        <Card title="BUTTONS" actions={<DocsLink docsKey="button" />}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-fd-muted-foreground w-24 uppercase">Primary:</span>
              <Button variant="primary">Submit</Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-fd-muted-foreground w-24 uppercase">Secondary:</span>
              <Button variant="secondary">Cancel</Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-fd-muted-foreground w-24 uppercase">Disabled:</span>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </Card>

        <Divider />

        {/* Cards */}
        <Card title="CARDS" actions={<DocsLink docsKey="card" />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card title="CENTER TITLE" mode="center">
              <p>Default card with centered title.</p>
            </Card>
            <Card title="LEFT TITLE" mode="left">
              <p>Card with left-aligned title.</p>
            </Card>
            <Card title="RIGHT TITLE" mode="right">
              <p>Card with right-aligned title.</p>
            </Card>
          </div>
        </Card>

        <Divider />

        {/* Card Double */}
        <Card title="CARD DOUBLE" actions={<DocsLink docsKey="card-double" />}>
          <CardDouble title="SYSTEM STATUS">
            <CardDoubleInner title="CPU">
              <p>Usage: 45%</p>
              <p>Temp: 62°C</p>
            </CardDoubleInner>
            <CardDoubleInner title="MEMORY">
              <p>Used: 640KB</p>
              <p>Free: 384KB</p>
            </CardDoubleInner>
          </CardDouble>
        </Card>

        <Divider />

        {/* Checkbox */}
        <Card title="CHECKBOX" actions={<DocsLink docsKey="checkbox" />}>
          <div className="space-y-3">
            <Checkbox
              label="Accept terms and conditions"
              checked={checkboxValue}
              onCheckedChange={setCheckboxValue}
            />
            <Checkbox label="Subscribe to newsletter" defaultChecked />
            <Checkbox label="Disabled option" disabled />
          </div>
        </Card>

        <Divider />

        {/* Code */}
        <Card title="INLINE CODE" actions={<DocsLink docsKey="code" />}>
          <Text>
            Use <Code>npm install tuimorphic</Code> to install the package.
            Press <Code kbd>Ctrl</Code>+<Code kbd>C</Code> to copy.
          </Text>
          <div className="flex flex-wrap gap-4 mt-4">
            <Text><Code variant="default">default code</Code></Text>
            <Text><Code variant="subtle">subtle code</Code></Text>
            <Text><Code variant="accent">accent code</Code></Text>
          </div>
        </Card>

        <Divider />

        {/* Code Block */}
        <Card title="CODE BLOCK" actions={<DocsLink docsKey="code-block" />}>
          <CodeBlock
            language="typescript"
            showLineNumbers
            code={`import { Button } from 'tuimorphic';

function App() {
  return (
    <Button variant="primary">
      Click Me
    </Button>
  );
}`}
          />
        </Card>

        <Divider />

        {/* ComboBox */}
        <Card title="COMBOBOX" actions={<DocsLink docsKey="combobox" />}>
          <ComboBox
            label="SELECT COMMAND"
            placeholder="Search commands..."
            value={comboValue}
            onValueChange={setComboValue}
            options={[
              { value: 'dir', label: 'DIR - List directory' },
              { value: 'cd', label: 'CD - Change directory' },
              { value: 'copy', label: 'COPY - Copy files' },
              { value: 'del', label: 'DEL - Delete files' },
              { value: 'type', label: 'TYPE - Display file contents' },
            ]}
          />
        </Card>

        <Divider />

        {/* Data Table */}
        <Card title="DATA TABLE" actions={<DocsLink docsKey="data-table" />}>
          <Table bordered>
            <TableHeader>
              <TableRow>
                <TableHead>FILENAME</TableHead>
                <TableHead align="right">SIZE</TableHead>
                <TableHead>TYPE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>CONFIG.SYS</TableCell>
                <TableCell align="right" numeric>256</TableCell>
                <TableCell>System</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>AUTOEXEC.BAT</TableCell>
                <TableCell align="right" numeric>512</TableCell>
                <TableCell>Batch</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>COMMAND.COM</TableCell>
                <TableCell align="right" numeric>54,619</TableCell>
                <TableCell>Executable</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        <Divider />

        {/* Date Picker */}
        <Card title="DATE PICKER" actions={<DocsLink docsKey="date-picker" />}>
          <DatePicker
            value={selectedDate}
            onValueChange={setSelectedDate}
          />
          <p className="mt-4 text-sm">
            Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
          </p>
        </Card>

        <Divider />

        {/* Dialog */}
        <Card title="DIALOG" actions={<DocsLink docsKey="dialog" />}>
          <div className="flex flex-wrap gap-4">
            <Dialog
              trigger={<Button variant="primary">Open Dialog</Button>}
              title="CONFIRM ACTION"
            >
              <p>Are you sure you want to proceed?</p>
              <div className="flex gap-2 mt-4">
                <Button variant="primary">Confirm</Button>
                <Button variant="secondary">Cancel</Button>
              </div>
            </Dialog>
            <Dialog
              trigger={<Button variant="secondary">System Info</Button>}
              title="SYSTEM INFORMATION"
            >
              <p>TUIMORPHIC TERMINAL v0.2.0</p>
              <p>Components: 50+</p>
              <p>Status: <Badge variant="success">Active</Badge></p>
            </Dialog>
          </div>
        </Card>

        <Divider />

        {/* Drawer */}
        <Card title="DRAWER" actions={<DocsLink docsKey="drawer" />}>
          <div className="flex flex-wrap gap-4">
            <Drawer
              trigger={<Button variant="secondary">Left Drawer</Button>}
              side="left"
              title="NAVIGATION"
            >
              <nav className="flex flex-col gap-3">
                <a href="#" className="hover:text-fd-foreground">► Home</a>
                <a href="#" className="hover:text-fd-foreground">► Files</a>
                <a href="#" className="hover:text-fd-foreground">► Settings</a>
              </nav>
            </Drawer>
            <Drawer
              trigger={<Button variant="secondary">Right Drawer</Button>}
              side="right"
              title="DETAILS"
            >
              <p>Selected: document.txt</p>
              <p>Size: 4.2 KB</p>
              <p>Modified: 2025-01-15</p>
            </Drawer>
            <Drawer
              trigger={<Button variant="primary">Bottom Drawer</Button>}
              side="bottom"
              title="QUICK ACTIONS"
            >
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary">New File</Button>
                <Button variant="secondary">Open</Button>
                <Button variant="secondary">Save</Button>
              </div>
            </Drawer>
          </div>
        </Card>

        <Divider />

        {/* Grid */}
        <Card title="GRID" actions={<DocsLink docsKey="grid" />}>
          <Grid columns={3} gap={2}>
            <GridItem>
              <Card title="ITEM 1">Grid cell 1</Card>
            </GridItem>
            <GridItem>
              <Card title="ITEM 2">Grid cell 2</Card>
            </GridItem>
            <GridItem>
              <Card title="ITEM 3">Grid cell 3</Card>
            </GridItem>
            <GridItem span={2}>
              <Card title="WIDE ITEM">Spans 2 columns</Card>
            </GridItem>
            <GridItem>
              <Card title="ITEM 5">Grid cell 5</Card>
            </GridItem>
          </Grid>
        </Card>

        <Divider />

        {/* Heading */}
        <Card title="HEADINGS" actions={<DocsLink docsKey="heading" />}>
          <div className="space-y-2">
            <Heading level={1}>Heading Level 1</Heading>
            <Heading level={2}>Heading Level 2</Heading>
            <Heading level={3}>Heading Level 3</Heading>
            <Heading level={4}>Heading Level 4</Heading>
          </div>
          <Divider className="my-4" />
          <div className="space-y-4">
            <Heading level={3} decorated decorationStyle="double">Double Border</Heading>
            <Heading level={3} decorated decorationStyle="single">Single Border</Heading>
            <Heading level={3} decorated decorationStyle="arrow">Arrow Style</Heading>
          </div>
        </Card>

        <Divider />

        {/* Input */}
        <Card title="INPUT" actions={<DocsLink docsKey="input" />}>
          <div className="space-y-4">
            <Input label="USERNAME" placeholder="Enter username" />
            <Input label="PASSWORD" type="password" placeholder="Enter password" />
          </div>
        </Card>

        <Divider />

        {/* Label */}
        <Card title="LABELS" actions={<DocsLink docsKey="label" />}>
          <div className="flex flex-wrap gap-4 mb-4">
            <Label>Default Label</Label>
            <Label required>Required Label</Label>
            <Label optional>Optional Label</Label>
            <Label variant="disabled">Disabled Label</Label>
          </div>
          <div className="flex flex-wrap gap-4">
            <Label size="sm">Small Label</Label>
            <Label size="md">Medium Label</Label>
            <Label size="lg">Large Label</Label>
          </div>
        </Card>

        <Divider />

        {/* Messages */}
        <Card title="MESSAGES" actions={<DocsLink docsKey="messages" />}>
          <MessageList>
            <Message author="USER" position="right" timestamp="10:42:15">
              Hello, how do I format a floppy disk?
            </Message>
            <Message author="SYSTEM" position="left" timestamp="10:42:18">
              Use the FORMAT command. Example: FORMAT A:
            </Message>
            <Message author="USER" position="right" timestamp="10:42:25">
              Thanks! What about quick format?
            </Message>
            <Message author="SYSTEM" position="left" timestamp="10:42:28">
              Add the /Q flag: FORMAT A: /Q
            </Message>
          </MessageList>
        </Card>

        <Divider />

        {/* Navigation */}
        <Card title="NAVIGATION" actions={<DocsLink docsKey="navigation" />}>
          <Navigation
            logo="TUIMORPHIC"
            items={[
              { label: 'Home', href: '#', isActive: true },
              { label: 'Docs', href: '#' },
              { label: 'Examples', href: '#' },
              { label: 'GitHub', href: '#' },
            ]}
            actions={<Button variant="secondary">Login</Button>}
          />
        </Card>

        <Divider />

        {/* Popover */}
        <Card title="POPOVER" actions={<DocsLink docsKey="popover" />}>
          <div className="flex flex-wrap gap-4">
            <Popover
              trigger={<Button variant="secondary">Top Popover</Button>}
              side="top"
            >
              <PopoverTitle>SYSTEM INFO</PopoverTitle>
              <p>Memory: 640KB</p>
              <p>Status: OK</p>
            </Popover>
            <Popover
              trigger={<Button variant="secondary">Bottom Popover</Button>}
              side="bottom"
            >
              <PopoverTitle>OPTIONS</PopoverTitle>
              <p>Click outside to close</p>
            </Popover>
            <Popover
              trigger={<Button variant="primary">With Actions</Button>}
              side="bottom"
            >
              <PopoverTitle>CONFIRM</PopoverTitle>
              <p>Are you sure?</p>
              <div className="flex gap-2 mt-2">
                <Button variant="primary">Yes</Button>
                <Button variant="secondary">No</Button>
              </div>
            </Popover>
          </div>
        </Card>

        <Divider />

        {/* Progress */}
        <Card title="PROGRESS" actions={<DocsLink docsKey="progress" />}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-fd-muted-foreground w-20">Download:</span>
              <Progress value={progressValue} showLabel />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-fd-muted-foreground w-20">Upload:</span>
              <Progress value={75} showLabel />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-fd-muted-foreground w-20">Custom:</span>
              <Progress value={60} fillChar="=" emptyChar="-" showLabel />
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                variant="secondary"
                onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
              >
                - 10%
              </Button>
              <Button
                variant="secondary"
                onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
              >
                + 10%
              </Button>
            </div>
          </div>
        </Card>

        <Divider />

        {/* Radio */}
        <Card title="RADIO BUTTONS" actions={<DocsLink docsKey="radio" />}>
          <RadioGroup value={radioValue} onValueChange={(value) => setRadioValue(value as string)}>
            <Radio value="option1" label="Option Alpha" />
            <Radio value="option2" label="Option Beta" />
            <Radio value="option3" label="Option Gamma" />
            <Radio value="option4" label="Disabled" disabled />
          </RadioGroup>
        </Card>

        <Divider />

        {/* Select */}
        <Card title="SELECT" actions={<DocsLink docsKey="select" />}>
          <Select
            label="OPERATING SYSTEM"
            placeholder="Select OS..."
            value={selectValue}
            onValueChange={setSelectValue}
            options={[
              { value: 'dos', label: 'MS-DOS' },
              { value: 'win31', label: 'Windows 3.1' },
              { value: 'win95', label: 'Windows 95' },
              { value: 'linux', label: 'Linux' },
              { value: 'macos', label: 'macOS' },
            ]}
          />
        </Card>

        <Divider />

        {/* Slider */}
        <Card title="SLIDER" actions={<DocsLink docsKey="slider" />}>
          <Slider
            label="VOLUME"
            value={sliderValue}
            onValueChange={(value) => setSliderValue(Array.isArray(value) ? value[0] : value)}
            min={0}
            max={100}
            showValue
          />
        </Card>

        <Divider />

        {/* Text */}
        <Card title="TEXT" actions={<DocsLink docsKey="text" />}>
          <div className="space-y-2">
            <Text>Default body text for general content.</Text>
            <Text variant="secondary">Secondary text for supporting information.</Text>
            <Text variant="muted">Muted text for less important details.</Text>
            <Text variant="caption">Caption text for annotations.</Text>
          </div>
          <Divider className="my-4" />
          <div className="space-y-2">
            <Text size="xs">Extra small text (xs)</Text>
            <Text size="sm">Small text (sm)</Text>
            <Text size="md">Medium text (md)</Text>
            <Text size="lg">Large text (lg)</Text>
            <Text size="xl">Extra large text (xl)</Text>
          </div>
        </Card>

        <Divider />

        {/* TextArea */}
        <Card title="TEXT AREA" actions={<DocsLink docsKey="textarea" />}>
          <TextArea
            label="DESCRIPTION"
            rows={4}
            placeholder="Enter a detailed description..."
          />
        </Card>

        <Divider />

        {/* Toggle */}
        <Card title="TOGGLE" actions={<DocsLink docsKey="toggle" />}>
          <div className="space-y-3">
            <Toggle
              label="Enable notifications"
              checked={toggleValue}
              onCheckedChange={setToggleValue}
            />
            <Toggle label="Auto-save" defaultChecked />
            <Toggle label="Disabled" disabled />
          </div>
        </Card>

        <Divider />

        {/* Tooltips */}
        <Card title="TOOLTIP" actions={<DocsLink docsKey="tooltip" />}>
          <div className="flex flex-wrap gap-4">
            <Tooltip content="Save your current work" side="top">
              <Button variant="primary">Save</Button>
            </Tooltip>
            <Tooltip content="Discard all changes" side="bottom">
              <Button variant="secondary">Cancel</Button>
            </Tooltip>
            <Tooltip content="Open settings panel" side="right">
              <Button variant="secondary">Settings</Button>
            </Tooltip>
          </div>
        </Card>

        <Divider />

        {/* TreeView */}
        <Card title="TREEVIEW" actions={<DocsLink docsKey="treeview" />}>
          <TreeView
            data={[
              {
                id: '1',
                label: 'C:',
                children: [
                  {
                    id: '2',
                    label: 'DOS',
                    children: [
                      { id: '3', label: 'COMMAND.COM', isFile: true },
                      { id: '4', label: 'EDIT.COM', isFile: true },
                    ],
                  },
                  {
                    id: '5',
                    label: 'WINDOWS',
                    children: [
                      { id: '6', label: 'WIN.COM', isFile: true },
                      { id: '7', label: 'SYSTEM.INI', isFile: true },
                    ],
                  },
                  { id: '8', label: 'CONFIG.SYS', isFile: true },
                  { id: '9', label: 'AUTOEXEC.BAT', isFile: true },
                ],
              },
            ]}
            defaultExpanded={['1', '2']}
          />
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-fd-border text-center text-sm text-fd-muted-foreground">
        <p>
          TUIMORPHIC v0.2.0 • 50+ Components • Built with Base UI + SRCL Aesthetics • MIT License
        </p>
      </footer>
    </div>
  );
}
