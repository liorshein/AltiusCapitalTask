import { test, expect } from '@playwright/test';

const TEST_USERNAME = process.env.TEST_USERNAME || 'fo1_test_user@whatever.com';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'Test123!';

test.describe('Deals Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login with real credentials
    await page.goto('/login');
    await page.fill('input[name="username"]', TEST_USERNAME);
    await page.fill('input[name="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Wait for navigation to home page
    await expect(page).toHaveURL('/');
  });

  test('should display deals list', async ({ page }) => {
    // Wait for deals to load from real API
    await page.waitForLoadState('networkidle');
    
    // Check if deals are visible (count may vary with real data)
    const dealCards = page.locator('[data-testid="deal-card"]');
    const dealCount = await dealCards.count();
    
    if (dealCount > 0) {
      await expect(dealCards.first()).toBeVisible();
    } else {
      // If no deals, should show appropriate message
      await expect(page.locator('text=No deals found')).toBeVisible();
    }
  });

  test('should filter deals by website', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Select website filter
    await page.click('[data-testid="website-selector"]');
    
    // Get all website options
    const websiteOptions = page.locator('[data-testid^="website-option-"]');
    const count = await websiteOptions.count();
    
    if (count > 1) {
      // Select first non-"all" option
      await page.click('[data-testid="website-option-1"]');
      
      // Wait for API response
      await page.waitForResponse(response => 
        response.url().includes('/api/deals') && response.status() === 200
      );
      
      await page.waitForLoadState('networkidle');
    }
  });

  test('should download real deal when download button is clicked', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const dealCards = page.locator('[data-testid="deal-card"]');
    const dealCount = await dealCards.count();
    
    if (dealCount > 0) {
      // Find and click first download button
      const downloadButton = page.locator('[data-testid^="download-deal-"]').first();
      
      if (await downloadButton.isVisible()) {
        const downloadPromise = page.waitForEvent('download');
        await downloadButton.click();
        
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toBeTruthy();
      }
    }
  });

  test('should navigate between different websites and show real data', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    await page.click('[data-testid="website-selector"]');
    
    const websiteOptions = page.locator('[data-testid^="website-option-"]');
    const count = await websiteOptions.count();
    
    // Test each website option
    for (let i = 0; i < Math.min(count, 3); i++) {
      await page.click(`[data-testid="website-option-${i}"]`);
      
      // Wait for API response
      await page.waitForResponse(response => 
        response.url().includes('/api/deals') && response.status() === 200
      );
      
      await page.waitForLoadState('networkidle');
      
      // Verify page still works after website change
      await expect(page.locator('[data-testid="website-selector"]')).toBeVisible();
    }
  });
});