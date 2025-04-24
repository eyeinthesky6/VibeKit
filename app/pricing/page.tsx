import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export default async function PricingPage() {
  const session = await getSession();
  if (!session) {
    redirect('/sign-in');
  }
  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">Pricing</h1>
      <div className="bg-white rounded shadow p-6">
        <div className="flex flex-col items-center text-center">
          <span className="text-2xl mb-2">🚧</span>
          <p className="mb-2 font-semibold">Pricing plans & subscriptions are under construction.</p>
          <ul className="text-sm text-gray-500 list-disc list-inside">
            <li>Plan comparison</li>
            <li>Upgrade/downgrade</li>
            <li>Trial options</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
