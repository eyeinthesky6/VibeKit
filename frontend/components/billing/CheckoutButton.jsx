'use client';
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
function CheckoutButton({ priceId }) {
    const [loading, setLoading] = useState(false);
    const handleClick = useCallback(async () => {
        setLoading(true);
        const res = await fetch('/api/billing/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ priceId }),
        });
        const { url, error } = await res.json();
        if (error) {
            console.error(error);
            alert(error);
            setLoading(false);
            return;
        }
        window.location.href = url;
    }, [priceId]);
    return (<Button onClick={handleClick} disabled={loading}>
      {loading ? 'Redirecting...' : 'Subscribe'}
    </Button>);
}
export default React.memo(CheckoutButton);
