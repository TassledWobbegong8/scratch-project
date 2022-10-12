const config = {
    verbose: true,
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    },
    testEnvironment: "jest-environment-jsdom",
    globalSetup: './jest-setup.js',
    globalTeardown: './jest-teardown.js',
    roots: [
        "<rootDir>",
      ],
      modulePaths: [
        "<rootDir>",
      ],
      moduleDirectories: [
        "node_modules"
      ],
test: "jest --detectOpenHandles"
};

module.exports = config;