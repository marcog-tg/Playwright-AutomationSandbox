import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // si pones on, genera mucha informacion
    // trace: 'on',
    // solo genera informacion cuando falla el test
    // trace: 'retain-on-failure',
    // genera informacion en el primer reintento
    trace: 'on',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */

  projects: [
    /*
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },


    {
      name: 'Computadora',
      testMatch: 'AutomationSandbox.spec.ts',
      retries: 1,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Iphone',
      testMatch: 'AutomationSandbox.spec.ts',
      retries: 1,
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Ipad',
      testMatch: 'AutomationSandbox.spec.ts',
      retries: 1,
      use: { ...devices['iPad (gen 7)'] },
    },
*/

    // Proyecto de AutomationSandbox: detecta solo el spec AutomationSandbox.spec.ts
    {
      name: 'Computadora',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Iphone',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Ipad',
      use: { ...devices['iPad (gen 7)'] },
    },

    // Proyecto de APIs: detecta todos los specs dentro de tests/APITests
    {
      name: 'APITests',
      testMatch: 'APITests/**/APITests.spec.ts',
      use: {
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.API_TOKEN}`,
        },
      },
    },

    {
      name: 'E2EAPI',
      testMatch: 'APITests/**/E2EAPI.spec.ts',

      use: {
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.API_TOKEN}`,
        },
      },
    },

    {
      name: 'MOCKAPI',
      testMatch: 'APITests/**/MOCKAPI.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
