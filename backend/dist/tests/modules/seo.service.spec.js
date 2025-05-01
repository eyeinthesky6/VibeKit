import { SEOService } from '@/modules/seo/service';
describe('SEOService', () => {
    it('should get SEO', async () => {
        const service = new SEOService();
        expect(await service.getSEO('user1')).toBeNull();
    });
    it('should update SEO', async () => {
        const service = new SEOService();
        expect(await service.updateSEO('user1', {})).toBeNull();
    });
});
