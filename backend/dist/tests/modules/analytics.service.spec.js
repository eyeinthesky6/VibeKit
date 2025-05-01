import { AnalyticsService } from '@/modules/analytics/service';
describe('AnalyticsService', () => {
    it('should get summary', async () => {
        const service = new AnalyticsService();
        expect(await service.getSummary('user1')).toBeNull();
    });
    it('should export analytics', async () => {
        const service = new AnalyticsService();
        expect(await service.exportAnalytics('user1')).toBeNull();
    });
});
