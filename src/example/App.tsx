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
import styles from './App.module.scss';

export default function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('option1');
  const [toggleValue, setToggleValue] = React.useState(false);
  const [progressValue, setProgressValue] = React.useState(45);
  const [selectValue, setSelectValue] = React.useState('');
  const [comboValue, setComboValue] = React.useState('');
  const [sliderValue, setSliderValue] = React.useState(50);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = `theme-${newTheme}`;
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
          <Button variant="secondary" onClick={toggleTheme}>
            Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        {/* Badges */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ BADGES ═══</h2>
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

        {/* Form Controls */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ FORM CONTROLS ═══</h2>

          <Card title="CHECKBOX">
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

          <Card title="RADIO GROUP">
            <RadioGroup value={radioValue} onValueChange={setRadioValue}>
              <Radio value="option1" label="Option Alpha" />
              <Radio value="option2" label="Option Beta" />
              <Radio value="option3" label="Option Gamma" />
              <Radio value="option4" label="Disabled" disabled />
            </RadioGroup>
          </Card>

          <Card title="TOGGLE SWITCH">
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

          <Card title="SELECT DROPDOWN">
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
        </section>

        <Divider />

        {/* Text Inputs */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ TEXT INPUTS ═══</h2>

          <Card title="INPUT FIELDS">
            <div className={styles.inputGrid}>
              <Input label="USERNAME" placeholder="Enter username" />
              <Input label="PASSWORD" type="password" placeholder="Enter password" />
            </div>
          </Card>

          <Card title="TEXT AREA">
            <TextArea
              label="DESCRIPTION"
              rows={4}
              placeholder="Enter a detailed description..."
            />
          </Card>
        </section>

        <Divider />

        {/* Progress */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ PROGRESS ═══</h2>
          <Card title="PROGRESS BARS">
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

        {/* Tooltips */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ TOOLTIPS ═══</h2>
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

        {/* Dialogs */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ DIALOGS ═══</h2>
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
                <p>Components: 13</p>
                <p>Theme: {theme}</p>
                <p>Status: <Badge variant="success">Active</Badge></p>
              </Dialog>
            </div>
          </Card>
        </section>

        <Divider />

        {/* Accordion */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ ACCORDION ═══</h2>
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

        {/* Action Bar & Buttons */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ ACTION BAR ═══</h2>
          <Card title="TOOLBAR WITH HOTKEYS">
            <ActionBar align="start">
              <ActionButton hotkey="⌘S" variant="primary">Save</ActionButton>
              <ActionButton hotkey="⌘Z">Undo</ActionButton>
              <ActionButton hotkey="⌘Y">Redo</ActionButton>
              <ActionButton hotkey="⌘C">Copy</ActionButton>
              <ActionButton hotkey="⌘V">Paste</ActionButton>
            </ActionBar>
          </Card>
          <Card title="ACTION BUTTON STATES">
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

        {/* Popover */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ POPOVER ═══</h2>
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

        {/* Drawer */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ DRAWER ═══</h2>
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

        {/* Table */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ TABLE ═══</h2>
          <Card title="DATA TABLE">
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

        {/* Navigation Components */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ NAVIGATION ═══</h2>
          <Card title="NAVIGATION BAR">
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
          <Card title="BREADCRUMBS">
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

        {/* Avatar */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ AVATAR ═══</h2>
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

        {/* CodeBlock */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ CODE BLOCK ═══</h2>
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
          <h2 className={styles.sectionTitle}>═══ COMBOBOX ═══</h2>
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

        {/* TreeView */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ TREE VIEW ═══</h2>
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

        {/* DatePicker */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ DATE PICKER ═══</h2>
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

        {/* Message */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ MESSAGES ═══</h2>
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

        {/* Loaders */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ LOADERS ═══</h2>
          <Card title="LOADING INDICATORS">
            <div className={styles.progressGrid}>
              <div className={styles.progressItem}>
                <span className={styles.progressLabel}>Bar:</span>
                <BarLoader progress={65} />
              </div>
              <div className={styles.progressItem}>
                <span className={styles.progressLabel}>Block:</span>
                <BlockLoader />
              </div>
              <div className={styles.progressItem}>
                <span className={styles.progressLabel}>Dots:</span>
                <BlockLoader mode={11} />
              </div>
            </div>
          </Card>
        </section>

        <Divider />

        {/* Slider */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ SLIDER ═══</h2>
          <Card title="RANGE INPUT">
            <Slider
              label="VOLUME"
              value={sliderValue}
              onValueChange={setSliderValue}
              min={0}
              max={100}
              showValue
            />
          </Card>
        </section>

        <Divider />

        {/* CardDouble */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ CARD DOUBLE ═══</h2>
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

        {/* Grid */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ GRID ═══</h2>
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

        {/* Buttons */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ BUTTONS ═══</h2>
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
          <h2 className={styles.sectionTitle}>═══ CARDS ═══</h2>
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
