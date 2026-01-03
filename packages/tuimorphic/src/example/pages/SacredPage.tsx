import React from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Checkbox } from '../../components/Checkbox';
import { RadioGroup, Radio } from '../../components/Radio';
import { Progress } from '../../components/Progress';
import { Input } from '../../components/Input';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/Accordion';
import { ActionButton } from '../../components/ActionButton';
import { ActionBar } from '../../components/ActionBar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/Table';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Avatar } from '../../components/Avatar';
import { CodeBlock } from '../../components/CodeBlock';
import { ComboBox } from '../../components/ComboBox';
import { DatePicker } from '../../components/DatePicker';
import { Message, MessageList } from '../../components/Message';
import { BarLoader, BlockLoader } from '../../components/Loader';
import { Slider } from '../../components/Slider';
import { CardDouble, CardDoubleInner } from '../../components/CardDouble';
import { Drawer } from '../../components/Drawer';
import { Select } from '../../components/Select';
import { TreeView } from '../../components/TreeView';
import { Navigation } from '../../components/Navigation';
import styles from './SacredPage.module.scss';

export default function SacredPage() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');
  const [comboValue, setComboValue] = React.useState('');
  const [sliderValue, setSliderValue] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date(2012, 11, 21));
  const [selectValue, setSelectValue] = React.useState('trex');
  const [radioValue, setRadioValue] = React.useState('kernel');

  // Set dark theme on mount
  React.useEffect(() => {
    document.body.className = 'theme-dark';
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = `theme-${newTheme}`;
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.title}>SRCL</span>
          <Badge variant="info">1.1.17</Badge>
        </div>
        <p className={styles.description}>
          SRCL is an open-source React component and style repository that helps you build web applications, desktop applications, and static websites with terminal aesthetics.
        </p>

        <ActionBar align="start">
          <ActionButton hotkey="⌃+O">FONTS</ActionButton>
          <ActionButton hotkey="⌃+A">APPEARANCE</ActionButton>
          <ActionButton hotkey="⌃+T" onClick={toggleTheme}>MODE</ActionButton>
          <ActionButton hotkey="⌃+G">GRID</ActionButton>
        </ActionBar>

        <div className={styles.actionLinks}>
          <a href="https://internet.dev/" className={styles.actionLink}>
            <span className={styles.arrow}>⭢</span>
            Hire our studio to build your applications
          </a>
          <a href="https://github.com/internet-development/www-sacred" className={styles.actionLink}>
            <span className={styles.arrow}>⭢</span>
            View the SRCL source code
          </a>
          <a href="https://vercel.com/home" className={styles.actionLink}>
            <span className={styles.arrow}>⭢</span>
            Try our hosting provider Vercel
          </a>
        </div>
      </header>

      <main className={styles.main}>
        {/* Action Bar Section */}
        <Accordion defaultValue={['action-bar', 'accordion', 'action-buttons', 'avatars', 'badges', 'bar-loader', 'block-loader', 'breadcrumbs', 'buttons', 'cards', 'checkbox', 'code-blocks', 'combobox', 'data-table', 'date-picker', 'dialog', 'drawer', 'input', 'messages', 'navigation', 'progress', 'radio', 'select', 'slider', 'treeview']}>

          <AccordionItem value="action-bar">
            <AccordionTrigger>ACTION BAR</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                The action bar is a container for primary and secondary actions styled with a monospace font. Positioned at the top or bottom of an interface, it organizes elements like menu options, navigation buttons, titles, or search fields.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <ActionBar align="start">
                <ActionButton hotkey="⌘+1" variant="primary">EXAMPLE I</ActionButton>
                <ActionButton hotkey="⌘+2">EXAMPLE II</ActionButton>
                <ActionButton hotkey="⌘+3">EXAMPLE III</ActionButton>
              </ActionBar>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="accordion">
            <AccordionTrigger>ACCORDION</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Accordion components are vertically stacked, expandable panels designed for efficient use of space in monospace-driven layouts, often inspired by classic terminal interfaces. Each panel consists of a header and its corresponding content area, allowing users to toggle between a condensed summary and detailed information.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <Accordion>
                <AccordionItem value="nested-example">
                  <AccordionTrigger>ACCORDION EXAMPLE</AccordionTrigger>
                  <AccordionContent>
                    <p>This is nested accordion content demonstrating the component.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="action-buttons">
            <AccordionTrigger>ACTION BUTTONS</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Action buttons let users perform actions. They are used for task-based options within a workflow and work well in interfaces where buttons need to stay understated.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <div className={styles.buttonStack}>
                <ActionButton hotkey="⌘+S" variant="primary">SAVE</ActionButton>
                <ActionButton loading>LOADING</ActionButton>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="avatars">
            <AccordionTrigger>AVATARS</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Avatars identify users or entities in the interface. It can display an image, initials, or an icon, offering a visual connection to the user. Avatars appear in headers, comments, profiles, and messages. They provide quick recognition and add a personal touch to the digital experience.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <div className={styles.avatarGrid}>
                <Avatar src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Andrew" alt="Andrew" />
                <Avatar src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Ana" alt="Ana" />
                <Avatar src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Elijah" alt="Elijah" />
                <Avatar src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Caidan" alt="Caidan" />
                <Avatar src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Chenyu" alt="Chenyu" />
                <Avatar src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Hannah" alt="Hannah" />
                <Avatar src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Louanne" alt="Louanne" />
                <Avatar src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Jimmy" alt="Jimmy" />
              </div>
              <div className={styles.teamGrid}>
                <div className={styles.teamMember}>
                  <span className={styles.teamName}>ANDREW ALIMBUYUGUEN</span>
                  <span className={styles.teamRole}>Webmaster</span>
                </div>
                <div className={styles.teamMember}>
                  <span className={styles.teamName}>ANASTASIYA URALEVA</span>
                  <span className={styles.teamRole}>Webmaster</span>
                </div>
                <div className={styles.teamMember}>
                  <span className={styles.teamName}>ELIJAH SEED ARITA</span>
                  <span className={styles.teamRole}>Webmaster</span>
                </div>
                <div className={styles.teamMember}>
                  <span className={styles.teamName}>JIMMY LEE</span>
                  <span className={styles.teamRole}>Staff Janitor</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="badges">
            <AccordionTrigger>BADGES</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Badges communicate status, notification counts, or attribute labels. Typically circular or pill-shaped, they display a number or short text, often overlaid on an icon or element. Badges highlight updates, unread messages, or categorize items with status indicators.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <div className={styles.badgeRow}>
                <Badge>EXAMPLE</Badge>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="bar-loader">
            <AccordionTrigger>BAR LOADER</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                A long loader is a visual element that signals ongoing activity or progress, reassuring users that a task is being processed. Commonly used during actions like data fetching or file uploads, it provides feedback to reduce uncertainty.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <BarLoader progress={65} />
              <br />
              <BarLoader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="block-loader">
            <AccordionTrigger>BLOCK LOADER</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                A block loader is a visual indicator that signals ongoing activity or progress while occupying only a single character of space. It reassures users that a task is being processed or that activity is occurring.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <div className={styles.loaderGrid}>
                <BlockLoader mode={0} />
                <BlockLoader mode={1} />
                <BlockLoader mode={2} />
                <BlockLoader mode={3} />
                <BlockLoader mode={4} />
                <BlockLoader mode={5} />
                <BlockLoader mode={6} />
                <BlockLoader mode={7} />
                <BlockLoader mode={8} />
                <BlockLoader mode={9} />
                <BlockLoader mode={10} />
                <BlockLoader mode={11} />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="breadcrumbs">
            <AccordionTrigger>BREADCRUMBS</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Breadcrumbs display the current page or context within a website or application. They show the hierarchy and navigation path, helping users understand their location.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <BreadCrumbs
                items={[
                  { label: 'Philosophical Taoism', href: 'https://en.wikipedia.org/wiki/Taoist_philosophy' },
                  { label: 'Ursula K. Le Guin', href: 'https://en.wikipedia.org/wiki/Ursula_K._Le_Guin' },
                  { label: 'The Lathe of Heaven', href: 'https://en.wikipedia.org/wiki/The_Lathe_of_Heaven' },
                ]}
              />
              <br />
              <BreadCrumbs
                items={[
                  { label: '161 AD', href: 'https://en.wikipedia.org/wiki/161' },
                  { label: 'Nerva–Antonine dynasty', href: '#' },
                  { label: 'Marcus Aurelius Antoninus', href: '#' },
                  { label: 'The Meditations' },
                ]}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="buttons">
            <AccordionTrigger>BUTTONS</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Button components are essential interactive elements within SRCL, facilitating actions like navigation, form submission, and command execution.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <div className={styles.buttonStack}>
                <Button variant="primary">PRIMARY BUTTON</Button>
                <Button variant="secondary">SECONDARY BUTTON</Button>
                <Button disabled>DISABLED BUTTON</Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cards">
            <AccordionTrigger>CARDS</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Cards are MS-DOS–inspired sections designed to group related content and actions. They can serve as standalone features or function as part of a larger application.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <div className={styles.cardGrid}>
                <Card title="Left-A" mode="left">
                  <Card title="Right-B" mode="right">
                    <Card title="C" mode="center">
                      <p>To seek the timeless way we must first know the quality without a name. There is a central quality which is the root criterion of life and spirit in a man, a town, a building, or a wilderness.</p>
                    </Card>
                  </Card>
                </Card>
              </div>
              <CardDouble title="SYSTEM STATUS">
                <CardDoubleInner title="CPU">
                  <p>The structure of life I have described in buildings - the structure which I believe to be objective - is deeply and inextricably connected with the human person.</p>
                </CardDoubleInner>
                <CardDoubleInner title="MEMORY">
                  <p>We are searching for some kind of harmony between two intangibles: a form which we have not yet designed and a context which we cannot properly describe.</p>
                </CardDoubleInner>
              </CardDouble>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="checkbox">
            <AccordionTrigger>CHECKBOX</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Checkboxes represent a binary choice, letting users toggle options on or off. Each Checkbox operates independently, allowing multiple selections without affecting others.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <div className={styles.checkboxList}>
                <Checkbox label="The past, though a tutor, is not a thing to lament, but a wellspring of wisdom from which we draw without regret." />
                <Checkbox label="A measure of obsession doth sharpen the will, for the long path, though beset with trials, leadeth ever toward glories." />
                <Checkbox label="Kindness and gratitude must light our way in all dealings, regardless of circumstance." />
                <Checkbox label="Stand firm beside thy fellow for shared triumph is the sweetest of all." />
                <Checkbox label="Let us strive that design be not a mere ornament to the world, but a worthy service to humanity itself." />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="code-blocks">
            <AccordionTrigger>CODE BLOCKS</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Code blocks display code examples clearly and concisely, making them easy to read, copy, and use. This version has line numbers that are not user selectable.
              </p>
              <h2 className={styles.exampleTitle}>CODE</h2>
              <CodeBlock
                language="cpp"
                showLineNumbers
                code={`#include <iostream>
#include <string>
#include <thread>
#include <asio.hpp>

using asio::ip::tcp;

void handle_client(tcp::socket socket) {
    try {
        std::string message =
            "HTTP/1.1 200 OK\\r\\n"
            "Content-Type: text/plain\\r\\n"
            "Connection: close\\r\\n"
            "\\r\\n"
            "Hello, World!";
        asio::write(socket, asio::buffer(message));
    } catch (...) {}
}

int main() {
    asio::io_context context;
    tcp::acceptor acceptor(context,
        tcp::endpoint(tcp::v4(), 8080));
    std::cout << "Server running on port 8080...\\n";
    while (true) {
        tcp::socket socket(context);
        acceptor.accept(socket);
        std::thread(handle_client, std::move(socket)).detach();
    }
    return 0;
}`}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="combobox">
            <AccordionTrigger>COMBOBOX</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Comboboxes combine a list with an editable textbox, allowing users to select from a list or input data manually. It offers flexibility and autocomplete features.
              </p>
              <h2 className={styles.exampleTitle}>COMBOBOX</h2>
              <ComboBox
                label="SEARCH THE WORLD"
                placeholder="Search..."
                value={comboValue}
                onValueChange={setComboValue}
                options={[
                  { value: 'grand-canyon', label: 'Grand Canyon' },
                  { value: 'amazon', label: 'Amazon Rainforest' },
                  { value: 'rockies', label: 'Rocky Mountains' },
                  { value: 'gobi', label: 'Gobi Desert' },
                  { value: 'andes', label: 'Andes Mountains' },
                ]}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-table">
            <AccordionTrigger>DATA TABLE</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Data tables are for organizing large datasets into rows and columns for clear visibility and easy interpretation. Features like sorting, filtering, pagination, and inline editing make data handling more efficient.
              </p>
              <h2 className={styles.exampleTitle}>STATIC</h2>
              <Table bordered>
                <TableHeader>
                  <TableRow>
                    <TableHead>NAME</TableHead>
                    <TableHead>SYMBOL</TableHead>
                    <TableHead align="right">PRICE</TableHead>
                    <TableHead align="right">HOLDINGS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Bat</TableCell>
                    <TableCell>BAT</TableCell>
                    <TableCell align="right" numeric>$9.01</TableCell>
                    <TableCell align="right" numeric>400</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bear</TableCell>
                    <TableCell>BR</TableCell>
                    <TableCell align="right" numeric>$56.78</TableCell>
                    <TableCell align="right" numeric>200</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dolphin</TableCell>
                    <TableCell>DLP</TableCell>
                    <TableCell align="right" numeric>$77.89</TableCell>
                    <TableCell align="right" numeric>50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Eagle</TableCell>
                    <TableCell>EGL</TableCell>
                    <TableCell align="right" numeric>$45.67</TableCell>
                    <TableCell align="right" numeric>90</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fox</TableCell>
                    <TableCell>FOX</TableCell>
                    <TableCell align="right" numeric>$12.34</TableCell>
                    <TableCell align="right" numeric>100</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lion</TableCell>
                    <TableCell>LION</TableCell>
                    <TableCell align="right" numeric>$67.89</TableCell>
                    <TableCell align="right" numeric>80</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Whale</TableCell>
                    <TableCell>WHL</TableCell>
                    <TableCell align="right" numeric>$123.45</TableCell>
                    <TableCell align="right" numeric>30</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="date-picker">
            <AccordionTrigger>DATE PICKER</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                A date picker is a UI control for selecting dates, and sometimes time, through a visual calendar interface inspired by MS-DOS.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <DatePicker
                value={selectedDate}
                onValueChange={setSelectedDate}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="dialog">
            <AccordionTrigger>DIALOG</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Dialog components overlay the main content—reminiscent of early graphical interfaces—to capture a user's focus for tasks requiring input, a choice, or confirmation.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <Card title="FAREWELL" mode="center">
                <p>There are unsaved changes.</p>
                <p>Are you sure you want to start the new year?</p>
                <div className={styles.dialogButtons}>
                  <Button variant="primary">OK</Button>
                  <Button variant="secondary">CANCEL</Button>
                </div>
              </Card>
              <br />
              <Card title="GOODBYE" mode="center">
                <p>The 2024 session is nearly out of time.</p>
                <p>Save progress and load 2025?</p>
                <div className={styles.dialogButtons}>
                  <Button variant="primary">OK</Button>
                  <Button variant="secondary">CANCEL</Button>
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="drawer">
            <AccordionTrigger>DRAWER</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                A drawer is a panel that slides in from the screen edge, providing space for secondary content, actions, or navigation links while keeping the main content uninterrupted.
              </p>
              <h2 className={styles.exampleTitle}>INTRO(1)</h2>
              <div className={styles.drawerExample}>
                <Drawer
                  trigger={<Button variant="secondary">⭢</Button>}
                  side="right"
                  title="INTRODUCTION"
                >
                  <p>Section 1 of the manual describes user commands and tools, for example, file manipulation tools, shells, compilers, web browsers, file and image viewers and editors, and so on.</p>
                </Drawer>
                <p className={styles.drawerText}>
                  Section 1 of the manual describes user commands and tools, for example, file manipulation tools, shells, compilers, web browsers, file and image viewers and editors, and so on. All commands yield a status value on termination.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="input">
            <AccordionTrigger>INPUT</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                An input field is a fundamental UI component that allows users to enter and edit text or numerical data. It is commonly used in forms, search bars, and other interfaces requiring user input.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <div className={styles.inputStack}>
                <Input label="MULTIPLE INPUTS" placeholder="" />
                <Input placeholder="" />
                <Input placeholder="" />
                <Input label="EMPTY CASE" placeholder="" />
                <Input label="PLACEHOLDER" placeholder="All the world is a stage" />
                <Input label="PASSWORD" type="password" placeholder="" />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="messages">
            <AccordionTrigger>MESSAGES</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Messages in this library present a modern messaging experience through an MS-DOS–inspired aesthetic. Instead of rounded speech bubbles, messages appear in simple rectangular boxes.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <MessageList>
                <Message author="DOM" position="left" timestamp="">
                  You create the world of the dream, you bring the subject into that dream, and they fill it with their subconscious.
                </Message>
                <Message author="ARIADNE" position="right" timestamp="">
                  How could I ever acquire enough detail to make them think that its reality?
                </Message>
                <Message author="DOM" position="left" timestamp="">
                  Well dreams, they feel real while we're in them, right? It's only when we wake up that we realize how things are actually strange.
                </Message>
                <Message author="DOM" position="left" timestamp="">
                  Let me ask you a question, you never really remember the beginning of a dream do you? You always wind up right in the middle of what's going on.
                </Message>
                <Message author="ARIADNE" position="right" timestamp="">
                  I guess, yeah.
                </Message>
                <Message author="DOM" position="left" timestamp="">
                  So how did we end up here?
                </Message>
              </MessageList>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="navigation">
            <AccordionTrigger>NAVIGATION BAR</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Navigation bars enable smooth transitions between top-level destinations in an app, using icons and text labels to represent sections.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <Navigation
                logo="✶"
                items={[
                  { label: 'NAVIGATION ITEM A', href: '#' },
                  { label: 'NAVIGATION ITEM B', href: '#' },
                ]}
                actions={<Button variant="secondary">SIGN IN</Button>}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="progress">
            <AccordionTrigger>PROGRESS BARS</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Progress bars are visual indicators that display the completion status of tasks or processes. Ours allow for custom fill characters.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <div className={styles.progressStack}>
                <div className={styles.progressRow}>
                  <span className={styles.progressLabel}>0%</span>
                  <Progress value={0} width={30} />
                </div>
                <div className={styles.progressRow}>
                  <span className={styles.progressLabel}>25%</span>
                  <Progress value={25} width={30} />
                </div>
                <div className={styles.progressRow}>
                  <span className={styles.progressLabel}>50%</span>
                  <Progress value={50} width={30} />
                </div>
                <div className={styles.progressRow}>
                  <span className={styles.progressLabel}>75%</span>
                  <Progress value={75} width={30} />
                </div>
                <div className={styles.progressRow}>
                  <span className={styles.progressLabel}>100%</span>
                  <Progress value={100} width={30} />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="radio">
            <AccordionTrigger>RADIO BUTTONS</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Radio buttons are visual controls that let users make a single selection from a predefined set of mutually exclusive options.
              </p>
              <h2 className={styles.exampleTitle}>METHOD</h2>
              <p>You're at the very beginning of designing your operating system. How do you choose to start?</p>
              <RadioGroup value={radioValue} onValueChange={(value) => setRadioValue(value as string)}>
                <Radio value="kernel" label="Custom Linux Kernel Derivative: Start with a minimal Linux kernel, integrate essential device drivers, and build out a tailored init process." />
                <Radio value="aosp" label="AOSP Base: Leverage an AOSP-derived HAL and system services, using BSP integration and existing frameworks." />
                <Radio value="microkernel" label="Microkernel Approach: Implement a microkernel (e.g., seL4) to strictly separate core services." />
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="select">
            <AccordionTrigger>SELECT</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Select components are user interface controls that let users choose an option from a dropdown list. They display a list of options and collapse to show the selected choice.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <p>What is your favorite dinosaur?</p>
              <Select
                value={selectValue}
                onValueChange={(value) => setSelectValue(value as string)}
                options={[
                  { value: 'trex', label: 'T-Rex' },
                  { value: 'velociraptor', label: 'Velociraptor' },
                  { value: 'triceratops', label: 'Triceratops' },
                  { value: 'stegosaurus', label: 'Stegosaurus' },
                  { value: 'brachiosaurus', label: 'Brachiosaurus' },
                ]}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="slider">
            <AccordionTrigger>SLIDER</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                Sliders are interactive UI elements that let users select a single value or range from a continuum. Designed as a horizontal track with a draggable handle.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
              <div className={styles.sliderStack}>
                <Slider
                  label=""
                  value={sliderValue}
                  onValueChange={(value) => setSliderValue(Array.isArray(value) ? value[0] : value)}
                  min={0}
                  max={5000}
                  showValue
                />
                <Slider
                  label=""
                  value={sliderValue}
                  onValueChange={(value) => setSliderValue(Array.isArray(value) ? value[0] : value)}
                  min={0}
                  max={10000}
                  showValue
                />
                <Slider
                  label=""
                  value={sliderValue}
                  onValueChange={(value) => setSliderValue(Array.isArray(value) ? value[0] : value)}
                  min={0}
                  max={100000}
                  showValue
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="treeview">
            <AccordionTrigger>TREEVIEW</AccordionTrigger>
            <AccordionContent>
              <p className={styles.componentDescription}>
                TreeView components display hierarchical data in an expandable tree structure, allowing users to navigate through nested items.
              </p>
              <h2 className={styles.exampleTitle}>EXAMPLE</h2>
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
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.actionLinks}>
          <a href="https://internet.dev/" className={styles.actionLink}>
            <span className={styles.arrow}>⭢</span>
            Hire our studio to build your applications
          </a>
          <a href="https://github.com/internet-development/www-sacred" className={styles.actionLink}>
            <span className={styles.arrow}>⭢</span>
            View the SRCL source code
          </a>
          <a href="https://vercel.com/home" className={styles.actionLink}>
            <span className={styles.arrow}>⭢</span>
            Try our hosting provider Vercel
          </a>
        </div>
      </footer>
    </div>
  );
}
