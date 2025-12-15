'use client';

import * as React from 'react';
import { useState } from 'react';
import { XtermTerminal } from './XtermTerminal';

interface InteractiveDualPreviewProps {
  /** The web component to preview */
  webComponent: React.ReactNode;
  /** Demo name to run in terminal */
  demo: string;
  /** Preview title */
  title?: string;
  /** Terminal dimensions */
  terminalCols?: number;
  terminalRows?: number;
}

/**
 * Interactive side-by-side preview with real terminal.
 * Left side: Web component (tuimorphic)
 * Right side: Real terminal running Ink component
 */
export function InteractiveDualPreview({
  webComponent,
  demo,
  title = 'Component Preview',
  terminalCols = 50,
  terminalRows = 15,
}: InteractiveDualPreviewProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <div className="interactive-preview">
      <div className="preview-header">
        <h3 className="preview-title">{title}</h3>
        <div className="preview-controls">
          <button
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            Dark
          </button>
          <button
            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
          >
            Light
          </button>
        </div>
      </div>

      <div className="preview-grid">
        {/* Web Side */}
        <div className="preview-panel">
          <div className="panel-header">
            <span className="panel-label">WEB</span>
            <span className="panel-tech">tuimorphic</span>
          </div>
          <div className={`panel-content web ${theme}`}>
            <div className="web-wrapper">
              {webComponent}
            </div>
          </div>
        </div>

        {/* Terminal Side */}
        <div className="preview-panel">
          <div className="panel-header">
            <span className="panel-label">TERMINAL</span>
            <span className="panel-tech">React Ink (live)</span>
          </div>
          <div className={`panel-content terminal ${theme}`}>
            <XtermTerminal
              demo={demo}
              cols={terminalCols}
              rows={terminalRows}
              theme={theme}
            />
          </div>
        </div>
      </div>

      <div className="preview-footer">
        <div className="footer-info">
          <span className="info-item">Tab: navigate</span>
          <span className="info-item">Enter: select</span>
          <span className="info-item">q: quit</span>
        </div>
      </div>

      <style jsx>{`
        .interactive-preview {
          border: 1px solid #333;
          margin: 24px 0;
          font-family: 'GNU Unifont', 'Courier New', monospace;
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #1a1a1a;
          border-bottom: 1px solid #333;
        }

        .preview-title {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
        }

        .preview-controls {
          display: flex;
        }

        .theme-btn {
          padding: 4px 12px;
          font-size: 12px;
          font-family: inherit;
          border: 1px solid #333;
          background: transparent;
          color: #888;
          cursor: pointer;
        }

        .theme-btn:first-child {
          border-right: none;
        }

        .theme-btn.active {
          background: #0066ff;
          border-color: #0066ff;
          color: white;
        }

        .theme-btn:hover:not(.active) {
          background: #2a2a2a;
        }

        .preview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: #333;
        }

        @media (max-width: 900px) {
          .preview-grid {
            grid-template-columns: 1fr;
          }
        }

        .preview-panel {
          background: #0a0a0a;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #1a1a1a;
          border-bottom: 1px solid #333;
        }

        .panel-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #0066ff;
        }

        .panel-tech {
          font-size: 10px;
          color: #666;
        }

        .panel-content {
          min-height: 300px;
        }

        .panel-content.web {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 24px;
        }

        .panel-content.web.dark {
          background: #0a0a0a;
          color: #e0e0e0;
        }

        .panel-content.web.light {
          background: #fff;
          color: #1a1a1a;
        }

        .web-wrapper {
          width: 100%;
          max-width: 300px;
        }

        .panel-content.terminal {
          padding: 0;
        }

        .preview-footer {
          padding: 8px 16px;
          background: #1a1a1a;
          border-top: 1px solid #333;
        }

        .footer-info {
          display: flex;
          gap: 16px;
        }

        .info-item {
          font-size: 11px;
          color: #666;
        }

        .info-item::before {
          content: '•';
          margin-right: 6px;
          color: #444;
        }
      `}</style>
    </div>
  );
}

export default InteractiveDualPreview;
