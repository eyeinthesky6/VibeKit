import { PagesService } from '@/modules/pages/service';
describe('PagesService', () => {
  it('should get pages', async () => {
    const service = new PagesService();
    expect(await service.getPages('user1')).toEqual([]);
  });
  it('should create page', async () => {
    const service = new PagesService();
    expect(await service.createPage('user1', {})).toBeNull();
  });
  it('should update page', async () => {
    const service = new PagesService();
    expect(await service.updatePage('user1', 'page1', {})).toBeNull();
  });
  it('should delete page', async () => {
    const service = new PagesService();
    expect(await service.deletePage('user1', 'page1')).toBeNull();
  });
}); 