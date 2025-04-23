"use client";
import { useEffect, useState } from "react";
import { getUserRole } from '@/lib/auth/role';

export function IfRole({ role, children }: { role: 'admin' | 'premium' | 'basic', children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    (async () => {
      const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
      if (!userId) return;
      const userRole = await getUserRole(userId);
      setAllowed(userRole === role || (role === 'basic'));
    })();
  }, [role]);
  if (!allowed) return null;
  return <>{children}</>;
}
