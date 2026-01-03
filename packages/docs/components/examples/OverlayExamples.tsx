'use client';

import { useState } from 'react';
import { Button, Dialog, Drawer, Popover } from 'tuimorphic';

// ============================================================================
// Dialog Examples
// ============================================================================

export function DialogBasic() {
  return (
    <Dialog
      trigger={<Button>Open Dialog</Button>}
      title="DIALOG TITLE"
    >
      <p>This is the dialog content. Click [X] or outside to close.</p>
    </Dialog>
  );
}

export function DialogWithContent() {
  return (
    <Dialog
      trigger={<Button>Open Form Dialog</Button>}
      title="CONTACT FORM"
    >
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            className="w-full px-2 py-1 border border-current bg-transparent"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            className="w-full px-2 py-1 border border-current bg-transparent"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block mb-1">Message:</label>
          <textarea
            className="w-full px-2 py-1 border border-current bg-transparent"
            rows={3}
            placeholder="Enter your message"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="secondary">Cancel</Button>
          <Button>Submit</Button>
        </div>
      </form>
    </Dialog>
  );
}

export function DialogControlled() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4 items-center">
      <Button onClick={() => setOpen(true)}>Open Controlled</Button>
      <span className="text-sm">Status: {open ? 'Open' : 'Closed'}</span>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="CONTROLLED DIALOG"
      >
        <p>This dialog is controlled via useState.</p>
        <p className="mt-2">Current state: <strong>{open ? 'open' : 'closed'}</strong></p>
        <div className="mt-4">
          <Button onClick={() => setOpen(false)}>Close from Inside</Button>
        </div>
      </Dialog>
    </div>
  );
}

// ============================================================================
// Drawer Examples
// ============================================================================

export function DrawerBasic() {
  return (
    <Drawer
      trigger={<Button>Open Left Drawer</Button>}
      title="NAVIGATION"
      side="left"
    >
      <p>This drawer slides in from the left side of the screen.</p>
    </Drawer>
  );
}

export function DrawerRight() {
  return (
    <Drawer
      trigger={<Button>Open Right Drawer</Button>}
      title="SETTINGS"
      description="Configure your preferences"
      side="right"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Dark Mode</span>
          <span>[ON]</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Notifications</span>
          <span>[OFF]</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Sound</span>
          <span>[ON]</span>
        </div>
      </div>
    </Drawer>
  );
}

export function DrawerBottom() {
  return (
    <Drawer
      trigger={<Button>Open Bottom Drawer</Button>}
      title="DETAILS"
      side="bottom"
    >
      <p>This drawer slides up from the bottom of the screen, like a mobile sheet.</p>
      <div className="mt-4 flex gap-2">
        <Button>Action 1</Button>
        <Button variant="secondary">Action 2</Button>
      </div>
    </Drawer>
  );
}

export function DrawerWithContent() {
  return (
    <Drawer
      trigger={<Button>Open Menu</Button>}
      title="MAIN MENU"
      side="left"
    >
      <nav className="space-y-2">
        <a href="#" className="block py-2 px-3 hover:bg-current/10">[&gt;] Home</a>
        <a href="#" className="block py-2 px-3 hover:bg-current/10">[&gt;] Products</a>
        <a href="#" className="block py-2 px-3 hover:bg-current/10">[&gt;] Services</a>
        <a href="#" className="block py-2 px-3 hover:bg-current/10">[&gt;] About</a>
        <a href="#" className="block py-2 px-3 hover:bg-current/10">[&gt;] Contact</a>
        <hr className="border-current my-4" />
        <a href="#" className="block py-2 px-3 hover:bg-current/10">[*] Settings</a>
        <a href="#" className="block py-2 px-3 hover:bg-current/10">[!] Logout</a>
      </nav>
    </Drawer>
  );
}

// ============================================================================
// Popover Examples
// ============================================================================

export function PopoverBasic() {
  return (
    <Popover trigger={<Button>Show Info</Button>}>
      <div className="p-2">
        <p>This is a basic popover with some helpful information.</p>
      </div>
    </Popover>
  );
}

export function PopoverPositions() {
  return (
    <div className="flex gap-4 flex-wrap items-center justify-center py-8">
      <Popover trigger={<Button>Top</Button>} side="top">
        <div className="p-2">Popover on top</div>
      </Popover>
      <Popover trigger={<Button>Bottom</Button>} side="bottom">
        <div className="p-2">Popover on bottom</div>
      </Popover>
      <Popover trigger={<Button>Left</Button>} side="left">
        <div className="p-2">Popover on left</div>
      </Popover>
      <Popover trigger={<Button>Right</Button>} side="right">
        <div className="p-2">Popover on right</div>
      </Popover>
    </div>
  );
}

export function PopoverWithForm() {
  const [email, setEmail] = useState('');

  return (
    <Popover trigger={<Button>Subscribe</Button>} side="bottom" align="start">
      <div className="p-3 w-64">
        <p className="font-bold mb-2">NEWSLETTER</p>
        <p className="text-sm mb-3">Subscribe to our updates:</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-2 py-1 border border-current bg-transparent mb-2"
          placeholder="your@email.com"
        />
        <Button style={{ width: '100%' }}>Subscribe</Button>
      </div>
    </Popover>
  );
}
