import { EmailTemplatesService } from '@/modules/email-templates/service';
describe('EmailTemplatesService', () => {
  it('should get templates', async () => {
    const service = new EmailTemplatesService();
    expect(await service.getTemplates('user1')).toEqual([]);
  });
  it('should create template', async () => {
    const service = new EmailTemplatesService();
    expect(await service.createTemplate('user1', {})).toBeNull();
  });
  it('should delete template', async () => {
    const service = new EmailTemplatesService();
    expect(await service.deleteTemplate('user1', 'template1')).toBeNull();
  });
}); 