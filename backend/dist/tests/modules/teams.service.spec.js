import { TeamService } from '@/modules/teams/service';
describe('TeamService', () => {
    it('should invite member', async () => {
        const service = new TeamService();
        expect(await service.inviteMember('test@example.com', 'team1')).toBeNull();
    });
});
