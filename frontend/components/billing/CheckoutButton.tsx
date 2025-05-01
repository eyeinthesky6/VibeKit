'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface CheckoutButtonProps {
  priceId: string;
  isLoggedIn: boolean;
}

function CheckoutButton({ priceId, isLoggedIn }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = useCallback(async () => {
    setLoading(true);
    
    if (!isLoggedIn) {
      // Redirect to sign-in page with priceId param to continue checkout after auth
      router.push(`/sign-in?redirect=checkout&priceId=${priceId}`);
      return;
    }
    
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: priceId }),
      });
      
      const data = await res.json();
      
      if (data.error) {
        console.error(data.error);
        alert(data.error.message || 'Checkout failed');
        setLoading(false);
        return;
      }
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
        alert('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setLoading(false);
      alert('An error occurred during checkout');
    }
  }, [priceId, isLoggedIn, router]);

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? 'Redirecting...' : isLoggedIn ? 'Subscribe' : 'Sign in to Subscribe'}
    </Button>
  );
}

export default React.memo(CheckoutButton);
