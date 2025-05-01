import { ProfileService } from '@/modules/profile/service';
describe('ProfileService', () => {
    it('should get profile', async () => {
        const service = new ProfileService();
        expect(await service.getProfile('user1')).toBeNull();
    });
    it('should update profile', async () => {
        const service = new ProfileService();
        expect(await service.updateProfile('user1', {})).toBeNull();
    });
    it('should delete profile', async () => {
        const service = new ProfileService();
        expect(await service.deleteProfile('user1')).toBeNull();
    });
});
