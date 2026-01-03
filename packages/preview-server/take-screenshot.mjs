import { chromium } from 'playwright';

async function takeScreenshot() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to preview page
  await page.goto('http://localhost:3001/preview');
  console.log('Navigated to preview page');

  // Click the Alert button
  await page.click('text=Alert');
  console.log('Clicked Alert button');

  // Wait 3 seconds for rendering
  await page.waitForTimeout(3000);
  console.log('Waited 3 seconds');

  // Take screenshot
  await page.screenshot({
    path: '/Users/douglance/Developer/lv/tuimorphic/packages/preview-server/screenshots/alert-minwidth.png',
    fullPage: false
  });
  console.log('Screenshot saved');

  await browser.close();
}

takeScreenshot().catch(console.error);
