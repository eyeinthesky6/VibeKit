import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 12'],
});

test('Dashboard is responsive on mobile', async ({ page }) => {
  await page.goto('/dashboard');
  // Check header visibility
  await expect(page.locator('h1')).toHaveText(/Dashboard/i);
  // Check main content adapts to mobile width
  const content = page.locator('pre');
  await expect(content).toBeVisible();
});
