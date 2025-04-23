"use client";
import { useState } from 'react';
import PricingTable from '@/components/billing/PricingTable';
import SubscriptionStatus from '@/components/billing/SubscriptionStatus';

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleManageSubscription() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/billing/portal', { method: 'POST' });
      if (res.redirected) {
        window.location.href = res.url;
        return;
      }
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setError(data?.error || 'Failed to launch customer portal.');
      }
    } catch (err) {
      setError('Failed to launch customer portal.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Billing</h1>
      <SubscriptionStatus />
      <PricingTable />
      <button
        onClick={handleManageSubscription}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Redirecting...' : 'Manage Subscription'}
      </button>
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </div>
  );
}
