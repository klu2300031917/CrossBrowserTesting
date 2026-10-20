import { defineConfig, devices } from "@playwright/test";

export default defineConfig({

  // =========================================
  // TEST DIRECTORY
  // =========================================

  testDir: "./tests",


  // =========================================
  // TEST EXECUTION
  // =========================================

  // Run independent tests in parallel
  fullyParallel: true,

  // Prevent accidental test.only() in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,

  // Use one worker in CI for predictable execution
  workers: process.env.CI ? 1 : undefined,


  // =========================================
  // REPORTING
  // =========================================

  reporter: [
    ["list"],

    [
      "html",
      {
        open: "never"
      }
    ]
  ],


  // =========================================
  // COMMON TEST SETTINGS
  // =========================================

  use: {

    // React/Vite application
    baseURL: "http://127.0.0.1:5173",

    // Do not use a previously saved browser state
    storageState: undefined,

    // Capture trace when a test is retried
    trace: "on-first-retry",

    // Screenshot only when test fails
    screenshot: "only-on-failure",

    // Keep video when test fails
    video: "retain-on-failure",

    // Maximum time for click/fill/etc.
    actionTimeout: 10000,

    // Maximum page navigation time
    navigationTimeout: 30000,

    // Consistent timezone
    timezoneId: "Asia/Kolkata",

    // Consistent browser locale
    locale: "en-US"
  },


  // =========================================
  // CROSS-BROWSER PROJECTS
  // =========================================

  projects: [

    {
      name: "chromium",

      use: {
        ...devices["Desktop Chrome"]
      }
    },

    {
      name: "firefox",

      use: {
        ...devices["Desktop Firefox"]
      }
    },

    {
      name: "webkit",

      use: {
        ...devices["Desktop Safari"]
      }
    }

  ],


  // =========================================
  // START VITE AUTOMATICALLY
  // =========================================

  webServer: {

    command:
      "npm run dev -- --host 127.0.0.1",

    url:
      "http://127.0.0.1:5173",

    reuseExistingServer:
      !process.env.CI,

    timeout: 120000

  }

});