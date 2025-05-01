'use client';
import { useUser } from '../../hooks/useUser';
import { useEffect, useState } from 'react';
import PricingTable from '@/components/billing/PricingTable';
export default function PricingPage() {
    const user = useUser();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Fetch pricing plans from API
        async function fetchPlans() {
            try {
                const response = await fetch('/api/stripe/prices');
                if (!response.ok) {
                    throw new Error('Failed to fetch pricing plans');
                }
                const data = await response.json();
                setPlans(data.prices);
            }
            catch (error) {
                console.error('Error fetching plans:', error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchPlans();
    }, []);
    if (loading) {
        return <div>Loading pricing plans...</div>;
    }
    return (<main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Pricing Plans</h1>
      <PricingTable plans={plans} user={user}/>
    </main>);
}
