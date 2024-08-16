"use strict";
/**
* For a detailed explanation regarding each configuration property, visit:
* https://jestjs.io/docs/configuration
*/
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: [
    "./src/entities/*.ts",
    "./src/services/*.ts",
    "./src/models/*.ts",
    "./src/controllers/*.ts",
  ],
  coverageDirectory: "__tests__/coverage",
 
  coverageProvider: "v8",
 
  globalSetup: "./src/__tests__/global.setup.ts",
  // A path to a module which exports an async function that is triggered once after all test suites
  globalTeardown: "./src/__tests__/global.teardown.ts",
 
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"],
 
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  forceExit: true,
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map