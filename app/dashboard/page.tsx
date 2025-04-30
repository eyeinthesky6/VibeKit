import { redirect } from 'next/navigation';
import { getTeamForUser, getUser } from '@/lib/db/queries';
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamic import for DashboardContent with loading fallback
const DashboardContent = dynamic(() => import('@/components/dashboard/DashboardContent'), {
  loading: () => <div>Loading dashboard...</div>,
  ssr: false,
});

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) {
    redirect('/sign-in');
  }
  const teamData = await getTeamForUser(user.id);
  if (!teamData) {
    throw new Error('Team not found');
  }
  // Render dynamically loaded component
  return <DashboardContent teamData={teamData} />;
}
