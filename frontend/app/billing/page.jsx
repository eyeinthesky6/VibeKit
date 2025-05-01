'use client';
import { useUser } from '../../hooks/useUser';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import SubscriptionStatus from '@/components/billing/SubscriptionStatus';
export default function BillingPage() {
    const user = useUser();
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!user) {
            // If no user after initial load, redirect to sign-in
            if (!loading)
                redirect('/sign-in');
            return;
        }
        // Fetch subscription data from API
        async function fetchSubscription() {
            try {
                const response = await fetch('/api/stripe/subscription');
                if (!response.ok) {
                    throw new Error('Failed to fetch subscription data');
                }
                const data = await response.json();
                setSubscription(data.subscription);
            }
            catch (error) {
                console.error('Error fetching subscription:', error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchSubscription();
    }, [user, loading]);
    // Show loading state while checking user and subscription
    if (loading) {
        return <div>Loading subscription details...</div>;
    }
    return (<main className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">Billing & Subscription</h1>
      <div className="bg-white rounded shadow p-6">
        {subscription ? (<SubscriptionStatus subscription={subscription}/>) : (<div className="text-center">
            <p>You don't have an active subscription.</p>
            <a href="/pricing" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View Plans
            </a>
          </div>)}
      </div>
    </main>);
}
