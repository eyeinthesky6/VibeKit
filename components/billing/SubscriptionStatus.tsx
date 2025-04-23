'use client';

import React, { useEffect, useState } from 'react';

interface Subscription {
  id: string;
  status: string;
  current_period_end: number;
  plan: string;
  amount: number | null;
}

export default function SubscriptionStatus() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    fetch('/api/billing/subscription')
      .then(res => res.json())
      .then(data => setSubscription(data.subscription));
  }, []);

  if (!subscription) {
    return <div className="p-4 border rounded-md">No active subscription</div>;
  }

  const renewalDate = new Date(subscription.current_period_end * 1000);

  return (
    <div className="p-4 border rounded-md">
      <h3 className="text-lg font-semibold">Current Plan: {subscription.plan}</h3>
      <p className="text-sm">Amount: ${(subscription.amount ?? 0) / 100}</p>
      <p className="text-sm">Next Renewal: {renewalDate.toLocaleDateString()}</p>
    </div>
  );
}
