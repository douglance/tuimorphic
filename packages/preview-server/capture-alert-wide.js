import { chromium } from 'playwright';

async function captureAlertWide() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport
  await page.setViewportSize({ width: 1600, height: 1200 });

  // Navigate to the preview page
  console.log('Navigating to http://localhost:3001/preview...');
  await page.goto('http://localhost:3001/preview');

  // Wait for the page to fully load
  await page.waitForLoadState('networkidle');
  console.log('Page loaded');

  // Click on the Alert tab
  console.log('Clicking Alert demo button...');
  const alertTab = await page.locator('button:has-text("Alert")');
  await alertTab.click();

  // Wait 2 seconds as requested
  console.log('Waiting 2 seconds...');
  await page.waitForTimeout(2000);

  // Take screenshot
  const screenshotPath = '/Users/douglance/Developer/lv/tuimorphic/packages/preview-server/screenshots/alert-wide.png';
  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  console.log(`Screenshot saved to: ${screenshotPath}`);

  await browser.close();
  console.log('Done!');
}

captureAlertWide().catch(console.error);
