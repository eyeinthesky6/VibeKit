import { ComplianceService } from '@/modules/compliance/service';
describe('ComplianceService', () => {
  it('should get compliance', async () => {
    const service = new ComplianceService();
    expect(await service.getCompliance('user1')).toBeNull();
  });
  it('should update compliance', async () => {
    const service = new ComplianceService();
    expect(await service.updateCompliance('user1', {})).toBeNull();
  });
}); 