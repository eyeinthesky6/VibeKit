'use client';

import React from 'react';

interface DashboardContentProps {
  teamData: any;
}

export default function DashboardContent({ teamData }: DashboardContentProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(teamData, null, 2)}</pre>
    </div>
  );
}
