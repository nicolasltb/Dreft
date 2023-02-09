const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require("ts-jest");

module.exports = {
  automock: true,
  cacheDirectory: "/tmp/jest_rs",
  clearMocks: true,
  preset: "ts-jest",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageProvider: "babel",
  coverageReporters: [
    "json"
  ],
  maxWorkers: "50%",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__tests__/__utils__/"
  ]
};