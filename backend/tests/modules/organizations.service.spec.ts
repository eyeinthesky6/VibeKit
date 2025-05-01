import { OrganizationService } from '@/modules/organizations/service';
describe('OrganizationService', () => {
  it('should get organizations', async () => {
    const service = new OrganizationService();
    expect(await service.getOrganizations()).toEqual([]);
  });
  it('should switch organization', async () => {
    const service = new OrganizationService();
    expect(await service.switchOrganization('org1')).toBeNull();
  });
}); 