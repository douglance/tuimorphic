import { chromium } from 'playwright';
import fs from 'fs';

const screenshotDir = '/Users/douglance/Developer/lv/tuimorphic/packages/preview-server/screenshots';

// Create screenshots directory
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function testPreview() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 }
  });
  const page = await context.newPage();

  // Collect console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  // Collect page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });

  try {
    console.log('Navigating to http://localhost:3001/preview...');
    await page.goto('http://localhost:3001/preview', { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for page to fully render
    await page.waitForTimeout(2000);

    // Take initial screenshot
    console.log('Taking initial screenshot...');
    await page.screenshot({ path: `${screenshotDir}/01-initial.png`, fullPage: true });

    // Get page title and URL
    const title = await page.title();
    console.log(`Page title: ${title}`);
    console.log(`Page URL: ${page.url()}`);

    // Find all demo buttons
    const buttons = await page.$$('button');
    console.log(`Found ${buttons.length} buttons on page`);

    // List button texts
    for (const button of buttons) {
      const text = await button.textContent();
      console.log(`  - Button: "${text?.trim()}"`);
    }

    // Demo button names to look for
    const demoButtons = ['Button', 'Card', 'Alert', 'Form', 'Progress', 'Interactive Form'];

    for (const demoName of demoButtons) {
      try {
        console.log(`\nLooking for "${demoName}" button...`);

        // Try to find and click button with this text
        const buttonLocator = page.locator(`button:has-text("${demoName}")`).first();

        if (await buttonLocator.count() > 0) {
          await buttonLocator.click();
          await page.waitForTimeout(1500); // Wait for demo to load

          const fileName = demoName.toLowerCase().replace(/\s+/g, '-');
          await page.screenshot({ path: `${screenshotDir}/02-demo-${fileName}.png`, fullPage: true });
          console.log(`  Screenshot saved: 02-demo-${fileName}.png`);
        } else {
          console.log(`  Button "${demoName}" not found`);
        }
      } catch (err) {
        console.log(`  Error clicking "${demoName}": ${err.message}`);
      }
    }

    // Final screenshot
    await page.screenshot({ path: `${screenshotDir}/03-final.png`, fullPage: true });

    // Report console messages
    console.log('\n=== Console Messages ===');
    const errors = consoleMessages.filter(m => m.type === 'error');
    const warnings = consoleMessages.filter(m => m.type === 'warning');
    const logs = consoleMessages.filter(m => m.type === 'log');

    console.log(`Errors: ${errors.length}`);
    errors.forEach(e => console.log(`  [ERROR] ${e.text}`));

    console.log(`Warnings: ${warnings.length}`);
    warnings.slice(0, 5).forEach(w => console.log(`  [WARN] ${w.text}`));
    if (warnings.length > 5) console.log(`  ... and ${warnings.length - 5} more warnings`);

    console.log(`Logs: ${logs.length}`);
    logs.slice(0, 10).forEach(l => console.log(`  [LOG] ${l.text}`));
    if (logs.length > 10) console.log(`  ... and ${logs.length - 10} more logs`);

    console.log('\n=== Page Errors ===');
    console.log(`Page errors: ${pageErrors.length}`);
    pageErrors.forEach(e => console.log(`  [PAGE ERROR] ${e}`));

    // Check if terminal preview exists
    console.log('\n=== Page Structure Analysis ===');

    // Look for terminal-related elements
    const terminalElements = await page.$$('[class*="terminal"], [class*="Terminal"], pre, code');
    console.log(`Terminal-related elements: ${terminalElements.length}`);

    // Check for side-by-side layout
    const pageContent = await page.content();
    console.log(`Page has "side-by-side" or split view: ${pageContent.includes('side') || pageContent.includes('split') || pageContent.includes('grid')}`);

    // Get visible text content
    const bodyText = await page.locator('body').innerText();
    console.log('\n=== Visible Text Preview (first 2000 chars) ===');
    console.log(bodyText.substring(0, 2000));

  } catch (error) {
    console.error('Error during test:', error.message);
  } finally {
    await browser.close();
  }
}

testPreview();
