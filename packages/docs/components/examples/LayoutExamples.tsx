'use client';

import { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Card,
  CardDouble,
  CardDoubleInner,
  Divider,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  SidebarLayout,
} from 'tuimorphic';

// ============================================================================
// Tabs Examples
// ============================================================================

export function TabsBasic() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p>Welcome to the overview panel. This tab displays general information about the system.</p>
      </TabsContent>
      <TabsContent value="features">
        <p>Explore the available features. Terminal aesthetics, monospace fonts, and more.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p>Configure your preferences here. Adjust themes, colors, and display options.</p>
      </TabsContent>
    </Tabs>
  );
}

export function TabsControlled() {
  const [activeTab, setActiveTab] = useState<string | number | null>('tab1');

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <span>Current tab:</span>
        <code className="px-2 py-1 bg-[var(--theme-border)]">{String(activeTab)}</code>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="tab1">First</TabsTrigger>
          <TabsTrigger value="tab2">Second</TabsTrigger>
          <TabsTrigger value="tab3">Third</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content for the first tab.</TabsContent>
        <TabsContent value="tab2">Content for the second tab.</TabsContent>
        <TabsContent value="tab3">Content for the third tab.</TabsContent>
      </Tabs>
    </div>
  );
}

// ============================================================================
// Accordion Examples
// ============================================================================

