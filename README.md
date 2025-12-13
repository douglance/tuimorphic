# Tuimorphic

Terminal-aesthetic React components built on [Base UI](https://base-ui.com/) with styling inspired by [SRCL/Sacred Computer](https://sacred.computer).

![Tuimorphic Demo](tuimorphic-screenshot.png)

## Features

- **37 accessible components** built on Base UI primitives
- **Light/dark themes** with 7 color tints
- **Terminal aesthetic** with box-drawing characters and monospace typography
- **TypeScript-first** with full type definitions
- **SCSS Modules** for scoped, customizable styling
- **GNU Unifont** monospace font included
- **React Server Components** compatible (`'use client'` directives)
- **WAI-ARIA compliant** with full keyboard navigation

## Installation

```bash
npm install tuimorphic
# or
pnpm add tuimorphic
# or
yarn add tuimorphic
```

### Peer Dependencies

```bash
npm install react react-dom
```

## Quick Start

```tsx
import { Button, Card, Input, Badge } from 'tuimorphic';
import 'tuimorphic/dist/styles.css';

export default function App() {
  return (
    <Card title="LOGIN">
      <Input label="USERNAME" placeholder="Enter username" />
      <Input label="PASSWORD" type="password" placeholder="Enter password" />
      <Button variant="primary">Submit</Button>
      <Badge variant="success">Online</Badge>
    </Card>
  );
}
```

## Theming

### Light/Dark Mode

Apply theme classes to the `body` element:

```tsx
// Dark theme (default)
document.body.className = 'theme-dark';

// Light theme
document.body.className = 'theme-light';
```

### Color Tints

Add accent color tints alongside your theme:

```tsx
// Dark theme with green accent
document.body.className = 'theme-dark tint-green';
```

**Available tints:** `tint-green`, `tint-blue`, `tint-red`, `tint-yellow`, `tint-purple`, `tint-orange`, `tint-pink`

### CSS Custom Properties

Override theme tokens in your CSS:

```css
:root {
  --theme-background: #000000;
  --theme-text: #ffffff;
  --theme-border: #404040;
  --theme-accent: oklch(0.65 0.2 145);
  --font-family-mono: 'Unifont', monospace;
}
```

## Components

### Form Controls

| Component | Description |
|-----------|-------------|
| `Button` | Primary action button with variants |
| `Input` | Text input with label support |
| `TextArea` | Multi-line text input |
| `Checkbox` | Checkbox with label |
| `RadioGroup` | Radio button group |
| `Toggle` | Toggle switch |
| `Select` | Dropdown select |
| `ComboBox` | Searchable combobox |
| `DatePicker` | Date selection input |
| `Slider` | Range slider |

### Feedback

| Component | Description |
|-----------|-------------|
| `Alert` | Alert messages with variants |
| `Badge` | Status badges |
| `Progress` | Progress indicator |
| `Tooltip` | Hover tooltips |
| `BarLoader` | Animated bar loader |
| `BlockLoader` | Block-style loader |

### Overlays

| Component | Description |
|-----------|-------------|
| `Dialog` | Modal dialog |
| `Drawer` | Slide-out drawer panel |
| `Menu` | Dropdown menu |
| `Popover` | Popover with positioning |

### Layout

| Component | Description |
|-----------|-------------|
| `Card` | Content card with title |
| `CardDouble` | Two-column card layout |
| `Divider` | Horizontal/vertical divider |
| `Grid` | CSS grid wrapper |
| `Tabs` | Tab navigation |
| `Accordion` | Expandable sections |
| `Table` | Data table |
| `SidebarLayout` | Sidebar page layout |

### Data Display

| Component | Description |
|-----------|-------------|
| `CodeBlock` | Syntax-highlighted code |
| `TreeView` | Hierarchical tree |
| `Message` / `MessageList` | Chat-style messages |
| `Avatar` | User avatar |

### Navigation

| Component | Description |
|-----------|-------------|
| `Navigation` | Navigation menu |
| `BreadCrumbs` | Breadcrumb trail |
| `ActionBar` | Action button bar |
| `ActionButton` | Icon action button |

## Component Examples

### Dialog

```tsx
import { Dialog, Button } from 'tuimorphic';

function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button>Open Dialog</Button>} />
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>Confirm Action</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to proceed?
          </Dialog.Description>
          <Dialog.Close render={<Button>Close</Button>} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### Tabs

```tsx
import { Tabs } from 'tuimorphic';

function Example() {
  return (
    <Tabs defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Details</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Overview content here</Tabs.Content>
      <Tabs.Content value="tab2">Details content here</Tabs.Content>
      <Tabs.Content value="tab3">Settings content here</Tabs.Content>
    </Tabs>
  );
}
```

### Accordion

```tsx
import { Accordion } from 'tuimorphic';

function Example() {
  return (
    <Accordion.Root>
      <Accordion.Item value="item1">
        <Accordion.Header>
          <Accordion.Trigger>Section One</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Content for section one</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item2">
        <Accordion.Header>
          <Accordion.Trigger>Section Two</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Content for section two</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
```

### Table

```tsx
import { Table } from 'tuimorphic';

function Example() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Alice</Table.Cell>
          <Table.Cell>Active</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Bob</Table.Cell>
          <Table.Cell>Inactive</Table.Cell>
          <Table.Cell>User</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
```

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build library
pnpm build

# Build demo app
pnpm build:demo

# Type check
pnpm lint

# Deploy demo to Cloudflare Pages
pnpm deploy
```

## Project Structure

```
src/
├── components/          # 37 component directories
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.scss
│   │   └── index.ts
│   └── ...
├── styles/
│   └── global.css       # Theme tokens and global styles
├── fonts/
│   └── Unifont.woff2    # Monospace font
├── utils/
│   └── classNames.ts    # Class merging utility
├── example/
│   ├── App.tsx          # Demo application
│   └── main.tsx
└── index.ts             # Library exports
```

## TypeScript

All components export their props interfaces:

```tsx
import { Button, type ButtonProps } from 'tuimorphic';

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} className="custom-styles" />;
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Acknowledgments

- [Base UI](https://base-ui.com/) - Unstyled, accessible React components
- [SRCL/Sacred Computer](https://sacred.computer) - Design inspiration
- [GNU Unifont](http://unifoundry.com/unifont/) - Monospace font

## License

MIT
