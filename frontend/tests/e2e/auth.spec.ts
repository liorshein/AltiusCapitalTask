import { test, expect } from '@playwright/test';

const TEST_USERNAME = process.env.TEST_USERNAME || 'fo1_test_user@whatever.com';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'Test123!';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should redirect to login when not authenticated', async ({ page }) => {
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toContainText('Website Crawler');
    // Verify we're on login page by checking for login form
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });

  test('should show login form elements', async ({ page }) => {
    await page.goto('/login');
    
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should display error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // First select a website
    await page.click('[data-testid="website-selector"]');
    await page.click('[data-testid="website-option-fo1"]');
    
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Check for error toast (sonner toast with error content)
    await expect(page.locator('[data-sonner-toast][data-type="error"]').first()).toBeVisible();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // First select a website
    await page.click('[data-testid="website-selector"]');
    await page.click('[data-testid="website-option-fo1"]');
    
    await page.fill('input[name="email"]', TEST_USERNAME);
    await page.fill('input[name="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // First login with real credentials
    await page.goto('/login');
    
    // Select website first
    await page.click('[data-testid="website-selector"]');
    await page.click('[data-testid="website-option-fo1"]');
    
    await page.fill('input[name="email"]', TEST_USERNAME);
    await page.fill('input[name="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/');
    
    // Then logout
    await page.click('[data-testid="logout-button"]');
    
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toContainText('Website Crawler');
    // Verify we're on login page by checking for login form
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });
});