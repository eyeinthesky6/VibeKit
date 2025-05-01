'use client';

import React, { memo } from 'react';
import CheckoutButton from './CheckoutButton';
import { User } from '../../../shared/types';

interface Plan {
  id: string;
  name: string;
  amount: number | null;
}

interface PricingTableProps {
  plans: Plan[];
  user: User | null;
}

function PricingTable({ plans, user }: PricingTableProps) {
  return (
    <div className="space-y-4">
      {plans.map((plan) => (
        <div key={plan.id} className="p-4 border rounded-md">
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          <p className="text-sm">Price: ${(plan.amount ?? 0) / 100}</p>
          <CheckoutButton priceId={plan.id} isLoggedIn={!!user} />
        </div>
      ))}
      {plans.length === 0 && (
        <div className="p-4 border rounded-md text-center">
          <p>No pricing plans available</p>
        </div>
      )}
    </div>
  );
}

export default memo(PricingTable);
