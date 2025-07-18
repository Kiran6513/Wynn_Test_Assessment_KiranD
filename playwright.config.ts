// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // grep: /@positive/
  /* Maximum time one test can run for. */
  timeout: 180 * 1000,
  use: {
    headless: true,
    actionTimeout: 30000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
