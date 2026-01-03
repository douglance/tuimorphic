import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport for good screenshot size
  await page.setViewportSize({ width: 1400, height: 900 });

  // Navigate to the preview page
  await page.goto('http://localhost:3001/preview', { waitUntil: 'networkidle' });

  console.log('Page loaded, looking for Alert button...');

  // Click on the Alert demo button
  const alertButton = await page.getByRole('button', { name: /alert/i });
  await alertButton.click();

  console.log('Clicked Alert button, waiting 2 seconds...');

  // Wait 2 seconds as requested
  await page.waitForTimeout(2000);

  // Take a screenshot
  await page.screenshot({
    path: '/Users/douglance/Developer/lv/tuimorphic/packages/preview-server/screenshots/alert-compact.png',
    fullPage: false
  });

  console.log('Screenshot saved to screenshots/alert-compact.png');

  await browser.close();
})();
