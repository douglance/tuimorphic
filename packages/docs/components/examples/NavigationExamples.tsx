'use client';

import { BreadCrumbs, Navigation, Menu, MenuItem, MenuSeparator, Button } from 'tuimorphic';

export function BreadCrumbsBasic() {
  return (
    <BreadCrumbs
      items={[
        { label: 'Home', href: '#' },
        { label: 'Products', href: '#' },
        { label: 'Electronics', href: '#' },
        { label: 'Computers' },
      ]}
    />
  );
}

export function BreadCrumbsCustomSeparator() {
  return (
    <BreadCrumbs
      items={[
        { label: 'Root', href: '#' },
        { label: 'Documents', href: '#' },
        { label: 'Projects', href: '#' },
        { label: 'README.md' },
      ]}
      separator="/"
    />
  );
}

export function BreadCrumbsWithClickHandlers() {
  return (
    <BreadCrumbs
      items={[
        { label: 'Dashboard', onClick: () => console.log('Dashboard clicked') },
        { label: 'Settings', onClick: () => console.log('Settings clicked') },
        { label: 'Profile' },
      ]}
    />
  );
}

export function NavigationBasic() {
  return (
    <Navigation
      logo={<span style={{ fontWeight: 'bold' }}>ACME</span>}
      items={[
        { label: 'Home', href: '#', isActive: true },
        { label: 'About', href: '#' },
        { label: 'Products', href: '#' },
        { label: 'Contact', href: '#' },
      ]}
    />
  );
}

export function NavigationWithActions() {
  return (
    <Navigation
      logo={<span style={{ fontWeight: 'bold' }}>APP</span>}
      items={[
        { label: 'Dashboard', href: '#', isActive: true },
        { label: 'Analytics', href: '#' },
        { label: 'Settings', href: '#' },
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary">Login</Button>
          <Button variant="primary">Sign Up</Button>
        </div>
      }
    />
  );
}

export function NavigationNoBorder() {
  return (
    <Navigation
      logo={<span style={{ fontWeight: 'bold' }}>MINIMAL</span>}
      items={[
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Docs', href: '#', isActive: true },
      ]}
      showBorder={false}
    />
  );
}

export function NavigationClickHandlers() {
  return (
    <Navigation
      logo={<span style={{ fontWeight: 'bold' }}>SPA</span>}
      items={[
        { label: 'Home', onClick: () => console.log('Home'), isActive: true },
        { label: 'Products', onClick: () => console.log('Products') },
        { label: 'Services', onClick: () => console.log('Services') },
      ]}
    />
  );
}

export function MenuBasic() {
  return (
    <Menu trigger={<Button variant="secondary">Open Menu</Button>}>
      <MenuItem onSelect={() => console.log('New File')}>New File</MenuItem>
      <MenuItem onSelect={() => console.log('Open')}>Open</MenuItem>
      <MenuItem onSelect={() => console.log('Save')}>Save</MenuItem>
      <MenuSeparator />
      <MenuItem onSelect={() => console.log('Exit')}>Exit</MenuItem>
    </Menu>
  );
}

export function MenuWithActions() {
  return (
    <Menu trigger={<Button variant="secondary">Actions</Button>}>
      <MenuItem onSelect={() => console.log('Edit')}>Edit</MenuItem>
      <MenuItem onSelect={() => console.log('Duplicate')}>Duplicate</MenuItem>
      <MenuItem onSelect={() => console.log('Share')}>Share</MenuItem>
      <MenuSeparator />
      <MenuItem onSelect={() => console.log('Archive')}>Archive</MenuItem>
      <MenuItem onSelect={() => console.log('Delete')}>Delete</MenuItem>
    </Menu>
  );
}

export function MenuUserActions() {
  return (
    <Menu trigger={<Button variant="secondary">[USER] Account</Button>}>
      <MenuItem onSelect={() => console.log('Profile')}>Profile</MenuItem>
      <MenuItem onSelect={() => console.log('Settings')}>Settings</MenuItem>
      <MenuItem onSelect={() => console.log('Preferences')}>Preferences</MenuItem>
      <MenuSeparator />
      <MenuItem onSelect={() => console.log('Help')}>Help</MenuItem>
      <MenuItem onSelect={() => console.log('Logout')}>Logout</MenuItem>
    </Menu>
  );
}
