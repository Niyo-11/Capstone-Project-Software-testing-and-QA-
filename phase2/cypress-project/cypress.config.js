const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "gqjaf6",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reprtDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    // Adjust the spec pattern to point to your integration folder
    specPattern: "cypress/integration/**/*cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    watchForFileChanges: false,
  },
  // Enable retries for flaky tests
  retries: {
    runMode: 2, // retries when running via CLI (cypress run)
    openMode: 0, // retries when running in interactive mode (cypress open)
  },
});
