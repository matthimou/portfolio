# Playwright E2E Testing

This project uses Playwright for end-to-end testing across multiple browsers and viewports.

## Quick Start

```bash
# Run all tests (Chromium by default)
npm run test

# Run with interactive UI
npm run test:ui
```

## Available Test Commands

| Command | Description |
|---------|-------------|
| `npm run test` | Run all tests in Chromium |
| `npm run test:webkit` | Run tests in Safari/WebKit |
| `npm run test:mobile` | Run tests in mobile Safari + Chrome viewports |
| `npm run test:videos` | Run video fallback tests only |
| `npm run test:responsive` | Run responsive layout tests only |
| `npm run test:ui` | Open interactive test UI |

## Test Suites

### Video Fallbacks (`video-fallbacks.spec.js`)
Tests that videos have proper fallbacks for mobile Safari:
- All videos have poster images
- Videos are muted (required for autoplay)
- Videos have `playsInline` attribute
- Poster images load correctly

**When to run:** After adding or modifying video content in case studies.

### Responsive Layout (`responsive-layout.spec.js`)
Tests layout behavior across breakpoints:
- Mobile (375px) - iPhone viewport
- Tablet (768px) - iPad viewport
- Desktop (1440px) - Standard desktop

Also includes visual regression tests that capture screenshots.

**When to run:** After CSS changes that affect layout.

## Browser Projects

The config includes 4 browser projects:

1. **chromium** - Desktop Chrome
2. **webkit** - Desktop Safari
3. **mobile-safari** - iPhone 14 viewport
4. **mobile-chrome** - Pixel 7 viewport

Run specific projects with:
```bash
npx playwright test --project=webkit
npx playwright test --project=mobile-safari
```

## Test Authentication

Case studies are password-protected. Tests bypass this by setting sessionStorage before navigation:

```javascript
await page.evaluate(() => {
  sessionStorage.setItem('portfolio_auth', 'true');
  sessionStorage.setItem('portfolio_auth_code', 'TEST');
});
```

## Viewing Results

After tests run:
- **HTML Report:** `npx playwright show-report`
- **Screenshots:** `tests/screenshots/` (gitignored)
- **Traces:** Available on first retry for debugging

## Writing New Tests

1. Create a new `.spec.js` file in `tests/e2e/`
2. Import test utilities:
   ```javascript
   import { test, expect } from '@playwright/test';
   ```
3. Set up authentication in `beforeEach` if testing protected pages
4. Run with `npx playwright test your-test.spec.js`

## Troubleshooting

**Tests redirect to home page:** The page is protected. Add auth setup in `beforeEach`.

**WebKit tests fail locally:** WebKit may need system dependencies. Run `npx playwright install webkit`.

**Dev server not starting:** Playwright auto-starts `npm run dev`. Make sure port 5173 is free.
