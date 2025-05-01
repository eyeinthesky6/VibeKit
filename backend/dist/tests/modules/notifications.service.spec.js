import { NotificationsService } from '@/modules/notifications/service';
describe('NotificationsService', () => {
    it('should get notifications', async () => {
        const service = new NotificationsService();
        expect(await service.getNotifications('user1')).toEqual([]);
    });
    it('should mark all as read', async () => {
        const service = new NotificationsService();
        expect(await service.markAllRead('user1')).toBeNull();
    });
});
