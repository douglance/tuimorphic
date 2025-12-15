'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

interface XtermTerminalProps {
  /** WebSocket server URL */
  wsUrl?: string;
  /** Demo to run */
  demo?: string;
  /** Terminal width in columns */
  cols?: number;
  /** Terminal height in rows */
  rows?: number;
  /** Theme */
  theme?: 'dark' | 'light';
  /** Callback when terminal is ready */
  onReady?: () => void;
}

/**
 * Interactive terminal component that connects to the preview server
 * via WebSocket and renders real Ink components.
 */
export function XtermTerminal({
  wsUrl = 'ws://localhost:3005',
  demo = 'interactive',
  cols = 60,
  rows = 20,
  theme = 'dark',
  onReady,
}: XtermTerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<any>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!containerRef.current) return;

    let terminal: any;
    let fitAddon: any;
    let ws: WebSocket;
    let aborted = false;

    async function init() {
      try {
        // Dynamic imports
        const { Terminal } = await import('@xterm/xterm');
        const { FitAddon } = await import('@xterm/addon-fit');
        await import('@xterm/xterm/css/xterm.css');

        // Check if effect was cleaned up during async imports
        if (aborted) return;

        const themeColors = theme === 'dark'
          ? {
              background: '#0a0a0a',
              foreground: '#e0e0e0',
              cursor: '#50fa7b',
              cursorAccent: '#0a0a0a',
              selectionBackground: '#44475a',
              black: '#000000',
              red: '#ff5555',
              green: '#50fa7b',
              yellow: '#f1fa8c',
              blue: '#6272a4',
              magenta: '#ff79c6',
              cyan: '#8be9fd',
              white: '#f8f8f2',
              brightBlack: '#6272a4',
              brightRed: '#ff6e6e',
              brightGreen: '#69ff94',
              brightYellow: '#ffffa5',
              brightBlue: '#d6acff',
              brightMagenta: '#ff92df',
              brightCyan: '#a4ffff',
              brightWhite: '#ffffff',
            }
          : {
              background: '#ffffff',
              foreground: '#1a1a1a',
              cursor: '#1a1a1a',
              cursorAccent: '#ffffff',
              selectionBackground: '#d0d0d0',
              black: '#000000',
              red: '#c91b00',
              green: '#00c200',
              yellow: '#c7c400',
              blue: '#0225c7',
              magenta: '#c930c7',
              cyan: '#00c5c7',
              white: '#c7c7c7',
              brightBlack: '#686868',
              brightRed: '#ff6e67',
              brightGreen: '#5ffa68',
              brightYellow: '#fffc67',
              brightBlue: '#6871ff',
              brightMagenta: '#ff77ff',
              brightCyan: '#60fdff',
              brightWhite: '#ffffff',
            };

        terminal = new Terminal({
          cols,
          rows,
          cursorBlink: true,
          cursorStyle: 'block',
          fontSize: 12,
          fontFamily: 'monospace',
          theme: themeColors,
          allowTransparency: false,
        });

        fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);

        // Check again before DOM operations
        if (aborted || !containerRef.current) return;

        terminal.open(containerRef.current);
        terminalRef.current = terminal;

        // DO NOT call fitAddon.fit() - it changes buffer size
        // Terminal buffer must match exactly what we send to server

        // Check before WebSocket connection
        if (aborted) {
          terminal.dispose();
          return;
        }

        // Connect to WebSocket server
        ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          // Don't start if aborted
          if (aborted) {
            ws.close();
            return;
          }

          setStatus('connected');
          // Clear terminal before starting new demo
          terminal.clear();
          // Send exact dimensions from props
          ws.send(JSON.stringify({
            type: 'start',
            demo,
            cols,
            rows,
          }));
          onReady?.();
        };

        ws.onmessage = (event) => {
          // Don't process messages if aborted
          if (aborted) return;

          try {
            const data = JSON.parse(event.data);
            if (data.type === 'started') {
              // Hard reset terminal when new demo starts
              terminal.reset();
            } else if (data.type === 'output') {
              terminal.write(data.data);
            } else if (data.type === 'exit') {
              // Don't show exit message - demo completed normally
            } else if (data.type === 'error') {
              setErrorMessage(data.message);
              setStatus('error');
            }
          } catch {
            // Raw output
            terminal.write(event.data);
          }
        };

        ws.onerror = () => {
          setErrorMessage('Failed to connect to preview server');
          setStatus('error');
        };

        ws.onclose = () => {
          if (status === 'connected') {
            setStatus('disconnected');
          }
        };

        // Send keyboard input to server
        terminal.onData((data: string) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'input', data }));
          }
        });

        // Handle resize
        terminal.onResize(({ cols, rows }: { cols: number; rows: number }) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'resize', cols, rows }));
          }
        });

      } catch (err) {
        console.error('Terminal init error:', err);
        setErrorMessage(err instanceof Error ? err.message : 'Failed to initialize terminal');
        setStatus('error');
      }
    }

    init();

    return () => {
      aborted = true;
      if (ws) ws.close();
      if (terminal) terminal.dispose();
      wsRef.current = null;
      terminalRef.current = null;
    };
  }, [wsUrl, demo, cols, rows, theme, onReady]);

  // Restart demo
  const restart = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      terminalRef.current?.clear();
      wsRef.current.send(JSON.stringify({
        type: 'start',
        demo,
        cols,
        rows,
      }));
    }
  };

  return (
    <div className="xterm-wrapper">
      {status === 'error' && (
        <div className="xterm-error">
          <p>⚠ {errorMessage}</p>
          <p className="hint">
            Make sure the preview server is running:<br />
            <code>cd packages/preview-server && pnpm dev</code>
          </p>
        </div>
      )}

      {status === 'connecting' && (
        <div className="xterm-connecting">
          Connecting to preview server...
        </div>
      )}

      <div
        ref={containerRef}
        className="xterm-container"
        style={{ display: status === 'error' ? 'none' : 'block' }}
      />

      <style jsx>{`
        .xterm-wrapper {
          border: 1px solid #333;
          background: ${theme === 'dark' ? '#0a0a0a' : '#fff'};
          overflow: auto;
          min-width: ${cols * 8}px;
        }

        .xterm-container {
          padding: 8px;
          width: fit-content;
          min-width: 100%;
        }

        .xterm-container :global(.xterm) {
          width: fit-content !important;
        }

        .xterm-error {
          padding: 24px;
          text-align: center;
          color: #ff5555;
        }

        .xterm-error .hint {
          margin-top: 12px;
          font-size: 12px;
          color: #888;
        }

        .xterm-error code {
          display: block;
          margin-top: 8px;
          padding: 8px;
          background: #1a1a1a;
          border: 1px solid #333;
          color: #50fa7b;
        }

        .xterm-connecting {
          padding: 24px;
          text-align: center;
          color: #888;
        }
      `}</style>
    </div>
  );
}

export default XtermTerminal;
