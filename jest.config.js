module.exports = {
  roots: ['<rootDir>/src'],
  globalTeardown: '<rootDir>/jest.afterEnv.js',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testEnvironment: 'node'
};
