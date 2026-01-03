import React from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Divider } from '../components/Divider';
import { Checkbox } from '../components/Checkbox';
import { RadioGroup, Radio } from '../components/Radio';
import { Toggle } from '../components/Toggle';
import { Progress } from '../components/Progress';
import { TextArea } from '../components/TextArea';
import { Tooltip } from '../components/Tooltip';
import { Dialog } from '../components/Dialog';
import { Select } from '../components/Select';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion';
import { ActionButton } from '../components/ActionButton';
import { ActionBar } from '../components/ActionBar';
import { Popover, PopoverTitle } from '../components/Popover';
import { Drawer } from '../components/Drawer';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/Table';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { Avatar } from '../components/Avatar';
import { CodeBlock } from '../components/CodeBlock';
import { ComboBox } from '../components/ComboBox';
import { Navigation } from '../components/Navigation';
import { TreeView } from '../components/TreeView';
import { DatePicker } from '../components/DatePicker';
import { Message, MessageList } from '../components/Message';
import { BarLoader, BlockLoader } from '../components/Loader';
import { Slider } from '../components/Slider';
import { CardDouble, CardDoubleInner } from '../components/CardDouble';
import { Grid, GridItem } from '../components/Grid';
import { Text } from '../components/Text';
import { Heading } from '../components/Heading';
import { Code } from '../components/Code';
import { Label } from '../components/Label';
import styles from './App.module.scss';

const DOCS_BASE = 'http://localhost:3008';

const COMPONENT_DOCS: Record<string, string> = {
  accordion: `${DOCS_BASE}/docs/components/layout/accordion`,
  'action-bar': `${DOCS_BASE}/docs/components/actions/action-bar`,
  'action-button': `${DOCS_BASE}/docs/components/actions/action-button`,
  avatar: `${DOCS_BASE}/docs/components/misc/avatar`,
  badge: `${DOCS_BASE}/docs/components/data-display/badge`,
  'bar-loader': `${DOCS_BASE}/docs/components/feedback/loader`,
  'block-loader': `${DOCS_BASE}/docs/components/feedback/loader`,
  breadcrumbs: `${DOCS_BASE}/docs/components/navigation/breadcrumbs`,
  button: `${DOCS_BASE}/docs/components/actions/button`,
  card: `${DOCS_BASE}/docs/components/layout/card`,
  checkbox: `${DOCS_BASE}/docs/components/forms/checkbox`,
  'code-block': `${DOCS_BASE}/docs/components/data-display/code-block`,
  combobox: `${DOCS_BASE}/docs/components/forms/combo-box`,
  'data-table': `${DOCS_BASE}/docs/components/data-display/table`,
  'date-picker': `${DOCS_BASE}/docs/components/forms/date-picker`,
  dialog: `${DOCS_BASE}/docs/components/overlays/dialog`,
  drawer: `${DOCS_BASE}/docs/components/overlays/drawer`,
  grid: `${DOCS_BASE}/docs/components/layout/grid`,
  input: `${DOCS_BASE}/docs/components/forms/input`,
  messages: `${DOCS_BASE}/docs/components/data-display/message`,
  navigation: `${DOCS_BASE}/docs/components/navigation/navigation`,
  popover: `${DOCS_BASE}/docs/components/overlays/popover`,
  progress: `${DOCS_BASE}/docs/components/feedback/progress`,
  radio: `${DOCS_BASE}/docs/components/forms/radio`,
  select: `${DOCS_BASE}/docs/components/forms/select`,
  slider: `${DOCS_BASE}/docs/components/forms/slider`,
  textarea: `${DOCS_BASE}/docs/components/forms/text-area`,
  toggle: `${DOCS_BASE}/docs/components/forms/toggle`,
  tooltip: `${DOCS_BASE}/docs/components/overlays/tooltip`,
  treeview: `${DOCS_BASE}/docs/components/navigation/tree-view`,
  typography: `${DOCS_BASE}/docs/components/typography/heading`,
};

const SectionHeader = ({ title, docsKey }: { title: string; docsKey?: string }) => (
  <div className={styles.sectionHeader}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    {docsKey && COMPONENT_DOCS[docsKey] && (
      <a href={COMPONENT_DOCS[docsKey]} className={styles.sectionLink} target="_blank" rel="noopener noreferrer">
        Docs →
      </a>
    )}
  </div>
);

