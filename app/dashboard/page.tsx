import { redirect } from 'next/navigation';
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
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(teamData, null, 2)}</pre>
    </div>
  );
}
