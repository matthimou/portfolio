import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      sessionStorage.setItem('portfolio_auth', 'true');
      sessionStorage.setItem('portfolio_auth_code', 'TEST');
    });
  });

  test('home page renders at mobile width', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Hero should be visible
    const hero = page.locator('.hero, [class*="hero"]').first();
    await expect(hero).toBeVisible();

    // Take screenshot for visual comparison
    await page.screenshot({ path: 'tests/screenshots/home-mobile.png' });
  });

  test('home page renders at tablet width', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.screenshot({ path: 'tests/screenshots/home-tablet.png' });
  });

  test('home page renders at desktop width', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.screenshot({ path: 'tests/screenshots/home-desktop.png' });
  });

  test('case study 4-up grid collapses on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/work/doordash-doubledash');
    await page.waitForLoadState('networkidle');

    // Scroll to platform images section
    await page.evaluate(() => window.scrollTo(0, 3000));
    await page.waitForTimeout(500);

    // Check that grid exists
    const grid = page.locator('.case-study-content__platform-grid');
    if (await grid.count() > 0) {
      const gridStyle = await grid.evaluate(el => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // On mobile, should be 2 columns (2 x 1fr), not 4
      const columnCount = gridStyle.split(' ').length;
      expect(columnCount).toBeLessThanOrEqual(2);
    }
  });

  test('navigation is accessible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for mobile menu or navigation
    const nav = page.locator('nav, [role="navigation"], header');
    await expect(nav.first()).toBeVisible();
  });
});

test.describe('Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      sessionStorage.setItem('portfolio_auth', 'true');
      sessionStorage.setItem('portfolio_auth_code', 'TEST');
    });
  });

  test('Doubledash hero section', async ({ page }) => {
    await page.goto('/work/doordash-doubledash');
    await page.waitForLoadState('networkidle');

    const hero = page.locator('.case-study-hero').first();
    if (await hero.count() > 0) {
      await expect(hero).toBeVisible();
      await hero.screenshot({ path: 'tests/screenshots/doubledash-hero.png' });
    }
  });

  test('Me Tab hero section', async ({ page }) => {
    await page.goto('/work/doordash-metab');
    await page.waitForLoadState('networkidle');

    const hero = page.locator('.case-study-hero').first();
    if (await hero.count() > 0) {
      await expect(hero).toBeVisible();
      await hero.screenshot({ path: 'tests/screenshots/metab-hero.png' });
    }
  });
});