const TINTS = [
  { value: '', label: 'Default' },
  { value: 'tint-green', label: 'Green' },
  { value: 'tint-blue', label: 'Blue' },
  { value: 'tint-red', label: 'Red' },
  { value: 'tint-yellow', label: 'Yellow' },
  { value: 'tint-purple', label: 'Purple' },
  { value: 'tint-orange', label: 'Orange' },
  { value: 'tint-pink', label: 'Pink' },
  { value: 'tint-neon-green', label: 'Neon Green' },
  { value: 'tint-neon-blue', label: 'Neon Blue' },
  { value: 'tint-neon-pink', label: 'Neon Pink' },
  { value: 'tint-neon-cyan', label: 'Neon Cyan' },
];

export default function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [tint, setTint] = React.useState('');
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('option1');
  const [toggleValue, setToggleValue] = React.useState(false);
  const [progressValue, setProgressValue] = React.useState(45);
  const [selectValue, setSelectValue] = React.useState('');
  const [comboValue, setComboValue] = React.useState('');
  const [sliderValue, setSliderValue] = React.useState(50);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

  const updateBodyClasses = (newTheme: string, newTint: string) => {
    const classes = [`theme-${newTheme}`];
    if (newTint) classes.push(newTint);
    document.body.className = classes.join(' ');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    updateBodyClasses(newTheme, tint);
  };

  const handleTintChange = (newTint: string) => {
    setTint(newTint);
    updateBodyClasses(theme, newTint);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>TUIMORPHIC</h1>
        <p className={styles.subtitle}>
          Terminal-aesthetic React components built on Base UI
        </p>
        <div className={styles.headerActions}>
          <Badge variant="info">v0.2.0</Badge>
          <Select
            value={tint}
            onValueChange={handleTintChange}
            placeholder="Color Tint"
            options={TINTS}
          />
          <Button variant="secondary" onClick={toggleTheme}>
            {theme === 'light' ? '◐ Dark' : '◑ Light'}
          </Button>
          <a href="http://localhost:3008" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button variant="primary">Docs →</Button>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        {/* Accordion */}
        <section className={styles.section}>
          <SectionHeader title="═══ ACCORDION ═══" docsKey="accordion" />
          <Card title="COLLAPSIBLE SECTIONS">
            <Accordion defaultValue={['faq-1']}>
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is Tuimorphic?</AccordionTrigger>
                <AccordionContent>
                  Tuimorphic is a terminal-aesthetic React component library
                  built on Base UI with SRCL styling. It brings the nostalgic
                  look of MS-DOS and early computing to modern web applications.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>How do I install it?</AccordionTrigger>
                <AccordionContent>
                  Install via npm: npm install tuimorphic
                  Then import components and styles into your project.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes! Tuimorphic is built on Base UI which provides
                  full WAI-ARIA compliance and keyboard navigation
                  out of the box.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </section>

        <Divider />

        {/* Action Bar */}
        <section className={styles.section}>
          <SectionHeader title="═══ ACTION BAR ═══" docsKey="action-bar" />
          <Card title="TOOLBAR WITH HOTKEYS">
            <ActionBar align="start">
              <ActionButton hotkey="⌘S" variant="primary">Save</ActionButton>
              <ActionButton hotkey="⌘Z">Undo</ActionButton>
              <ActionButton hotkey="⌘Y">Redo</ActionButton>
              <ActionButton hotkey="⌘C">Copy</ActionButton>
              <ActionButton hotkey="⌘V">Paste</ActionButton>
            </ActionBar>
          </Card>
        </section>

        <Divider />

        {/* Action Buttons */}
        <section className={styles.section}>
          <SectionHeader title="═══ ACTION BUTTONS ═══" docsKey="action-button" />
          <Card title="BUTTON STATES">
            <div className={styles.actionButtonGrid}>
              <ActionButton variant="primary" hotkey="⌘1">Primary</ActionButton>
              <ActionButton variant="secondary" hotkey="⌘2">Secondary</ActionButton>
              <ActionButton loading>Loading</ActionButton>
              <ActionButton disabled hotkey="⌘D">Disabled</ActionButton>
              <ActionButton icon="►">With Icon</ActionButton>
            </div>
          </Card>
        </section>

        <Divider />

        {/* Avatars */}
        <section className={styles.section}>
          <SectionHeader title="═══ AVATARS ═══" docsKey="avatar" />
          <Card title="USER AVATARS">
            <div className={styles.badgeGrid}>
              <Avatar initials="JD" />
              <Avatar initials="JS" size="large" />
              <Avatar initials="B" size="small" />
              <Avatar src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix" alt="Felix" />
            </div>
          </Card>
        </section>

        <Divider />

        {/* Badges */}
        <section className={styles.section}>
          <SectionHeader title="═══ BADGES ═══" docsKey="badge" />
          <Card title="STATUS INDICATORS">
            <div className={styles.badgeGrid}>
              <Badge>Default</Badge>
              <Badge variant="success">Online</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="error">Offline</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </Card>
        </section>

        <Divider />

        {/* Bar Loader */}
        <section className={styles.section}>
          <SectionHeader title="═══ BAR LOADER ═══" docsKey="bar-loader" />
          <Card title="PROGRESS BAR LOADER">
            <div className={styles.progressGrid}>
              <div className={styles.progressItem}>
                <span className={styles.progressLabel}>Determinate:</span>
                <BarLoader progress={65} />
              </div>
              <div className={styles.progressItem}>
                <span className={styles.progressLabel}>Indeterminate:</span>
                <BarLoader />
              </div>
            </div>
          </Card>
        </section>

        <Divider />

        {/* Block Loader */}
        <section className={styles.section}>
          <SectionHeader title="═══ BLOCK LOADER ═══" docsKey="block-loader" />
          <Card title="ANIMATED LOADERS">
            <div className={styles.badgeGrid}>
              <BlockLoader mode={0} />
              <BlockLoader mode={1} />
              <BlockLoader mode={5} />
              <BlockLoader mode={11} />
            </div>
          </Card>
        </section>

        <Divider />

        {/* Breadcrumbs */}
        <section className={styles.section}>
          <SectionHeader title="═══ BREADCRUMBS ═══" docsKey="breadcrumbs" />
          <Card title="NAVIGATION PATH">
            <BreadCrumbs
              items={[
                { label: 'Home', href: '#' },
                { label: 'Components', href: '#' },
                { label: 'Navigation' },
              ]}
            />
          </Card>
        </section>

        <Divider />

        {/* Buttons */}
        <section className={styles.section}>
          <SectionHeader title="═══ BUTTONS ═══" docsKey="button" />
          <Card title="BUTTON VARIANTS">
            <div className={styles.buttonGrid}>
              <div className={styles.buttonExample}>
                <span className={styles.label}>PRIMARY:</span>
                <Button variant="primary">Submit</Button>
              </div>
              <div className={styles.buttonExample}>
                <span className={styles.label}>SECONDARY:</span>
                <Button variant="secondary">Cancel</Button>
              </div>
              <div className={styles.buttonExample}>
                <span className={styles.label}>DISABLED:</span>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </Card>
        </section>

        <Divider />

        {/* Cards */}
        <section className={styles.section}>
          <SectionHeader title="═══ CARDS ═══" docsKey="card" />
          <div className={styles.cardGrid}>
            <Card title="CENTER TITLE" mode="center">
              <p>Default card with centered title.</p>
              <p>MS-DOS inspired box-shadow borders.</p>
            </Card>
            <Card title="LEFT TITLE" mode="left">
              <p>Card with left-aligned title.</p>
              <p>Corner decoration included.</p>
            </Card>
            <Card title="RIGHT TITLE" mode="right">
              <p>Card with right-aligned title.</p>
              <p>Symmetric corner decoration.</p>
            </Card>
          </div>
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
        </section>

        <Divider />

        {/* Checkbox */}
        <section className={styles.section}>
          <SectionHeader title="═══ CHECKBOX ═══" docsKey="checkbox" />
          <Card title="CHECKBOX OPTIONS">
            <div className={styles.controlGrid}>
              <Checkbox
                label="Accept terms and conditions"
                checked={checkboxValue}
                onCheckedChange={setCheckboxValue}
              />
              <Checkbox label="Subscribe to newsletter" defaultChecked />
              <Checkbox label="Disabled option" disabled />
            </div>
          </Card>
        </section>

        <Divider />

        {/* Code Blocks */}
        <section className={styles.section}>
          <SectionHeader title="═══ CODE BLOCKS ═══" docsKey="code-block" />
          <Card title="SYNTAX DISPLAY">
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
        </section>

        <Divider />

        {/* ComboBox */}
        <section className={styles.section}>
          <SectionHeader title="═══ COMBOBOX ═══" docsKey="combobox" />
          <Card title="SEARCHABLE SELECT">
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
                { value: 'cls', label: 'CLS - Clear screen' },
              ]}
            />
          </Card>
        </section>

        <Divider />

        {/* Data Table */}
        <section className={styles.section}>
          <SectionHeader title="═══ DATA TABLE ═══" docsKey="data-table" />
          <Card title="BORDERED TABLE">
            <Table bordered>
              <TableHeader>
                <TableRow>
                  <TableHead>FILENAME</TableHead>
                  <TableHead align="right">SIZE</TableHead>
                  <TableHead>TYPE</TableHead>
                  <TableHead>MODIFIED</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>CONFIG.SYS</TableCell>
                  <TableCell align="right" numeric>256</TableCell>
                  <TableCell>System</TableCell>
                  <TableCell>1995-08-24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>AUTOEXEC.BAT</TableCell>
                  <TableCell align="right" numeric>512</TableCell>
                  <TableCell>Batch</TableCell>
                  <TableCell>1995-08-24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>COMMAND.COM</TableCell>
                  <TableCell align="right" numeric>54,619</TableCell>
                  <TableCell>Executable</TableCell>
                  <TableCell>1995-07-11</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>IO.SYS</TableCell>
                  <TableCell align="right" numeric>223,148</TableCell>
                  <TableCell>System</TableCell>
                  <TableCell>1995-07-11</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
          <Card title="STRIPED TABLE">
            <Table striped>
              <TableHeader>
                <TableRow>
                  <TableHead>PROCESS</TableHead>
                  <TableHead align="right">PID</TableHead>
                  <TableHead align="right">CPU %</TableHead>
                  <TableHead align="right">MEM KB</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>KERNEL32</TableCell>
                  <TableCell align="right" numeric>1</TableCell>
                  <TableCell align="right" numeric>2.4</TableCell>
                  <TableCell align="right" numeric>1,024</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>EXPLORER</TableCell>
                  <TableCell align="right" numeric>42</TableCell>
                  <TableCell align="right" numeric>8.1</TableCell>
                  <TableCell align="right" numeric>4,096</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>WINWORD</TableCell>
                  <TableCell align="right" numeric>128</TableCell>
                  <TableCell align="right" numeric>15.3</TableCell>
                  <TableCell align="right" numeric>8,192</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>NETSCAPE</TableCell>
                  <TableCell align="right" numeric>256</TableCell>
                  <TableCell align="right" numeric>22.7</TableCell>
                  <TableCell align="right" numeric>16,384</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </section>

        <Divider />

        {/* Date Picker */}
        <section className={styles.section}>
          <SectionHeader title="═══ DATE PICKER ═══" docsKey="date-picker" />
          <Card title="CALENDAR">
            <DatePicker
              value={selectedDate}
              onValueChange={setSelectedDate}
            />
            <p style={{ marginTop: '1rem', fontFamily: 'var(--font-family-mono)' }}>
              Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
            </p>
          </Card>
        </section>

        <Divider />

        {/* Dialog */}
        <section className={styles.section}>
          <SectionHeader title="═══ DIALOG ═══" docsKey="dialog" />
          <Card title="MODAL DIALOGS">
            <div className={styles.dialogGrid}>
              <Dialog
                trigger={<Button variant="primary">Open Dialog</Button>}
                title="CONFIRM ACTION"
              >
                <p>Are you sure you want to proceed with this action?</p>
                <p>This operation cannot be undone.</p>
                <div className={styles.dialogActions}>
                  <Button variant="primary">Confirm</Button>
                  <Button variant="secondary">Cancel</Button>
                </div>
              </Dialog>

              <Dialog
                trigger={<Button variant="secondary">System Info</Button>}
                title="SYSTEM INFORMATION"
              >
                <p>TUIMORPHIC TERMINAL v0.2.0</p>
                <p>Components: 35</p>
                <p>Theme: {theme}</p>
                <p>Status: <Badge variant="success">Active</Badge></p>
              </Dialog>
            </div>
          </Card>
        </section>

        <Divider />

        {/* Drawer */}
        <section className={styles.section}>
          <SectionHeader title="═══ DRAWER ═══" docsKey="drawer" />
          <Card title="SLIDE-OUT PANELS">
            <div className={styles.drawerGrid}>
              <Drawer
                trigger={<Button variant="secondary">Left Drawer</Button>}
                side="left"
                title="NAVIGATION"
              >
                <nav className={styles.drawerNav}>
                  <a href="#">► Home</a>
                  <a href="#">► Files</a>
                  <a href="#">► Settings</a>
                  <a href="#">► Help</a>
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
                <p>Type: Text File</p>
              </Drawer>
              <Drawer
                trigger={<Button variant="primary">Bottom Drawer</Button>}
                side="bottom"
                title="QUICK ACTIONS"
              >
                <div className={styles.drawerActions}>
                  <Button variant="secondary">New File</Button>
                  <Button variant="secondary">Open</Button>
                  <Button variant="secondary">Save</Button>
                  <Button variant="secondary">Export</Button>
                </div>
              </Drawer>
            </div>
          </Card>
        </section>

        <Divider />

        {/* Grid */}
        <section className={styles.section}>
          <SectionHeader title="═══ GRID ═══" docsKey="grid" />
          <Card title="GRID LAYOUT">
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
        </section>

        <Divider />

        {/* Input */}
        <section className={styles.section}>
          <SectionHeader title="═══ INPUT ═══" docsKey="input" />
          <Card title="INPUT FIELDS">
            <div className={styles.inputGrid}>
              <Input label="USERNAME" placeholder="Enter username" />
              <Input label="PASSWORD" type="password" placeholder="Enter password" />
            </div>
          </Card>
        </section>

        <Divider />

        {/* Messages */}
        <section className={styles.section}>
          <SectionHeader title="═══ MESSAGES ═══" docsKey="messages" />
          <Card title="CHAT MESSAGES">
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
        </section>

        <Divider />

        {/* Navigation Bar */}
        <section className={styles.section}>
          <SectionHeader title="═══ NAVIGATION BAR ═══" docsKey="navigation" />
          <Card title="NAVIGATION">
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
        </section>

        <Divider />

        {/* Popover */}
        <section className={styles.section}>
          <SectionHeader title="═══ POPOVER ═══" docsKey="popover" />
          <Card title="FLOATING CONTENT">
            <div className={styles.popoverGrid}>
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
                <p>Or press Escape</p>
              </Popover>
              <Popover
                trigger={<Button variant="primary">With Actions</Button>}
                side="bottom"
              >
                <PopoverTitle>CONFIRM</PopoverTitle>
                <p>Are you sure?</p>
                <div className={styles.popoverActions}>
                  <Button variant="primary">Yes</Button>
                  <Button variant="secondary">No</Button>
                </div>
              </Popover>
            </div>
          </Card>
        </section>

        <Divider />

        {/* Progress Bars */}
        <section className={styles.section}>
          <SectionHeader title="═══ PROGRESS BARS ═══" docsKey="progress" />
          <Card title="PROGRESS INDICATORS">
            <div className={styles.progressGrid}>
              <div className={styles.progressItem}>
                <span className={styles.progressLabel}>Download:</span>
                <Progress value={progressValue} showLabel />
              </div>
              <div className={styles.progressItem}>
                <span className={styles.progressLabel}>Upload:</span>
                <Progress value={75} showLabel />
              </div>
              <div className={styles.progressItem}>
                <span className={styles.progressLabel}>Custom:</span>
                <Progress value={60} fillChar="=" emptyChar="-" showLabel />
              </div>
              <div className={styles.progressItem}>
                <span className={styles.progressLabel}>Narrow:</span>
                <Progress value={80} width={10} showLabel />
              </div>
            </div>
            <div className={styles.progressControls}>
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
          </Card>
        </section>

        <Divider />

        {/* Radio Buttons */}
        <section className={styles.section}>
          <SectionHeader title="═══ RADIO BUTTONS ═══" docsKey="radio" />
          <Card title="RADIO GROUP">
            <RadioGroup value={radioValue} onValueChange={(value) => setRadioValue(value as string)}>
              <Radio value="option1" label="Option Alpha" />
              <Radio value="option2" label="Option Beta" />
              <Radio value="option3" label="Option Gamma" />
              <Radio value="option4" label="Disabled" disabled />
            </RadioGroup>
          </Card>
        </section>

        <Divider />

        {/* Select */}
        <section className={styles.section}>
          <SectionHeader title="═══ SELECT ═══" docsKey="select" />
          <Card title="SELECT DROPDOWN">
            <Select
              label="OPERATING SYSTEM"
              placeholder="Select OS..."
              value={selectValue}
              onValueChange={(value) => setSelectValue(value as string)}
              options={[
                { value: 'dos', label: 'MS-DOS' },
                { value: 'win31', label: 'Windows 3.1' },
                { value: 'win95', label: 'Windows 95' },
                { value: 'linux', label: 'Linux' },
                { value: 'macos', label: 'macOS' },
              ]}
            />
          </Card>
        </section>

        <Divider />

        {/* Slider */}
        <section className={styles.section}>
          <SectionHeader title="═══ SLIDER ═══" docsKey="slider" />
          <Card title="RANGE INPUT">
            <Slider
              label="VOLUME"
              value={sliderValue}
              onValueChange={(value) => setSliderValue(Array.isArray(value) ? value[0] : value)}
              min={0}
              max={100}
              showValue
            />
          </Card>
        </section>

        <Divider />

        {/* Text Area */}
        <section className={styles.section}>
          <SectionHeader title="═══ TEXT AREA ═══" docsKey="textarea" />
          <Card title="MULTILINE INPUT">
            <TextArea
              label="DESCRIPTION"
              rows={4}
              placeholder="Enter a detailed description..."
            />
          </Card>
        </section>

        <Divider />

        {/* Toggle */}
        <section className={styles.section}>
          <SectionHeader title="═══ TOGGLE ═══" docsKey="toggle" />
          <Card title="TOGGLE SWITCHES">
            <div className={styles.controlGrid}>
              <Toggle
                label="Enable notifications"
                checked={toggleValue}
                onCheckedChange={setToggleValue}
              />
              <Toggle label="Auto-save" defaultChecked />
              <Toggle label="Disabled" disabled />
            </div>
          </Card>
        </section>

        <Divider />

        {/* Tooltip */}
        <section className={styles.section}>
          <SectionHeader title="═══ TOOLTIP ═══" docsKey="tooltip" />
          <Card title="HOVER FOR INFO">
            <div className={styles.tooltipGrid}>
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
        </section>

        <Divider />

        {/* TreeView */}
        <section className={styles.section}>
          <SectionHeader title="═══ TREEVIEW ═══" docsKey="treeview" />
          <Card title="FILE EXPLORER">
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
        </section>

        <Divider />

        {/* Typography */}
        <section className={styles.section}>
          <SectionHeader title="═══ TYPOGRAPHY ═══" docsKey="typography" />
          <Card title="HEADINGS">
            <div className={styles.typographyStack}>
              <Heading level={1}>Heading Level 1</Heading>
              <Heading level={2}>Heading Level 2</Heading>
              <Heading level={3}>Heading Level 3</Heading>
              <Heading level={4}>Heading Level 4</Heading>
              <Heading level={5}>Heading Level 5</Heading>
              <Heading level={6}>Heading Level 6</Heading>
            </div>
          </Card>
          <Card title="DECORATED HEADINGS">
            <div className={styles.typographyStack}>
              <Heading level={2} decorated decorationStyle="double">Double Border</Heading>
              <Heading level={2} decorated decorationStyle="single">Single Border</Heading>
              <Heading level={2} decorated decorationStyle="arrow">Arrow Style</Heading>
            </div>
          </Card>
          <Card title="TEXT VARIANTS">
            <div className={styles.typographyStack}>
              <Text>Default body text for general content and descriptions.</Text>
              <Text variant="secondary">Secondary text for supporting information.</Text>
              <Text variant="muted">Muted text for less important details.</Text>
              <Text variant="caption">Caption text for annotations and metadata.</Text>
            </div>
          </Card>
          <Card title="TEXT SIZES">
            <div className={styles.typographyStack}>
              <Text size="xs">Extra small text (xs)</Text>
              <Text size="sm">Small text (sm)</Text>
              <Text size="md">Medium text (md) - default</Text>
              <Text size="lg">Large text (lg)</Text>
              <Text size="xl">Extra large text (xl)</Text>
            </div>
          </Card>
          <Card title="INLINE CODE">
            <Text>
              Use <Code>npm install tuimorphic</Code> to install the package.
              Press <Code kbd>Ctrl</Code>+<Code kbd>C</Code> to copy.
            </Text>
            <div className={styles.codeVariants}>
              <Text><Code variant="default">default code</Code></Text>
              <Text><Code variant="subtle">subtle code</Code></Text>
              <Text><Code variant="accent">accent code</Code></Text>
            </div>
          </Card>
          <Card title="LABELS">
            <div className={styles.labelGrid}>
              <Label>Default Label</Label>
              <Label required>Required Label</Label>
              <Label optional>Optional Label</Label>
              <Label variant="disabled">Disabled Label</Label>
            </div>
            <div className={styles.labelGrid}>
              <Label size="sm">Small Label</Label>
              <Label size="md">Medium Label</Label>
              <Label size="lg">Large Label</Label>
            </div>
          </Card>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          TUIMORPHIC v0.2.0 • 35 Components • Built with Base UI + SRCL Aesthetics • MIT License
        </p>
      </footer>
    </div>
  );
}
