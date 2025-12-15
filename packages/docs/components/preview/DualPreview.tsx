'use client';

import * as React from 'react';
import { useState } from 'react';

interface DualPreviewProps {
  /** The web component to preview */
  webComponent: React.ReactNode;
  /** The terminal component to preview (using TerminalRenderer components) */
  terminalComponent: React.ReactNode;
  /** Preview title */
  title?: string;
}

/**
 * Side-by-side preview of web and terminal components.
 * Used to visually compare parity between platforms.
 */
export function DualPreview({
  webComponent,
  terminalComponent,
  title = 'Component Preview',
}: DualPreviewProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <div className="dual-preview">
      <div className="dual-preview-header">
        <h3 className="dual-preview-title">{title}</h3>
        <div className="dual-preview-controls">
          <button
            className={`theme-toggle ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            Dark
          </button>
          <button
            className={`theme-toggle ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
          >
            Light
          </button>
        </div>
      </div>

      <div className="dual-preview-grid">
        {/* Web Preview */}
        <div className="preview-panel">
          <div className="preview-panel-header">
            <span className="preview-label">WEB</span>
            <span className="preview-tech">DOM + CSS</span>
          </div>
          <div
            className={`preview-content web-preview ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}
          >
            {webComponent}
          </div>
        </div>

        {/* Terminal Preview */}
        <div className="preview-panel">
          <div className="preview-panel-header">
            <span className="preview-label">TERMINAL</span>
            <span className="preview-tech">React Ink</span>
          </div>
          <div className={`preview-content terminal-preview ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
            <div className="terminal-window">
              <div className="terminal-chrome">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
              </div>
              <div className="terminal-body">
                {terminalComponent}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dual-preview-footer">
        <div className="parity-indicator">
          <span className="parity-dot" />
          <span className="parity-text">Visual parity check</span>
        </div>
      </div>

      <style jsx>{`
        .dual-preview {
          border: 1px solid var(--color-border, #333);
          border-radius: 0;
          overflow: hidden;
          margin: 24px 0;
          font-family: var(--font-mono, 'GNU Unifont', monospace);
        }

        .dual-preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #1a1a1a;
          border-bottom: 1px solid #333;
        }

        .dual-preview-title {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
        }

        .dual-preview-controls {
          display: flex;
          gap: 0;
        }

        .theme-toggle {
          padding: 4px 12px;
          font-size: 12px;
          font-family: inherit;
          border: 1px solid #333;
          background: transparent;
          color: #888;
          cursor: pointer;
          transition: all 0.15s;
        }

        .theme-toggle:first-child {
          border-right: none;
        }

        .theme-toggle.active {
          background: #0066ff;
          border-color: #0066ff;
          color: white;
        }

        .theme-toggle:hover:not(.active) {
          background: #2a2a2a;
        }

        .dual-preview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: #333;
        }

        @media (max-width: 768px) {
          .dual-preview-grid {
            grid-template-columns: 1fr;
          }
        }

        .preview-panel {
          background: #0a0a0a;
        }

        .preview-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #1a1a1a;
          border-bottom: 1px solid #333;
        }

        .preview-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #0066ff;
        }

        .preview-tech {
          font-size: 10px;
          color: #666;
        }

        .preview-content {
          min-height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .preview-content.theme-dark {
          background: #0a0a0a;
          color: #e0e0e0;
        }

        .preview-content.theme-light {
          background: #ffffff;
          color: #1a1a1a;
        }

        .terminal-preview {
          padding: 16px;
        }

        .terminal-window {
          border: 1px solid #333;
          background: #0a0a0a;
          width: 100%;
          max-width: 400px;
        }

        .terminal-chrome {
          display: flex;
          gap: 6px;
          padding: 8px 12px;
          background: #1a1a1a;
          border-bottom: 1px solid #333;
        }

        .terminal-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .terminal-dot.red { background: #ff5f56; }
        .terminal-dot.yellow { background: #ffbd2e; }
        .terminal-dot.green { background: #27c93f; }

        .terminal-body {
          padding: 16px;
          font-family: 'GNU Unifont', 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.4;
          color: #e0e0e0;
        }

        .dual-preview-footer {
          padding: 8px 16px;
          background: #1a1a1a;
          border-top: 1px solid #333;
        }

        .parity-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .parity-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #50fa7b;
        }

        .parity-text {
          font-size: 11px;
          color: #888;
        }
      `}</style>
    </div>
  );
}

export default DualPreview;
