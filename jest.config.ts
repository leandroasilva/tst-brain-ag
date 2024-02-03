export default {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  transformIgnorePatterns: ["node_modules/(?!@nestjs/axios)"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^test/(.*)$": "<rootDir>/test/$1",
  },
  testEnvironment: "node",
  testMatch: [
    "**/tests/**/*.+(ts|tsx|js)",
    "**/?(*.)+(integration-spec|spec|e2e-spec).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(t|j)s?$": ["@swc/jest"],
  },
  globalSetup: "<rootDir>/test/config/e2e/setup.ts",
  globalTeardown: "<rootDir>/test/config/e2e/teardown.ts",
  testTimeout: 60000,
};
