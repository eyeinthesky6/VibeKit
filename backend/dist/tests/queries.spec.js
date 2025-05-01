import * as sessionModule from '@/lib/db/queries';
jest.mock('@/lib/db/queries');
jest.mock('@/lib/db/drizzle', () => {
    const chain = () => new Proxy({}, {
        get: () => chain,
        apply: () => chain,
    });
    return { db: { select: chain, from: chain, leftJoin: chain, where: chain, orderBy: chain, limit: chain } };
});
// Mock getActivityLogs to return a Promise resolving to an array
const mockLogs = [{ id: 1, action: 'test', timestamp: new Date(), ip_address: '127.0.0.1', user_name: 'Test' }];
// Patch getActivityLogs to use the real implementation for the test
const realGetActivityLogs = jest.requireActual('@/lib/db/queries').getActivityLogs;
// Tests
describe('getActivityLogs Query', () => {
    it('throws if user is not authenticated', async () => {
        sessionModule.getUser.mockResolvedValue(null);
        await expect(realGetActivityLogs()).rejects.toThrow('User not authenticated');
    });
    it('returns logs when user is authenticated', async () => {
        sessionModule.getUser.mockResolvedValue({ id: 1 });
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
        sessionModule.getUser.mockResolvedValue({ id: 1 });
        const db = require('@/lib/db/drizzle').db;
        db.select.mockImplementation(() => { throw new Error('DB error'); });
        await expect(realGetActivityLogs()).rejects.toThrow('DB error');
    });
});
