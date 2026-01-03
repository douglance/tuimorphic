'use client';

import { useState } from 'react';
import { ActionBar, ActionButton } from 'tuimorphic';

export function ActionBarBasic() {
  return (
    <ActionBar>
      <ActionButton hotkey="N">New</ActionButton>
      <ActionButton hotkey="O">Open</ActionButton>
      <ActionButton hotkey="S">Save</ActionButton>
    </ActionBar>
  );
}

export function ActionBarWithDanger() {
  return (
    <ActionBar>
      <ActionButton hotkey="E">Edit</ActionButton>
      <ActionButton hotkey="C">Copy</ActionButton>
      <ActionButton hotkey="D" variant="secondary">Delete</ActionButton>
    </ActionBar>
  );
}

export function ActionBarPositions() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm mb-2 opacity-70">Position: top (default)</p>
        <ActionBar position="top">
          <ActionButton hotkey="1">Action 1</ActionButton>
          <ActionButton hotkey="2">Action 2</ActionButton>
        </ActionBar>
      </div>
      <div>
        <p className="text-sm mb-2 opacity-70">Position: bottom</p>
        <ActionBar position="bottom">
          <ActionButton hotkey="1">Action 1</ActionButton>
          <ActionButton hotkey="2">Action 2</ActionButton>
        </ActionBar>
      </div>
    </div>
  );
}

export function ActionBarFileManager() {
  const [status, setStatus] = useState('Ready');

  return (
    <div className="space-y-4">
      <ActionBar>
        <ActionButton hotkey="F1" onClick={() => setStatus('Help opened')}>Help</ActionButton>
        <ActionButton hotkey="F2" onClick={() => setStatus('Rename mode')}>Rename</ActionButton>
        <ActionButton hotkey="F3" onClick={() => setStatus('Viewing file')}>View</ActionButton>
        <ActionButton hotkey="F4" onClick={() => setStatus('Editing file')}>Edit</ActionButton>
        <ActionButton hotkey="F5" onClick={() => setStatus('Copying...')}>Copy</ActionButton>
        <ActionButton hotkey="F6" onClick={() => setStatus('Moving...')}>Move</ActionButton>
        <ActionButton hotkey="F7" onClick={() => setStatus('Creating folder')}>Mkdir</ActionButton>
        <ActionButton hotkey="F8" variant="secondary" onClick={() => setStatus('Deleting...')}>Delete</ActionButton>
      </ActionBar>
      <div className="p-2 border border-fd-border bg-fd-muted text-sm">
        Status: {status}
      </div>
    </div>
  );
}

export function ActionBarEditor() {
  return (
    <ActionBar>
      <ActionButton hotkey="^S">Save</ActionButton>
      <ActionButton hotkey="^O">Open</ActionButton>
      <ActionButton hotkey="^X">Cut</ActionButton>
      <ActionButton hotkey="^C">Copy</ActionButton>
      <ActionButton hotkey="^V">Paste</ActionButton>
      <ActionButton hotkey="^Q" variant="secondary">Quit</ActionButton>
    </ActionBar>
  );
}

export function ActionBarMixed() {
  return (
    <ActionBar>
      <ActionButton variant="primary" hotkey="Y">Yes</ActionButton>
      <ActionButton variant="secondary" hotkey="N">No</ActionButton>
      <ActionButton variant="secondary" hotkey="C">Cancel</ActionButton>
    </ActionBar>
  );
}

export function ActionBarFullWidth() {
  return (
    <div className="w-full">
      <ActionBar style={{ width: '100%', justifyContent: 'space-between' }}>
        <div className="flex gap-2">
          <ActionButton hotkey="N">New</ActionButton>
          <ActionButton hotkey="O">Open</ActionButton>
        </div>
        <div className="flex gap-2">
          <ActionButton hotkey="S">Save</ActionButton>
          <ActionButton hotkey="Q" variant="secondary">Quit</ActionButton>
        </div>
      </ActionBar>
    </div>
  );
}
