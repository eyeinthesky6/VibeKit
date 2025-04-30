import { PreferencesService } from '@/modules/preferences/service';
describe('PreferencesService', () => {
  it('should get preferences', async () => {
    const service = new PreferencesService();
    expect(await service.getPreferences('user1')).toBeNull();
  });
  it('should update preferences', async () => {
    const service = new PreferencesService();
    expect(await service.updatePreferences('user1', {})).toBeNull();
  });
}); 