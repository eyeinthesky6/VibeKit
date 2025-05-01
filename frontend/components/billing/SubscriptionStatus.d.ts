import React from 'react';
interface Subscription {
    id: string;
    status: string;
    current_period_end: number;
    plan: string;
    amount: number | null;
}
interface SubscriptionStatusProps {
    subscription: Subscription;
}
export default function SubscriptionStatus({ subscription }: SubscriptionStatusProps): React.JSX.Element;
export {};
