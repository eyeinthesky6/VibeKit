'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, CreditCard, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
export default function Layout({ children }) {
    const [user, setUser] = useState(null);
    const pathname = usePathname();
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            const userEmail = session?.user?.email ?? '';
            setUser({ email: userEmail });
        });
    }, []);
    return (<div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4">
        <nav className="space-y-4">
          <Link href="/dashboard" className={`flex items-center space-x-2 ${pathname === '/dashboard' ? 'font-bold text-blue-600' : ''}`}>
            <Home />
            <span>Dashboard</span>
          </Link>
          <Link href="/profile" className={`flex items-center space-x-2 ${pathname === '/profile' ? 'font-bold text-blue-600' : ''}`}>
            <User />
            <span>Profile</span>
          </Link>
          <Link href="/billing" className={`flex items-center space-x-2 ${pathname === '/billing' ? 'font-bold text-blue-600' : ''}`}>
            <CreditCard />
            <span>Billing</span>
          </Link>
          <Link href="/prompts" className={`flex items-center space-x-2 ${pathname === '/prompts' ? 'font-bold text-blue-600' : ''}`}>
            <span role="img" aria-label="Prompts">
              💬
            </span>
            <span>Prompts</span>
          </Link>
          <Link href="/proofs" className={`flex items-center space-x-2 ${pathname === '/proofs' ? 'font-bold text-blue-600' : ''}`}>
            <span role="img" aria-label="Proofs">
              📁
            </span>
            <span>Proofs</span>
          </Link>
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="flex justify-end items-center bg-white p-4 border-b">
          {user && (<div className="flex items-center space-x-4">
              <span>{user.email ?? ''}</span>
              <button className="text-sm text-gray-600 hover:text-gray-900" onClick={() => supabase.auth.signOut()}>
                <LogOut />
              </button>
            </div>)}
        </header>
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>);
}
