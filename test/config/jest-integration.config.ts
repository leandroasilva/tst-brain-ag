import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "../../",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^test/(.*)$": "<rootDir>/test/$1",
  },
  modulePaths: ["<rootDir>/src/"],
  testEnvironment: "node",
  testRegex: "test\\/integration\\/\\S*\\.integration-spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  globalSetup: "<rootDir>/test/config/integration/setup.ts",
  globalTeardown: "<rootDir>/test/config/integration/teardown.ts",
  testTimeout: 60000,
  collectCoverageFrom: ["**/*.(t|j)s"],
  collectCoverage: true,
  coverageReporters: ["lcov", "text"],
  coverageProvider: "v8",
  coverageDirectory: "coverage",
  detectOpenHandles: true,
  forceExit: true,
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "jest.config.ts",
    "/coverage/",
    "/test/",
    ".eslintrc.json",
    "/src/infra/database/typeorm-data-source",
    "/src/infra/database/migrations",
    "/src/main.ts",
  ],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};

export default jestConfig;
