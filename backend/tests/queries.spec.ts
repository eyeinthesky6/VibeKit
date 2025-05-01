jest.mock('@/lib/db/queries', () => ({
  ...jest.requireActual('@/lib/db/queries'),
  getUser: jest.fn().mockResolvedValue({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password_hash: 'hash',
    role: 'user',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }),
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ value: 'mock-session' })),
    set: jest.fn(),
    delete: jest.fn(),
  })),
}));

jest.mock('@/lib/auth/session', () => ({
  ...jest.requireActual('@/lib/auth/session'),
  verifyToken: jest.fn(),
}));

import { getActivityLogs } from '@/lib/db/queries';
import * as sessionModule from '@/lib/db/queries';
const { verifyToken } = require('@/lib/auth/session');

jest.mock('@/lib/db/drizzle', () => {
  // Chainable mock for db
  const db = {};
  const chain = jest.fn(() => db);
  db.select = chain;
  db.from = chain;
  db.leftJoin = chain;
  db.where = chain;
  db.orderBy = chain;
  db.limit = chain;
  db.update = chain;
  db.set = chain;
  return { db };
});

const mockLogs = [{ id: 1, action: 'test', timestamp: new Date(), ip_address: '127.0.0.1', user_name: 'Test' }];
const realGetActivityLogs = getActivityLogs;

describe('getActivityLogs Query', () => {
  let db;
  beforeEach(() => {
    jest.clearAllMocks();
    db = require('@/lib/db/drizzle').db;
  });

  it('throws if user is not authenticated', async () => {
    // Mock cookies to return a session, but verifyToken returns null
    const { cookies } = require('next/headers');
    cookies.mockReturnValue({ get: jest.fn(() => ({ value: 'mock-session' })) });
    verifyToken.mockResolvedValue(null);
    await expect(realGetActivityLogs()).rejects.toThrow('User not authenticated');
  });

  it('returns logs when user is authenticated', async () => {
    verifyToken.mockResolvedValue({ user: { id: 1 }, expires: new Date(Date.now() + 10000).toISOString() });
    // Chainable mock: limit returns mockLogs
    db.limit.mockResolvedValue(mockLogs);
    const logs = await realGetActivityLogs();
    expect(Array.isArray(logs)).toBe(true);
    expect(logs[0].action).toBe('test');
  });

  it('returns error when db throws', async () => {
    verifyToken.mockResolvedValue({ user: { id: 1 }, expires: new Date(Date.now() + 10000).toISOString() });
    db.select.mockImplementation(() => { throw new Error('DB error'); });
    await expect(realGetActivityLogs()).rejects.toThrow('DB error');
  });
});
