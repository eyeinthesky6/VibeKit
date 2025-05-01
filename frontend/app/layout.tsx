import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { useUser } from '../hooks/useUser';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Next.js SaaS Starter',
  description: 'Get started quickly with Next.js, Postgres, and Stripe.',
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

// Simple UserProvider component that doesn't need direct backend access
function UserProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="user-provider">
      {children}
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // We'll implement user fetching via API calls in components that need it
  // instead of using server-side fetching here

  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
