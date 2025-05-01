export declare function getUser(): Promise<{
    id: number;
    name: string | null;
    email: string;
    password_hash: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
} | null>;
export declare function getTeamByStripeCustomerId(customerId: string): Promise<{
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    stripe_product_id: string | null;
    plan_name: string | null;
    subscription_status: string | null;
} | null>;
export declare function updateTeamSubscription(teamId: number, { stripe_subscription_id, stripe_product_id, plan_name, subscription_status, }: {
    stripe_subscription_id: string | null;
    stripe_product_id: string | null;
    plan_name: string | null;
    subscription_status: string;
}): Promise<void>;
export declare function getUserWithTeam(userId: number): Promise<{
    user: {
        id: number;
        name: string | null;
        email: string;
        password_hash: string;
        role: string;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    };
    team_id: number | null;
}>;
export declare function getActivityLogs(): Promise<{
    id: number;
    action: string;
    timestamp: Date;
    ip_address: string | null;
    user_name: string | null;
}[]>;
export declare function getTeamForUser(userId: number): Promise<{
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    stripe_product_id: string | null;
    plan_name: string | null;
    subscription_status: string | null;
    team_members: {
        id: number;
        role: string;
        user_id: number;
        team_id: number;
        joined_at: Date;
        user: {
            id: number;
            name: string | null;
            email: string;
        };
    }[];
} | null>;
export declare function getUserByEmail(email: string): Promise<{
    id: number;
    name: string | null;
    email: string;
    password_hash: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}>;
