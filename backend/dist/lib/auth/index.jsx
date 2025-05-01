'use client';
import { createContext, useContext } from 'react';
const UserContext = createContext(null);
export function useUser() {
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
export function UserProvider({ children, userPromise, }) {
    return <UserContext.Provider value={{ userPromise }}>{children}</UserContext.Provider>;
}
