import { useSession } from 'next-auth/react';

export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Placeholder hook for retrieving the current user
 */
export function useUser(): User | null {
  const { data: session } = useSession();
  if (!session?.user) return null;
  return {
    id: session.user.id as number,
    name: session.user.name as string,
    email: session.user.email,
  };
}
