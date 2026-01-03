'use client';
import { useState } from 'react';
import { ActionButton } from 'tuimorphic';
export function ActionButtonBasic() {
    return <ActionButton>Action</ActionButton>;
}
export function ActionButtonVariants() {
    return (<div className="flex gap-4 flex-wrap">
      <ActionButton variant="primary">Primary</ActionButton>
      <ActionButton variant="secondary">Secondary</ActionButton>
    </div>);
}
export function ActionButtonStates() {
    return (<div className="flex gap-4 flex-wrap items-center">
      <ActionButton>Default</ActionButton>
      <ActionButton disabled>Disabled</ActionButton>
    </div>);
}
export function ActionButtonWithHotkeys() {
    return (<div className="flex gap-4 flex-wrap">
      <ActionButton hotkey="S">Save</ActionButton>
      <ActionButton hotkey="O">Open</ActionButton>
      <ActionButton hotkey="Q" variant="secondary">Quit</ActionButton>
    </div>);
}
export function ActionButtonAllVariantsDisabled() {
    return (<div className="flex gap-4 flex-wrap">
      <ActionButton variant="primary" disabled>Primary</ActionButton>
      <ActionButton variant="secondary" disabled>Secondary</ActionButton>
    </div>);
}
export function ActionButtonInteractive() {
    const [message, setMessage] = useState('Click an action');
    return (<div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <ActionButton hotkey="N" onClick={() => setMessage('New file created')}>
          New
        </ActionButton>
        <ActionButton hotkey="S" onClick={() => setMessage('File saved')}>
          Save
        </ActionButton>
        <ActionButton hotkey="D" variant="secondary" onClick={() => setMessage('Item deleted')}>
          Delete
        </ActionButton>
      </div>
      <div className="p-2 border border-fd-border bg-fd-muted">
        {message}
      </div>
    </div>);
}
export function ActionButtonSizes() {
    return (<div className="flex gap-4 flex-wrap items-center">
      <ActionButton style={{ fontSize: '10px' }}>Small</ActionButton>
      <ActionButton>Default</ActionButton>
      <ActionButton style={{ fontSize: '16px' }}>Large</ActionButton>
    </div>);
}
