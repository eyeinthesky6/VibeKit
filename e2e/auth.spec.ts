import { test, expect } from '@playwright/test';

const PASSWORD = process.env.E2E_TEST_PASSWORD!;

test('User can sign up and is redirected to dashboard', async ({ page }) => {
  await page.goto('/sign-up');
  await page.fill('input[name="email"]', 'testuser+' + Date.now() + '@example.com');
  await page.fill('input[name="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard');
  await expect(page).toHaveURL(/.*\/dashboard/);
  await expect(page.locator('h1')).toContainText(['Dashboard', 'dashboard']);
});
