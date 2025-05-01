'use client';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useUser } from '../../hooks/useUser';
import DashboardLoader from '@/components/dashboard/DashboardLoader';
export default function DashboardPage() {
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = useUser();
    useEffect(() => {
        if (!user) {
            // If no user, redirect to sign-in
            if (!loading)
                redirect('/sign-in');
            return;
        }
        // Fetch team data from API
        async function fetchTeam() {
            try {
                const response = await fetch('/api/teams/current');
                if (!response.ok) {
                    throw new Error('Failed to fetch team data');
                }
                const data = await response.json();
                setTeam(data.team);
            }
            catch (error) {
                console.error('Error fetching team:', error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchTeam();
    }, [user, loading]);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!team) {
        return <div>No team data available</div>;
    }
    // Client-side loader for dashboard content
    return <DashboardLoader teamData={team}/>;
}
