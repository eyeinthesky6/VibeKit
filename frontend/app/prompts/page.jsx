'use client';
import { useUser } from '../../hooks/useUser';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
export default function PromptsPage() {
    const user = useUser();
    useEffect(() => {
        if (!user) {
            redirect('/sign-in');
        }
    }, [user]);
    // Show loading state while checking user
    if (!user) {
        return <div>Loading...</div>;
    }
    return (<main className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">Prompts</h1>
      <div className="bg-white rounded shadow p-6">
        <div className="flex flex-col items-center text-center">
          <span className="text-2xl mb-2">🚧</span>
          <p className="mb-2 font-semibold">
            Prompt management page is under construction.
          </p>
          <ul className="text-sm text-gray-500 list-disc list-inside">
            <li>Create, edit and manage prompts</li>
            <li>Apply versions and templates</li>
            <li>Prompt analytics and insights</li>
          </ul>
        </div>
      </div>
    </main>);
}
