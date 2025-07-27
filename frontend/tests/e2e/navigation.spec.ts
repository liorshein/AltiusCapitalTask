import { test, expect } from '@playwright/test';

const TEST_USERNAME = process.env.TEST_USERNAME || 'fo1_test_user@whatever.com';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'Test123!';

test.describe('Navigation and User Interface', () => {
  test.beforeEach(async ({ page }) => {
    // Login with real credentials
    await page.goto('/login');
    await page.fill('input[name="username"]', TEST_USERNAME);
    await page.fill('input[name="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Wait for navigation to home page
    await expect(page).toHaveURL('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display main navigation elements', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('[data-testid="website-selector"]')).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('[data-testid="website-selector"]')).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to focus on interactive elements
    const focusedElement = await page.locator(':focus').count();
    expect(focusedElement).toBeGreaterThan(0);
  });

  test('should handle real API loading states', async ({ page }) => {
    // Refresh to trigger new API calls
    await page.reload();
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Main content should be visible after loading
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('[data-testid="website-selector"]')).toBeVisible();
  });

  test('should work with real website data', async ({ page }) => {
    // Test website selector with real data
    await page.click('[data-testid="website-selector"]');
    
    const websiteOptions = page.locator('[data-testid^="website-option-"]');
    const count = await websiteOptions.count();
    
    // Should have at least one website option
    expect(count).toBeGreaterThan(0);
    
    // Test selecting different websites
    if (count > 1) {
      await page.click('[data-testid="website-option-1"]');
      await page.waitForLoadState('networkidle');
      
      // Should still be on home page with navigation visible
      await expect(page).toHaveURL('/');
      await expect(page.locator('nav')).toBeVisible();
    }
  });
});