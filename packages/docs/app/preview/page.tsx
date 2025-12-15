'use client';

import * as React from 'react';
import { useState } from 'react';
import { InteractiveDualPreview } from '../../components/preview/InteractiveDualPreview';
import { Button, Card, Alert, Badge, Progress, Checkbox, Input } from 'tuimorphic';

export default function PreviewPage() {
  const [activeDemo, setActiveDemo] = useState<string>('interactive');

  const demos = [
    { id: 'interactive', label: 'Interactive Form' },
    { id: 'button', label: 'Button' },
    { id: 'card', label: 'Card' },
    { id: 'alert', label: 'Alert' },
    { id: 'form', label: 'Form' },
    { id: 'progress', label: 'Progress' },
  ];

  return (
    <main className="preview-page">
      <header className="preview-header">
        <pre className="ascii-title">
{`╔═══════════════════════════════════════════════════════════════╗
║     TUIMORPHIC DUAL-TARGET INTERACTIVE PREVIEW                ║
║     Real Web + Real Terminal Side-by-Side                     ║
╚═══════════════════════════════════════════════════════════════╝`}
        </pre>
        <p className="preview-description">
          Compare and interact with both web and terminal components simultaneously.
          The terminal runs actual React Ink - type and navigate in real-time.
        </p>

        <div className="server-notice">
          <strong>⚡ Start the preview server:</strong>
          <code>cd packages/preview-server && pnpm install && pnpm dev</code>
        </div>
      </header>

      {/* Demo Selector */}
      <section className="demo-selector">
        <h2>Select Demo</h2>
        <div className="demo-buttons">
          {demos.map((demo) => (
            <button
              key={demo.id}
              className={`demo-btn ${activeDemo === demo.id ? 'active' : ''}`}
              onClick={() => setActiveDemo(demo.id)}
            >
              {demo.label}
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Form Demo */}
      {activeDemo === 'interactive' && (
        <section className="preview-section">
          <h2>Interactive Login Form</h2>
          <InteractiveDualPreview
            title="Login Form - Full Interaction"
            demo="interactive"
            terminalCols={40}
            terminalRows={20}
            webComponent={
              <Card title="Login">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.7 }}>Username</label>
                    <Input placeholder="Enter username" style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.7 }}>Password</label>
                    <Input type="password" placeholder="Enter password" style={{ width: '100%' }} />
                  </div>
                  <Checkbox>Remember me</Checkbox>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button>Sign In</Button>
                    <Button variant="secondary">Exit</Button>
                  </div>
                </div>
              </Card>
            }
          />
        </section>
      )}

      {/* Button Demo */}
      {activeDemo === 'button' && (
        <section className="preview-section">
          <h2>Button Component</h2>
          <InteractiveDualPreview
            title="Button Variants & States"
            demo="button"
            terminalCols={40}
            terminalRows={18}
            webComponent={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '60px', opacity: 0.7 }}>Default:</span>
                  <Button>Click Me</Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '60px', opacity: 0.7 }}>Secondary:</span>
                  <Button variant="secondary">Outline</Button>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <p style={{ opacity: 0.7, fontSize: '12px' }}>Click count: 0</p>
                </div>
                <Button variant="secondary">Exit Demo</Button>
              </div>
            }
          />
        </section>
      )}

      {/* Card Demo */}
      {activeDemo === 'card' && (
        <section className="preview-section">
          <h2>Card Component</h2>
          <InteractiveDualPreview
            title="Card Layouts"
            demo="card"
            terminalCols={40}
            terminalRows={25}
            webComponent={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <Card title="Basic Card">
                  <p style={{ margin: 0 }}>This is a simple card with a title.</p>
                  <p style={{ margin: 0 }}>Cards are great for grouping content.</p>
                </Card>
                <Card title="Card with Badges">
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge>Info</Badge>
                  </div>
                </Card>
              </div>
            }
          />
        </section>
      )}

      {/* Alert Demo */}
      {activeDemo === 'alert' && (
        <section className="preview-section">
          <h2>Alert Component</h2>
          <InteractiveDualPreview
            title="Alert Variants"
            demo="alert"
            terminalCols={40}
            terminalRows={25}
            webComponent={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Alert variant="info" title="Information">
                  Informational message.
                </Alert>
                <Alert variant="success" title="Success">
                  Changes saved.
                </Alert>
                <Alert variant="warning" title="Warning">
                  Cannot be undone.
                </Alert>
                <Alert variant="error" title="Error">
                  Connection failed.
                </Alert>
              </div>
            }
          />
        </section>
      )}

      {/* Form Demo */}
      {activeDemo === 'form' && (
        <section className="preview-section">
          <h2>Form Components</h2>
          <InteractiveDualPreview
            title="Registration Form"
            demo="form"
            terminalCols={40}
            terminalRows={25}
            webComponent={
              <Card title="Registration Form">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.7 }}>Name *</label>
                    <Input placeholder="Your full name" style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.7 }}>Email *</label>
                    <Input placeholder="you@example.com" style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.7 }}>Password *</label>
                    <Input type="password" placeholder="Min 8 characters" style={{ width: '100%' }} />
                  </div>
                  <Checkbox>Subscribe to newsletter</Checkbox>
                  <Checkbox>I accept the terms *</Checkbox>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <Button>Register</Button>
                    <Button variant="secondary">Cancel</Button>
                  </div>
                  <p style={{ fontSize: '11px', opacity: 0.5 }}>* Required fields</p>
                </div>
              </Card>
            }
          />
        </section>
      )}

      {/* Progress Demo */}
      {activeDemo === 'progress' && (
        <section className="preview-section">
          <h2>Progress Component</h2>
          <InteractiveDualPreview
            title="Progress Bars & Spinners"
            demo="progress"
            terminalCols={40}
            terminalRows={25}
            webComponent={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <div>
                  <span style={{ opacity: 0.7, fontSize: '12px' }}>Animated:</span>
                  <Progress value={65} />
                </div>
                <div>
                  <span style={{ opacity: 0.7, fontSize: '12px' }}>Static:</span>
                  <Progress value={45} />
                </div>
                <div>
                  <span style={{ opacity: 0.7, fontSize: '12px' }}>Complete:</span>
                  <Progress value={100} />
                </div>
                <Card title="Download Progress">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '80px', fontSize: '12px' }}>file1.zip</span>
                      <Progress value={100} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '80px', fontSize: '12px' }}>file2.zip</span>
                      <Progress value={67} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '80px', fontSize: '12px' }}>file3.zip</span>
                      <Progress value={23} />
                    </div>
                  </div>
                </Card>
              </div>
            }
          />
        </section>
      )}

      <style jsx>{`
        .preview-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'GNU Unifont', 'Courier New', monospace;
        }

        .preview-header {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid #333;
        }

        .ascii-title {
          font-size: 11px;
          margin: 0 0 16px 0;
          color: #50fa7b;
          line-height: 1.2;
        }

        .preview-description {
          margin: 0 0 16px 0;
          color: #888;
          font-size: 14px;
          max-width: 600px;
        }

        .server-notice {
          padding: 12px 16px;
          background: #1a1a1a;
          border: 1px solid #333;
          border-left: 3px solid #ffbd2e;
          font-size: 13px;
        }

        .server-notice code {
          display: block;
          margin-top: 8px;
          padding: 8px 12px;
          background: #0a0a0a;
          color: #50fa7b;
          font-size: 12px;
        }

        .demo-selector {
          margin-bottom: 32px;
        }

        .demo-selector h2 {
          font-size: 14px;
          margin: 0 0 12px 0;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .demo-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .demo-btn {
          padding: 8px 16px;
          font-family: inherit;
          font-size: 13px;
          border: 1px solid #333;
          background: transparent;
          color: #888;
          cursor: pointer;
          transition: all 0.15s;
        }

        .demo-btn:hover {
          background: #1a1a1a;
          color: #fff;
        }

        .demo-btn.active {
          background: #0066ff;
          border-color: #0066ff;
          color: #fff;
        }

        .preview-section {
          margin-bottom: 48px;
        }

        .preview-section h2 {
          font-size: 18px;
          font-weight: 500;
          margin: 0 0 16px 0;
          padding-left: 12px;
          border-left: 3px solid #0066ff;
          color: #fff;
        }
      `}</style>
    </main>
  );
}
