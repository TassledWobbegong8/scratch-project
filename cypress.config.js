const { defineConfig } = require("cypress");
module.exports = defineConfig({
  viewportHeight: 900,
  viewportWidth: 1440,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
