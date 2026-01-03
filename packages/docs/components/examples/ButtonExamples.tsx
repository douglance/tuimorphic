'use client';

import { useState } from 'react';
import { Button } from 'tuimorphic';

export function ButtonBasic() {
  return <Button>Click me</Button>;
}

export function ButtonVariants() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}

export function ButtonStates() {
  return (
    <div className="flex gap-4 flex-wrap items-center">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}

export function ButtonSecondaryStates() {
  return (
    <div className="flex gap-4 flex-wrap items-center">
      <Button variant="secondary">Default</Button>
      <Button variant="secondary" disabled>Disabled</Button>
    </div>
  );
}

export function ButtonWithIcons() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Button>[+] Add Item</Button>
      <Button>[x] Delete</Button>
      <Button variant="secondary">[&lt;] Back</Button>
      <Button variant="secondary">[&gt;] Next</Button>
    </div>
  );
}

export function ButtonSizes() {
  return (
    <div className="flex gap-4 flex-wrap items-center">
      <Button style={{ fontSize: '10px', padding: '4px 8px' }}>XS</Button>
      <Button style={{ fontSize: '12px', padding: '6px 12px' }}>SM</Button>
      <Button>Default</Button>
      <Button style={{ fontSize: '16px', padding: '12px 24px' }}>LG</Button>
    </div>
  );
}

export function ButtonInteractive() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex gap-4 items-center">
      <Button onClick={() => setCount(c => c - 1)}>[-]</Button>
      <span className="min-w-[60px] text-center">{count}</span>
      <Button onClick={() => setCount(c => c + 1)}>[+]</Button>
      <Button variant="secondary" onClick={() => setCount(0)}>Reset</Button>
    </div>
  );
}

export function ButtonFullWidth() {
  return (
    <div className="space-y-2 max-w-md">
      <Button style={{ width: '100%' }}>Full Width Primary</Button>
      <Button variant="secondary" style={{ width: '100%' }}>Full Width Secondary</Button>
    </div>
  );
}

export function ButtonAsLink() {
  return (
    <div className="flex gap-4">
      <Button onClick={() => window.open('https://github.com', '_blank')}>
        Open GitHub
      </Button>
    </div>
  );
}

export function ButtonGroup() {
  const [selected, setSelected] = useState('A');

  return (
    <div className="flex">
      {['A', 'B', 'C'].map((option) => (
        <Button
          key={option}
          variant={selected === option ? 'primary' : 'secondary'}
          onClick={() => setSelected(option)}
          style={{
            marginLeft: option !== 'A' ? '-1px' : 0,
          }}
        >
          Option {option}
        </Button>
      ))}
    </div>
  );
}

export function ButtonLoading() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? '[...] Loading' : 'Submit'}
    </Button>
  );
}
