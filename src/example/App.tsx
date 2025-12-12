import React from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import styles from './App.module.scss';

export default function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
    email: '',
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = `theme-${newTheme}`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>TUIMORPHIC</h1>
        <p className={styles.subtitle}>
          Terminal-aesthetic React components built on Base UI
        </p>
        <Button theme="SECONDARY" onClick={toggleTheme}>
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </header>

      <main className={styles.main}>
        {/* Button Examples */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ BUTTONS ═══</h2>
          <Card title="BUTTON VARIANTS">
            <div className={styles.buttonGrid}>
              <div className={styles.buttonExample}>
                <span className={styles.label}>PRIMARY:</span>
                <Button theme="PRIMARY">Submit</Button>
              </div>
              <div className={styles.buttonExample}>
                <span className={styles.label}>SECONDARY:</span>
                <Button theme="SECONDARY">Cancel</Button>
              </div>
              <div className={styles.buttonExample}>
                <span className={styles.label}>DISABLED:</span>
                <Button isDisabled>Disabled</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Input Examples */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ INPUTS ═══</h2>
          <Card title="INPUT VARIANTS">
            <div className={styles.inputGrid}>
              <Input
                label="USERNAME"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <Input
                label="PASSWORD"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Input
                label="EMAIL"
                type="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Input
                label="CUSTOM CARET"
                placeholder="Block caret style"
                caretChars="█"
              />
              <Input
                label="NO BLINK"
                placeholder="Static caret"
                isBlink={false}
              />
            </div>
          </Card>
        </section>

        {/* Card Examples */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ CARDS ═══</h2>
          <div className={styles.cardGrid}>
            <Card title="CENTER TITLE" mode="center">
              <p>Default card with centered title.</p>
              <p>MS-DOS inspired box-shadow borders.</p>
            </Card>
            <Card title="LEFT TITLE" mode="left">
              <p>Card with left-aligned title.</p>
              <p>Corner decoration included.</p>
            </Card>
            <Card title="RIGHT TITLE" mode="right">
              <p>Card with right-aligned title.</p>
              <p>Symmetric corner decoration.</p>
            </Card>
          </div>
        </section>

        {/* Complete Form Example */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ COMPLETE FORM ═══</h2>
          <Card title="LOGIN SYSTEM">
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  `Login attempt:\nUsername: ${formData.username}\nEmail: ${formData.email}`
                );
              }}
            >
              <Input
                label="IDENTIFICATION"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <Input
                label="ACCESS CODE"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <div className={styles.formActions}>
                <Button theme="PRIMARY" type="submit">
                  Authorize
                </Button>
                <Button
                  theme="SECONDARY"
                  type="button"
                  onClick={() =>
                    setFormData({ username: '', password: '', email: '' })
                  }
                >
                  Clear
                </Button>
              </div>
            </form>
          </Card>
        </section>

        {/* Feature Showcase */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>═══ FEATURES ═══</h2>
          <Card title="KEYBOARD NAVIGATION">
            <p>Try using arrow keys to navigate between inputs:</p>
            <div className={styles.inputGrid}>
              <Input label="FIELD 1" placeholder="Press ↓ to go next" />
              <Input label="FIELD 2" placeholder="Press ↑ or ↓" />
              <Input label="FIELD 3" placeholder="Press ↑ to go back" />
            </div>
          </Card>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          TUIMORPHIC v0.1.0 • Built with Base UI + SRCL Aesthetics • MIT License
        </p>
      </footer>
    </div>
  );
}
