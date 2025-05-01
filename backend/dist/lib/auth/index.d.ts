import { ReactNode } from 'react';
import { User } from '@/lib/db/schema';
type UserContextType = {
    userPromise: Promise<User | null>;
};
export declare function useUser(): UserContextType;
export declare function UserProvider({ children, userPromise, }: {
    children: ReactNode;
    userPromise: Promise<User | null>;
}): import("react").JSX.Element;
export {};
