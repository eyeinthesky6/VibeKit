module.exports = {
  rootDir: '.',
  preset: 'ts-jest/presets/default-esm',
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  testPathIgnorePatterns: ['<rootDir>/../frontend/e2e/'],
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.ts'],
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-typescript'] }],
  },
  transformIgnorePatterns: ['/node_modules/(?!(jose)/)'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^@/lib/db/supabase$': '<rootDir>/lib/db/supabase.ts',
    '^@/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}; 