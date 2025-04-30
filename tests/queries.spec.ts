import { getActivityLogs } from '@/lib/db/queries';
import { db } from '@/lib/db/drizzle';
import * as sessionModule from '@/lib/db/queries';

jest.mock('@/lib/db/queries');
jest.mock('@/lib/db/drizzle', () => ({
  db: {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnValue(Promise.resolve([{ id: 1, action: 'test', timestamp: new Date(), ipAddress: '127.0.0.1', userName: 'Test' }]))
  }
}));

describe('getActivityLogs Query', () => {
  it('throws if user is not authenticated', async () => {
    (sessionModule.getUser as jest.Mock).mockResolvedValue(null);
    await expect(getActivityLogs()).rejects.toThrow('User not authenticated');
  });

  it('returns logs when user is authenticated', async () => {
    (sessionModule.getUser as jest.Mock).mockResolvedValue({ id: 1 });
    const logs = await getActivityLogs();
    expect(logs).toBeInstanceOf(Array);
    expect(logs[0].action).toBe('test');
  });
});