export function AccordionBasic() {
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Tuimorphic?</AccordionTrigger>
        <AccordionContent>
          Tuimorphic is a terminal-aesthetic React component library built on Base UI,
          inspired by the SRCL/Sacred Computer design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>
          Install via npm or pnpm: <code>npm install tuimorphic</code> or <code>pnpm add tuimorphic</code>.
          Then import and use the components in your React application.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes! Tuimorphic is built on Base UI, which provides fully accessible primitives
          following WAI-ARIA patterns out of the box.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function AccordionDefaultOpen() {
  return (
    <Accordion defaultValue={['faq-1']}>
      <AccordionItem value="faq-1">
        <AccordionTrigger>This section is open by default</AccordionTrigger>
        <AccordionContent>
          Use the defaultValue prop with an array of item values to control which
          accordion items are expanded when the component first renders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2">
        <AccordionTrigger>This section starts collapsed</AccordionTrigger>
        <AccordionContent>
          Click the trigger to expand this section. Multiple sections can be open
          at once unless you set type=&quot;single&quot;.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-3">
        <AccordionTrigger>Another collapsed section</AccordionTrigger>
        <AccordionContent>
          The accordion supports both controlled and uncontrolled modes for
          managing open state.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function AccordionSingleMode() {
  return (
    <Accordion type="single" defaultValue={['section-1']}>
      <AccordionItem value="section-1">
        <AccordionTrigger>Section One</AccordionTrigger>
        <AccordionContent>
          In single mode, only one section can be open at a time.
          Opening another section will automatically close this one.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="section-2">
        <AccordionTrigger>Section Two</AccordionTrigger>
        <AccordionContent>
          This behavior is useful for FAQ pages or settings panels where
          you want to focus attention on one item at a time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="section-3">
        <AccordionTrigger>Section Three</AccordionTrigger>
        <AccordionContent>
          Set type=&quot;single&quot; on the Accordion root to enable this mode.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// ============================================================================
// Card Examples
// ============================================================================

export function CardBasic() {
  return (
    <Card>
      <p>A simple card without a title. Use cards to group related content.</p>
    </Card>
  );
}

export function CardWithTitle() {
  return (
    <Card title="SYSTEM STATUS">
      <p>All systems operational.</p>
      <p>Last checked: 2024-01-15 14:32:00 UTC</p>
    </Card>
  );
}

export function CardModes() {
  return (
    <div className="space-y-4">
      <Card title="LEFT ALIGNED" mode="left">
        <p>Title aligned to the left with corner decoration.</p>
      </Card>
      <Card title="CENTER ALIGNED" mode="center">
        <p>Title centered (default mode).</p>
      </Card>
      <Card title="RIGHT ALIGNED" mode="right">
        <p>Title aligned to the right with corner decoration.</p>
      </Card>
    </div>
  );
}

// ============================================================================
// Divider Examples
// ============================================================================

export function DividerBasic() {
  return (
    <div className="space-y-4">
      <p>Content above the divider.</p>
      <Divider />
      <p>Content below the divider.</p>
    </div>
  );
}

export function DividerVertical() {
  return (
    <div className="flex items-center gap-4 h-16">
      <span>Left content</span>
      <Divider orientation="vertical" />
      <span>Right content</span>
    </div>
  );
}

export function DividerInCard() {
  return (
    <Card title="USER PROFILE">
      <div className="space-y-2">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Role:</strong> Administrator</p>
      </div>
      <Divider className="my-4" />
      <div className="space-y-2">
        <p><strong>Email:</strong> john@example.com</p>
        <p><strong>Status:</strong> Active</p>
      </div>
    </Card>
  );
}

// ============================================================================
// Table Examples
// ============================================================================

export function TableBasic() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Charlie</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function TableBordered() {
  return (
    <Table bordered>
      <TableCaption>Server Status Report</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Server</TableHead>
          <TableHead align="right">CPU</TableHead>
          <TableHead align="right">Memory</TableHead>
          <TableHead align="center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>web-01</TableCell>
          <TableCell align="right">45%</TableCell>
          <TableCell align="right">2.1GB</TableCell>
          <TableCell align="center">Online</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>web-02</TableCell>
          <TableCell align="right">62%</TableCell>
          <TableCell align="right">3.4GB</TableCell>
          <TableCell align="center">Online</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>db-01</TableCell>
          <TableCell align="right">78%</TableCell>
          <TableCell align="right">8.2GB</TableCell>
          <TableCell align="center">Warning</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function TableStriped() {
  return (
    <Table striped size="compact">
      <TableHeader>
        <TableRow>
          <TableHead>Command</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>ls</TableCell>
          <TableCell>List directory contents</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>cd</TableCell>
          <TableCell>Change directory</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>pwd</TableCell>
          <TableCell>Print working directory</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>mkdir</TableCell>
          <TableCell>Create a directory</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>rm</TableCell>
          <TableCell>Remove files or directories</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function TableWithSelection() {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const data = [
    { id: 1, file: 'document.txt', size: '12KB', modified: '2024-01-10' },
    { id: 2, file: 'image.png', size: '256KB', modified: '2024-01-12' },
    { id: 3, file: 'script.sh', size: '4KB', modified: '2024-01-14' },
  ];

  return (
    <Table bordered>
      <TableHeader>
        <TableRow>
          <TableHead>File</TableHead>
          <TableHead align="right">Size</TableHead>
          <TableHead>Modified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            selected={selectedRow === row.id}
            onClick={() => setSelectedRow(row.id)}
            style={{ cursor: 'pointer' }}
          >
            <TableCell>{row.file}</TableCell>
            <TableCell align="right">{row.size}</TableCell>
            <TableCell>{row.modified}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ============================================================================
// CardDouble Examples
// ============================================================================

export function CardDoubleBasic() {
  return (
    <CardDouble title="SYSTEM INFO">
      <p>System status: OK</p>
      <p>Last checked: 2024-01-15 14:32:00 UTC</p>
    </CardDouble>
  );
}

export function CardDoubleWithCorners() {
  return (
    <CardDouble title="MAIN WINDOW" leftCorner="[1]" rightCorner="[X]">
      <p>Double-bordered container with corner labels.</p>
      <p>Perfect for terminal-style dialogs and windows.</p>
    </CardDouble>
  );
}

export function CardDoubleNested() {
  return (
    <CardDouble title="APPLICATION">
      <CardDoubleInner title="SETTINGS">
        <p>Theme: Dark</p>
        <p>Font: Unifont</p>
      </CardDoubleInner>
      <CardDoubleInner title="STATUS">
        <p>Connection: Active</p>
        <p>Uptime: 12:34:56</p>
      </CardDoubleInner>
    </CardDouble>
  );
}

export function CardDoubleMultiple() {
  return (
    <div className="space-y-4">
      <CardDouble title="SERVER 01" leftCorner="[OK]">
        <p>CPU: 45% | MEM: 2.1GB | NET: 12Mbps</p>
      </CardDouble>
      <CardDouble title="SERVER 02" leftCorner="[OK]">
        <p>CPU: 62% | MEM: 3.4GB | NET: 8Mbps</p>
      </CardDouble>
      <CardDouble title="SERVER 03" leftCorner="[!!]" rightCorner="[!]">
        <p>CPU: 92% | MEM: 7.8GB | NET: 2Mbps</p>
      </CardDouble>
    </div>
  );
}

// ============================================================================
// SidebarLayout Examples
// ============================================================================

export function SidebarLayoutBasic() {
  return (
    <SidebarLayout
      sidebar={
        <nav className="p-2">
          <p className="mb-2"><strong>Navigation</strong></p>
          <ul className="space-y-1">
            <li>• Home</li>
            <li>• About</li>
            <li>• Contact</li>
          </ul>
        </nav>
      }
      style={{ height: '200px', border: '1px solid var(--theme-border)' }}
    >
      <div className="p-4">
        <h3>Main Content</h3>
        <p>This is the main content area of the sidebar layout.</p>
      </div>
    </SidebarLayout>
  );
}

export function SidebarLayoutResizable() {
  return (
    <SidebarLayout
      sidebar={
        <nav className="p-2">
          <p className="mb-2"><strong>Menu</strong></p>
          <ul className="space-y-1">
            <li>• Dashboard</li>
            <li>• Settings</li>
            <li>• Profile</li>
          </ul>
        </nav>
      }
      defaultSidebarWidth={180}
      minSidebarWidth={120}
      maxSidebarWidth={300}
      showHandle
      style={{ height: '200px', border: '1px solid var(--theme-border)' }}
    >
      <div className="p-4">
        <h3>Resizable Sidebar</h3>
        <p>Drag the handle to resize the sidebar.</p>
      </div>
    </SidebarLayout>
  );
}

export function SidebarLayoutCollapsible() {
  return (
    <SidebarLayout
      sidebar={
        <nav className="p-2">
          <p className="mb-2"><strong>Files</strong></p>
          <ul className="space-y-1">
            <li>📁 Documents</li>
            <li>📁 Images</li>
            <li>📁 Downloads</li>
          </ul>
        </nav>
      }
      collapsible
      style={{ height: '200px', border: '1px solid var(--theme-border)' }}
    >
      <div className="p-4">
        <h3>Collapsible Sidebar</h3>
        <p>Click the button to collapse/expand.</p>
      </div>
    </SidebarLayout>
  );
}

export function SidebarLayoutRight() {
  return (
    <SidebarLayout
      sidebar={
        <aside className="p-2">
          <p className="mb-2"><strong>Details</strong></p>
          <p>File: document.txt</p>
          <p>Size: 12KB</p>
          <p>Modified: Jan 15</p>
        </aside>
      }
      side="right"
      collapsible
      defaultSidebarWidth={150}
      style={{ height: '200px', border: '1px solid var(--theme-border)' }}
    >
      <div className="p-4">
        <h3>Right Sidebar</h3>
        <p>The sidebar can appear on either side.</p>
      </div>
    </SidebarLayout>
  );
}

export function SidebarLayoutFull() {
  return (
    <SidebarLayout
      sidebar={
        <nav className="p-2">
          <p className="mb-2"><strong>TERMINAL</strong></p>
          <ul className="space-y-1">
            <li>[1] Sessions</li>
            <li>[2] Processes</li>
            <li>[3] Network</li>
            <li>[4] Storage</li>
          </ul>
        </nav>
      }
      defaultSidebarWidth={160}
      minSidebarWidth={120}
      maxSidebarWidth={250}
      showHandle
      collapsible
      style={{ height: '240px', border: '1px solid var(--theme-border)' }}
    >
      <div className="p-4">
        <h3>Full-Featured Layout</h3>
        <p>Combines resizable handle and collapsible button.</p>
        <p className="mt-2 text-sm opacity-70">Drag the handle or click [&lt;] to interact.</p>
      </div>
    </SidebarLayout>
  );
}
