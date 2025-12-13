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
import styles from './App.module.scss';

export default function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('option1');
  const [toggleValue, setToggleValue] = React.useState(false);
  const [progressValue, setProgressValue] = React.useState(45);
  const [selectValue, setSelectValue] = React.useState('');

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
          <Button theme="SECONDARY" onClick={toggleTheme}>
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
                theme="SECONDARY"
                onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
              >
                - 10%
              </Button>
              <Button
                theme="SECONDARY"
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
                <Button theme="PRIMARY">Save</Button>
              </Tooltip>
              <Tooltip content="Discard all changes" side="bottom">
                <Button theme="SECONDARY">Cancel</Button>
              </Tooltip>
              <Tooltip content="Open settings panel" side="right">
                <Button theme="SECONDARY">Settings</Button>
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
                trigger={<Button theme="PRIMARY">Open Dialog</Button>}
                title="CONFIRM ACTION"
              >
                <p>Are you sure you want to proceed with this action?</p>
                <p>This operation cannot be undone.</p>
                <div className={styles.dialogActions}>
                  <Button theme="PRIMARY">Confirm</Button>
                  <Button theme="SECONDARY">Cancel</Button>
                </div>
              </Dialog>

              <Dialog
                trigger={<Button theme="SECONDARY">System Info</Button>}
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

        {/* Buttons */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ BUTTONS ═══</h2>
          <Card title="BUTTON VARIANTS">
            <div className={styles.buttonGrid}>
              <div className={styles.buttonExample}>
                <span className={styles.label}>PRIMARY:</span>
                <Button theme="PRIMARY">Submit</Button>
              </div>
              <div className={styles.buttonExample}>
                <span className={styles.label}>SECONDARY:</span>
                <Button theme="SECONDARY">Cancel</Button>
              </div>
              <div className={styles.buttonExample}>
                <span className={styles.label}>DISABLED:</span>
                <Button isDisabled>Disabled</Button>
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
          TUIMORPHIC v0.2.0 • 13 Components • Built with Base UI + SRCL Aesthetics • MIT License
        </p>
      </footer>
    </div>
  );
}
