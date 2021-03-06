import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';

export default {
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['dist', 'node_modules', 'coverage'],
  testMatch: ['**/?(*.)+(spec|test).(js|ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/src/config/jest.setup.ts'],
  coveragePathIgnorePatterns: [
    'mocks',
    '.mock.ts',
    'server.ts',
  ],
};