import { useSession } from 'next-auth/react';

export interface User {
  id: number;
  name?: string | null;
  email?: string | null;
}

/**
 * Placeholder hook for retrieving the current user
 */
export function useUser(): User | null {
  const { data: session } = useSession();
  if (!session?.user) return null;
  return {
    id: (session.user as any).id ? Number((session.user as any).id) : 0,
    name: session.user.name ?? null,
    email: session.user.email ?? null,
  };
}
