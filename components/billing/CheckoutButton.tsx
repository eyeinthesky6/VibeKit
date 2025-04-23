'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CheckoutButtonProps {
  priceId: string;
}

export default function CheckoutButton({ priceId }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch('/api/billing/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId })
    });
    const { url, error } = await res.json();
    if (error) {
      console.error(error);
      alert(error);
      setLoading(false);
      return;
    }
    window.location.href = url;
  };

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? 'Redirecting...' : 'Subscribe'}
    </Button>
  );
}
