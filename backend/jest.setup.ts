require('dotenv').config({ path: require('path').resolve(__dirname, 'env.test') });

// Ensure test environment
// Test environment is loaded in next.config.js

jest.mock('jose', () => ({
  SignJWT: class {
    setProtectedHeader() { return this; }
    setIssuedAt() { return this; }
    setExpirationTime() { return this; }
    sign() { return Promise.resolve('mocked.jwt.token'); }
  },
  jwtVerify: () => Promise.resolve({ payload: { user: { id: 'mocked' }, expires: new Date().toISOString() } }),
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => undefined),
    set: jest.fn(),
    delete: jest.fn(),
  })),
}));
