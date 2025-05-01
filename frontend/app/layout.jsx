import './globals.css';
import { Manrope } from 'next/font/google';
export const metadata = {
    title: 'Next.js SaaS Starter',
    description: 'Get started quickly with Next.js, Postgres, and Stripe.',
};
export const viewport = {
    maximumScale: 1,
};
const manrope = Manrope({ subsets: ['latin'] });
// Simple UserProvider component that doesn't need direct backend access
function UserProvider({ children }) {
    return (<div className="user-provider">
      {children}
    </div>);
}
export default function RootLayout({ children }) {
    // We'll implement user fetching via API calls in components that need it
    // instead of using server-side fetching here
    return (<html lang="en" className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}>
      <body className="min-h-[100dvh] bg-gray-50">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>);
}
