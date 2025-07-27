import { test, expect } from '@playwright/test';

const TEST_USERNAME = process.env.TEST_USERNAME || 'fo1_test_user@whatever.com';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'Test123!';

test.describe('Navigation and User Interface', () => {
  test.beforeEach(async ({ page }) => {
    // Login with real credentials
    await page.goto('/login');
    
    // Select website first
    await page.click('[data-testid="website-selector"]');
    await page.click('[data-testid="website-option-fo1"]');
    
    await page.fill('input[name="email"]', TEST_USERNAME);
    await page.fill('input[name="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Wait for navigation to home page
    await expect(page).toHaveURL('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display main navigation elements', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('[data-testid="logout-button"]')).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('[data-testid="logout-button"]')).toBeVisible();
  });

  test('should handle real API loading states', async ({ page }) => {
    // Refresh to trigger new API calls
    await page.reload();
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Main content should be visible after loading
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should work with authenticated session data', async ({ page }) => {
    // Test that the authenticated session is working
    await expect(page.locator('nav')).toBeVisible();
    
    // Should be on home page with main content
    await expect(page).toHaveURL('/');
    await expect(page.locator('main')).toBeVisible();
    
    // Check for deals dashboard content
    await expect(page.locator('main h1')).toContainText('Deals Dashboard');
    
    // Navigation should remain functional
    await expect(page.locator('[data-testid="logout-button"]')).toBeVisible();
  });
});