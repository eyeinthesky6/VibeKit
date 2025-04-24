import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    redirect('/sign-in');
  }
  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white rounded shadow p-6">
        <p><strong>User ID:</strong> {session?.user?.id}</p>
        <p><strong>Session Expires:</strong> {session?.expires}</p>
      </div>
    </main>
  );
}
