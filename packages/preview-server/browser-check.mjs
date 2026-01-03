import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleMessages = [];
  const errors = [];

  // Capture console messages
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text()
    });
  });

  // Capture page errors
  page.on('pageerror', error => {
    errors.push(error.message);
  });

  console.log('Navigating to http://localhost:3001/preview...');

  try {
    await page.goto('http://localhost:3001/preview', {
      waitUntil: 'domcontentloaded',
      timeout: 10000
    });

    console.log('Page loaded. Waiting 3 seconds for WebSocket connection and demo render...');
    await page.waitForTimeout(3000);

    // Take screenshot
    const screenshotPath = '/Users/douglance/Developer/lv/tuimorphic/packages/preview-server/screenshot.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to: ${screenshotPath}`);

    // Report console output
    console.log('\n=== CONSOLE MESSAGES ===');
    if (consoleMessages.length === 0) {
      console.log('No console messages captured');
    } else {
      consoleMessages.forEach(msg => {
        const prefix = msg.type === 'error' ? '[ERROR]' :
                       msg.type === 'warning' ? '[WARN]' :
                       `[${msg.type.toUpperCase()}]`;
        console.log(`${prefix} ${msg.text}`);
      });
    }

    console.log('\n=== PAGE ERRORS ===');
    if (errors.length === 0) {
      console.log('No page errors captured');
    } else {
      errors.forEach(err => console.log(`[ERROR] ${err}`));
    }

    // Get page title and content info
    const title = await page.title();
    console.log(`\n=== PAGE INFO ===`);
    console.log(`Title: ${title}`);

    // Check if main content rendered
    const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 500));
    console.log(`Body preview: ${bodyText.substring(0, 200)}...`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

main();
