jest.mock('@/lib/db/queries', () => ({
  ...jest.requireActual('@/lib/db/queries'),
  getUser: jest.fn().mockResolvedValue({ id: 1 }),
}));

import { getActivityLogs } from '@/lib/db/queries';
import * as sessionModule from '@/lib/db/queries';

// jest.mock('@/lib/db/queries'); // REMOVE THIS LINE
jest.mock('@/lib/db/drizzle', () => {
  const chain = () => {
    const fn = jest.fn();
    fn.mockReturnThis = () => fn;
    fn.mockImplementation = impl => { fn.mockImplementation = impl; return fn; };
    fn.mockResolvedValue = val => { fn.mockResolvedValue = val; return fn; };
    return fn;
  };
  return { db: { select: chain(), from: chain(), leftJoin: chain(), where: chain(), orderBy: chain(), limit: chain() } };
});

// Mock getActivityLogs to return a Promise resolving to an array
const mockLogs = [{ id: 1, action: 'test', timestamp: new Date(), ip_address: '127.0.0.1', user_name: 'Test' }];

// Patch getActivityLogs to use the real implementation for the test
// const realGetActivityLogs = jest.requireActual('@/lib/db/queries').getActivityLogs;
const realGetActivityLogs = getActivityLogs;

// Tests

describe('getActivityLogs Query', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('throws if user is not authenticated', async () => {
    jest.spyOn(sessionModule, 'getUser').mockResolvedValue(null);
    await expect(realGetActivityLogs()).rejects.toThrow('User not authenticated');
  });

  it('returns logs when user is authenticated', async () => {
    jest.spyOn(sessionModule, 'getUser').mockResolvedValue({ id: 1 });
    // Mock db.select chain to return mockLogs
    const db = require('@/lib/db/drizzle').db;
    db.select.mockReturnThis();
    db.from.mockReturnThis();
    db.leftJoin.mockReturnThis();
    db.where.mockReturnThis();
    db.orderBy.mockReturnThis();
    db.limit.mockResolvedValue(mockLogs);
    const logs = await realGetActivityLogs();
    expect(Array.isArray(logs)).toBe(true);
    expect(logs[0].action).toBe('test');
  });

  it('returns error when db throws', async () => {
    jest.spyOn(sessionModule, 'getUser').mockResolvedValue({ id: 1 });
    const db = require('@/lib/db/drizzle').db;
    db.select.mockImplementation(() => { throw new Error('DB error'); });
    await expect(realGetActivityLogs()).rejects.toThrow('DB error');
  });
});
