import { FeatureFlagsService } from '@/modules/feature-flags/service';
describe('FeatureFlagsService', () => {
    it('should get feature flags', async () => {
        const service = new FeatureFlagsService();
        expect(await service.getFeatureFlags('user1')).toEqual([]);
    });
    it('should update feature flag', async () => {
        const service = new FeatureFlagsService();
        expect(await service.updateFeatureFlag('user1', 'flag1', true)).toBeNull();
    });
});
