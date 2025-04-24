import { redirect } from 'next/navigation';
import { Settings } from '../dashboard/settings';
import { getTeamForUser, getUser } from '@/lib/db/queries';

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) {
    redirect('/sign-in');
  }
  const teamData = await getTeamForUser(user.id);
  if (!teamData) {
    throw new Error('Team not found');
  }
  return <Settings teamData={teamData} />;
}
