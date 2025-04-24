module.exports = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/tests/auth.spec.ts', '<rootDir>/tests/billing.spec.ts'],
  moduleNameMapper: {
    '^@/lib/db/supabase$': '<rootDir>/__mocks__/supabase.ts',
    '^@/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
