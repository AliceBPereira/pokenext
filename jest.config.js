module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "**/*.js",
    "!**/*.config.js",
    "!**/*.test.js",
    "!**/*.spec.js",
    "!**/tests/**",
    "!**/__mocks__/**",
    "!**/node_modules/**",
    "!**/.next/**",
    "!coverage/**",
    "!styles/**",
  ],
  moduleNameMapper: {
    "\\.module\\.(css|scss|sass)$": "<rootDir>/__mocks__/cssModuleMock.js",
    "\\.(css|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: ["next/babel"],
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
