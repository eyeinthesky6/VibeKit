'use client';

import React, { useEffect, useState, memo } from 'react';
import CheckoutButton from './CheckoutButton';

interface Plan {
  id: string;
  name: string;
  amount: number | null;
}

function PricingTable() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    fetch('/api/billing/plans')
      .then((res) => res.json())
      .then((data) => setPlans(data.plans));
  }, []);

  return (
    <div className="space-y-4">
      {plans.map((plan) => (
        <div key={plan.id} className="p-4 border rounded-md">
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          <p className="text-sm">Price: ${(plan.amount ?? 0) / 100}</p>
          <CheckoutButton priceId={plan.id} />
        </div>
      ))}
    </div>
  );
}

export default React.memo(PricingTable);
