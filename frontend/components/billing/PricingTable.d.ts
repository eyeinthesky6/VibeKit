import React from 'react';
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
declare function PricingTable({ plans, user }: PricingTableProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof PricingTable>;
export default _default;
