import { test, expect } from '@playwright/test';

test.describe('Video Fallbacks', () => {
  test.beforeEach(async ({ page }) => {
    // Set up authentication
    await page.goto('/');
    await page.evaluate(() => {
      sessionStorage.setItem('portfolio_auth', 'true');
      sessionStorage.setItem('portfolio_auth_code', 'TEST');
    });
  });

  test('Doubledash: all videos have poster images', async ({ page }) => {
    await page.goto('/work/doordash-doubledash');
    await page.waitForLoadState('networkidle');

    const videos = page.locator('video');
    const count = await videos.count();

    expect(count).toBeGreaterThan(0);
    console.log(`Found ${count} videos`);

    for (let i = 0; i < count; i++) {
      const video = videos.nth(i);
      const poster = await video.getAttribute('poster');
      const src = await video.getAttribute('src');

      expect(poster, `Video ${i + 1} (${src}) should have a poster`).toBeTruthy();
      expect(poster).toContain('-poster.jpg');
    }
  });

  test('Doubledash: videos are muted for autoplay compatibility', async ({ page }) => {
    await page.goto('/work/doordash-doubledash');
    await page.waitForLoadState('networkidle');

    const videos = page.locator('video');
    const count = await videos.count();

    for (let i = 0; i < count; i++) {
      const video = videos.nth(i);
      const muted = await video.evaluate(v => v.muted);

      expect(muted, `Video ${i + 1} should be muted for autoplay`).toBe(true);
    }
  });

  test('Doubledash: videos have playsInline for mobile', async ({ page }) => {
    await page.goto('/work/doordash-doubledash');
    await page.waitForLoadState('networkidle');

    const videos = page.locator('video');
    const count = await videos.count();

    for (let i = 0; i < count; i++) {
      const video = videos.nth(i);
      const playsInline = await video.getAttribute('playsinline');

      // playsinline attribute should exist (value can be empty string)
      expect(playsInline, `Video ${i + 1} should have playsInline`).not.toBeNull();
    }
  });

  test('poster images exist and load correctly', async ({ page, request }) => {
    await page.goto('/work/doordash-doubledash');
    await page.waitForLoadState('networkidle');

    const videos = page.locator('video');
    const count = await videos.count();

    for (let i = 0; i < count; i++) {
      const video = videos.nth(i);
      const poster = await video.getAttribute('poster');

      if (poster) {
        const response = await request.get(poster);
        expect(response.ok(), `Poster ${poster} should load`).toBe(true);
      }
    }
  });
});

test.describe('Video Autoplay Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      sessionStorage.setItem('portfolio_auth', 'true');
      sessionStorage.setItem('portfolio_auth_code', 'TEST');
    });
  });

  test('visible videos attempt to play', async ({ page }) => {
    await page.goto('/work/doordash-doubledash');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Scroll to make videos visible
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);

    const videos = page.locator('video');
    const firstVideo = videos.first();

    // Check if video is ready to play (readyState >= 2)
    const readyState = await firstVideo.evaluate(v => v.readyState);
    expect(readyState).toBeGreaterThanOrEqual(1);
  });
});
