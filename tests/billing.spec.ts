import { test, expect } from '@playwright/test';

test('User can checkout and see subscription status', async ({ page }) => {
  // Login as test user
  await page.goto('/sign-in');
  await page.fill('input[name="email"]', 'testuser@example.com');
  await page.fill('input[name="password"]', 'TestPassword123!');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard');

  // Go to billing page
  await page.goto('/dashboard/billing');
  await page.click('text=Checkout');
  // Simulate Stripe test redirect (replace with your Stripe test redirect logic as needed)
  await page.waitForURL(/stripe/);
  // Simulate returning to dashboard/billing
  await page.goto('/dashboard/billing');
  await expect(page.locator('text=Active')).toBeVisible();
});
