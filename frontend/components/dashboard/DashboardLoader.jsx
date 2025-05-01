"use client";
import dynamic from 'next/dynamic';
import React from 'react';
const DashboardContent = dynamic(() => import('@/components/dashboard/DashboardContent'), {
    loading: () => <div>Loading dashboard...</div>,
    ssr: false,
});
export default function DashboardLoader({ teamData }) {
    return <DashboardContent teamData={teamData}/>;
}
