module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.ts$',
  globalSetup: './spec/test_setup',
  globalTeardown: './spec/test_teardown',
  maxWorkers: 1,
};
