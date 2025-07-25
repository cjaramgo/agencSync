const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

// Load Salesforce-specific environment variables
// dotenv.config({ path: '.env.salesforce' });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // Test directory
  testDir: './src/tests',
  
  // Test file pattern
  testMatch: '**/*.spec.js',
  
  // Maximum time one test can run for
  timeout: parseInt(process.env.DEFAULT_TIMEOUT) || 60000,
  
  // Expect assertion timeout
  expect: {
    timeout: parseInt(process.env.EXPECT_TIMEOUT) || 10000,
    toMatchSnapshot: { maxDiffPixelRatio: 0.05 }
  },
  
  // Run tests in files in parallel
  fullyParallel: false,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry tests
  // retries: parseInt(process.env.RETRY_COUNT) || 0,
  retries: 0,
  
  // Opt out of parallel tests on CI
  workers: 1,
  
  // Reporter to use
  reporter: [
    ['html'],
    ['list'],
    ['allure-playwright'],
  ],

  // Global setup and teardown
  globalSetup: require.resolve('./src/utils/global-setup'),
  // globalTeardown: require.resolve('./src/utils/global-teardown.js'),
  
  // Shared settings for all projects
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: process.env.SF_URL,
    
    // Maximum time each action can take
    actionTimeout: parseInt(process.env.ACTION_TIMEOUT) || 30000,
    navigationTimeout: parseInt(process.env.BROWSER_TIMEOUT) || 30000,
    
    // Collect trace when retrying the failed test
    trace: 'on',
    
    // Record video
    video: 'on',
    
    // Take screenshot on failure
    screenshot: 'on',
    
    // Viewport size
    viewport: { width: 1280, height: 720 },
    
    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,
    
    // Browser launch options
    launchOptions: {
      slowMo: parseInt(process.env.BROWSER_SLOW_MO) || 100,
      args: ['--disable-dev-shm-usage']
    },
    
    // Headless mode
    // headless: process.env.HEADLESS === 'true'
    storageState: './storageState.json'
  },
  
  // Configure projects for major browsers
  projects: [
    {
      name: 'setup',
      testMatch: /global\.setup\.js/,
    },
    {
      name: 'salesforce',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: './storageState.json',
        viewport: { width: 1280, height: 720 },
      },
      dependencies: ['setup']
    }
  ],
  
  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results/salesforce/',
});