const config = {
    verbose: true,
    'moduleNameMapper': {
      '^.+\\.(css|less|scss)$': 'babel-jest'
    },
    testEnvironment: "jsdom",
    // globalSetup: './jest-setup.js',
    // globalTeardown: './jest-teardown.js',
    // roots: [
    //     "<rootDir>",
    //   ],
    //   modulePaths: [
    //     "<rootDir>",
    //   ],
    //   moduleDirectories: [
    //     "node_modules"
    //   ],
    // test: "jest --detectOpenHandles",
    setupFilesAfterEnv:['./jest-setup.js']
};

module.exports = config;