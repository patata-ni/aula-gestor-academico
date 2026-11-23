import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e', timeout: 30000, retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }], ['junit', { outputFile: 'test-results/results.xml' }]],
  use: { baseURL: process.env.BASE_URL || 'http://127.0.0.1:4173/', screenshot: 'on', trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'movil', use: { ...devices['Pixel 7'] } }
  ],
  webServer: process.env.BASE_URL ? undefined : { command: 'npm start', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI }
});
