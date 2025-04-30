import { AuditLogsService } from '@/modules/audit-logs/service';
describe('AuditLogsService', () => {
  it('should get logs', async () => {
    const service = new AuditLogsService();
    expect(await service.getLogs('user1')).toEqual([]);
  });
}); 