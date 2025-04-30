import { redirect } from 'next/navigation';
import { getTeamForUser, getUser } from '@/lib/db/queries';
import DashboardLoader from '@/components/dashboard/DashboardLoader';

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) {
    redirect('/sign-in');
  }
  const teamData = await getTeamForUser(user.id);
  if (!teamData) {
    throw new Error('Team not found');
  }
  // Client-side loader for dashboard content
  return <DashboardLoader teamData={teamData} />;
}
