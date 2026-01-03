import { chromium } from 'playwright';

async function captureAlertComparison() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set a larger viewport for better screenshots
  await page.setViewportSize({ width: 1600, height: 1200 });

  // Navigate to the preview page
  await page.goto('http://localhost:3001/preview');

  // Wait for the page to fully load
  await page.waitForLoadState('networkidle');

  // Click on the Alert tab to show the Alert demo
  const alertTab = await page.locator('button:has-text("Alert")');
  await alertTab.click();

  // Wait for the demo to render
  await page.waitForTimeout(2000);

  // Scroll down to show the full comparison panel
  await page.evaluate(() => {
    const comparisonPanel = document.querySelector('[class*="comparison"]') ||
                            document.querySelector('[class*="demo"]') ||
                            document.querySelector('h2');
    if (comparisonPanel) {
      comparisonPanel.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });

  await page.waitForTimeout(500);

  // Take a full page screenshot to see everything
  await page.screenshot({
    path: '/Users/douglance/Developer/lv/tuimorphic/packages/preview-server/screenshots/alert-full-page.png',
    fullPage: true
  });

  console.log('Full page Alert screenshot saved');

  // Now focus on just the comparison section
  // Find the "Alert Variants" heading and capture from there
  const alertVariantsSection = await page.locator('text=Alert Variants').first();
  if (alertVariantsSection) {
    await alertVariantsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  }

  // Screenshot the current viewport (should show the comparison)
  await page.screenshot({
    path: '/Users/douglance/Developer/lv/tuimorphic/packages/preview-server/screenshots/alert-comparison-viewport.png'
  });

  console.log('Alert comparison viewport screenshot saved');

  // Try to capture just the side-by-side panel area as an element screenshot
  try {
    // Look for the container that has both WEB and TERMINAL headers
    const comparisonContainer = await page.locator('text=WEB').locator('xpath=ancestor::div[5]').first();
    await comparisonContainer.screenshot({
      path: '/Users/douglance/Developer/lv/tuimorphic/packages/preview-server/screenshots/alert-comparison-element.png'
    });
    console.log('Alert comparison element screenshot saved');
  } catch (e) {
    console.log('Could not capture element:', e.message);
  }

  // Also capture the WEB panel specifically (left side)
  try {
    const webPanelContent = await page.locator('text=INFORMATION').first().locator('xpath=ancestor::div[3]');
    await webPanelContent.screenshot({
      path: '/Users/douglance/Developer/lv/tuimorphic/packages/preview-server/screenshots/alert-web-panel.png'
    });
    console.log('WEB panel screenshot saved');
  } catch (e) {
    console.log('Could not capture WEB panel:', e.message);
  }

  await browser.close();
  console.log('Screenshots completed!');
}

captureAlertComparison().catch(console.error);
